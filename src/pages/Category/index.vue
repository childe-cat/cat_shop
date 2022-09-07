<template>
<div class="app">
  <div class="error" v-if="!category_list">
  <p>没有您想要的商品</p>
    <span style="font-size: 0.5em">{{count}}s后返回首页</span>
  </div>
  <div class="container" v-if="category_list">
    <ul class="nav">
      <li :class="shell==='综合排序'?'active':0" @click="sort('综合排序')">综合排序(刷新)</li>
      <li :class="shell==='销量排序'?'active':0" @click="sort('销量排序')">销量排序</li>
      <li :class="shell==='价格升序'?'active':0" @click="sort('价格升序')">价格升序</li>
      <li :class="shell==='价格降序'?'active':0" @click="sort('价格降序')">价格降序</li>
      <li>
        <input type="number" v-model="section.a">
        <span style="font-size: 0.8em">~</span>
        <input type="number" v-model="section.b">
        <div class="button" @click="price_submit">确定</div>
      </li>
    </ul>
    <div class="content">
      <ul class="content_left" ref="content_left">
        <li v-for="item in category" :key="item.id">
          <img @click="go(item.id)" :src="item.goods_image" class="blurb_img">
          <p @click="go(item.id)" class="blurb_price">￥{{ item.goods_price }}</p>
          <p @click="go(item.id)" class="blurb_name">{{ item.goods_name }}</p>
        </li>
      </ul>
      <ul class="content_right" :style="{'height':height}">
        <p>掌柜推荐</p>
        <li v-for="item in boom" :key="item.id" @click="go(item.id)">
          <img :src="item.goods_image" class="shop_img">
          <div class="shop_intro">
            <p>￥{{ item.goods_price }}</p>
            <p style="font-size: 0.8em">销量：{{ item.goods_sold }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import {reqGoods_category, reqGoods_hot} from "@/api";

export default {
  name: "index",
  props:{
    keyword:{
      type:String,
      default:'手机'
    }
  },
  data(){
    return{
      //存放获取的商品信息
      category_list:[],
      category:[],
      //  畅销推荐
      boom:[],
      //  排序方式
      shell:'综合排序',
      //价格区间
      section:{
        a:'',
        b:''
      },
      //  推荐盒子的高度
      height:'0px',
    //  定时器
      count:3,
      timer:null
    }
  },
  methods:{
  //  跳转商品
    go(id){
      this.$router.push({
        name:'details',
        params:{
          id:id
        }
      })
    },
  //更改排序方式
    sort(name){
      this.shell = name
      switch (name){
        case '综合排序':
          this.section.a = ''
            this.section.b = ''
          this.category = JSON.parse(JSON.stringify(this.category_list))
              break;
          case '销量排序':
            this.category.sort((a,b)=>b.goods_sold - a.goods_sold)
              break;
            case '价格升序':
              this.category.sort((a,b)=>a.goods_price - b.goods_price)
              break;
              case '价格降序':
                this.category.sort((a,b)=>b.goods_price - a.goods_price)
              break;
      }
    },
  //确定价格区间
    price_submit(){
      let a = Math.abs(Number(this.section.a))
      let b = Math.abs(Number(this.section.b))
      let arr = JSON.parse(JSON.stringify(this.category_list))
      if(!a || !b || !a<0 && !b<0) return alert('不能为0')
      if(a - b>=0){
        this.category = arr.filter(item=>item.goods_price<=a && item.goods_price>=b)
      }else if(a-b<=0){
        this.category = arr.filter(item=>item.goods_price>=a && item.goods_price<=b)
      }
      console.log(this.category)
    }
  },
  watch:{
    //监听到分类时获取当前分类初始数据
    keyword:{
      handler(n){
        //keyword发生变换时先清除定时器
        this.count = 3
        clearInterval(this.timer)
        this.timer = null
        reqGoods_category(n).then((res=>{
          this.category_list = res.data.data
          //如果没有数据就开启定时器
          if(!this.category_list) {
            this.timer = setInterval(()=>{
              this.count-=1
              if(this.count===0){
                // clearInterval(this.timer)
                // this.timer = null
                  this.$router.push({
                    name:'home'
                  })
              }
            },1000)
          }
          //有数据继续
          if(this.category_list) {
            this.category = JSON.parse(JSON.stringify(this.category_list))
          }
          reqGoods_hot().then(res=>{
            const result = res.data.data
            this.boom = result.filter(item=>item.goods_category===this.keyword)
          })
        }))
      },
      immediate:true
    },
  },
  updated() {
    //有数据判断高度
    if(this.category_list && this.category_list.length>0){
      let height = document.querySelector('.content_left').offsetHeight
      this.height = height + 'px'
    }
  },
  beforeDestroy() {
    //跳转路由后清除定时器
    clearInterval(this.timer)
    this.timer = null
  }
  // destroyed() {
  //   clearInterval(this.timer)
  //   this.timer = null
  // }
}
</script>

<style scoped>
.app{
  min-height: 413px;
  background-color: white;
}
.error{
  font-size: 3em;
  color: gray;
  padding-top: 186px;
  text-align: center;
  background: url("./images/no.png") no-repeat center;
  background-size: 80px;
}
.nav{
  padding: 0 10%;
  display: flex;
}
.nav li{
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 700;
  margin-right: 2%;
  cursor: default;
}
.active{
  color: red;
}
.nav li input{
  width: 60px;
  border: 0;
  text-align: center;
  border-bottom: 1px solid rgb(151,151,151);
}
.nav li input~.button{
  float: right;
  margin-left: 10px;
  width: 60px;
  text-align: center;
  color: #2996ff;
  cursor: pointer;
}
.content{
  width: 80%;
  margin-left: 10%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}
.content_left{
  width: 75%;
  display: flex;
  padding-left: 1%;
  flex-wrap: wrap;
}
.content_left li{
  width: 22.5%;
  margin: 10px 1% 20px;
  height: 200px;
}
.blurb_price{
  padding-left: 10%;
  font-size: 1.3em;
  color: #b42606;
}
.blurb_name{
  padding: 0 10%;
  font-size: 0.9em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-indent: 2em;
}
.blurb_img{
  width: 80%;
  margin-left: 10%;
  aspect-ratio: 1/1;
}
.content_right{
  width: 15%;
  margin-left: 5%;
  font-size: 1em;
  overflow: hidden;
}
.content_right li{
  border: 1px solid rgba(211,211,211,0.6);
  margin: 5px 0 10px;
}
.shop_intro{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.shop_img{
  width: 100%;
  aspect-ratio: 1/1;
}
</style>