<template>
<div class="app">
<!--  左边-->
  <div class="left">
    <div class="text_box">
      <h6 style="width: 23%">Deal Of The Day</h6>
      <hr color="green" width="77%" style="height: 1px">
    </div>
    <div class="img_box">
        <ul class="ul_left">
          <li @click="details(items.id)">
            <img :src="items.goods_image" alt="">
          </li>
          <li>
            <h2 @click="details(items.id)">{{ items.goods_name }}</h2>
            <p @click="details(items.id)" style="text-indent: 2em;color: gray;font-size: 1em">
              {{items.goods_Details}}
            </p>
            <div class="text_box">
              <h3 @click="details(items.id)" style="color: green">限时特惠￥：<span>{{items.goods_price}}</span></h3>
              <ul class="button_array">
                <p :class="{'up':true,'up_active':!isShow}"
                   :style="{backgroundImage: 'linear-gradient(135deg,'+color+','+color+')'}">+1</p>
                <li @click="buy();getColor()"><img :class="{'buy_active':!isShow}" src="./images/shop_car.png" alt=""></li>
              </ul>
            </div>
          </li>
        </ul>
    </div>
  </div>
<!--  右边-->
  <div class="right">
    <div class="text_box">
      <h6 style="width: 23%">Special Products</h6>
      <hr color="green" width="65%" style="height: 1px">
      <ul>
        <li @click="Switch('left')"><</li>
        <li @click="Switch('right')">></li>
      </ul>
    </div>
    <div class="img_box" ref="box_list">
        <ul class="ul_right">
          <li v-for="item in list" :key="item.id" @click="prop(item)">
            <img :src="item.goods_image" alt="商品图片">
            <h3>{{item.goods_name}}</h3>
          </li>
          <li ref="li">
            <h2>下周预告</h2>
            <router-link to="">点我查看更多</router-link>
          </li>
        </ul>
    </div>  
  </div>
</div>
</template>

<script>
import {reqAdd_cart} from "@/api";

export default {
  name: "index",
  props:{
    list:{
      type:Array,
      required:true
    }
  },
  data(){
    return{
      isShow:true,
      color:'',
      flag:0,
      items:{}
    }
  },
  methods:{
    //商品跳转
    details(id){
      this.$router.push({
        name:'details',
        params:{
          id:id
        }
      })
    },
    //滑块向右滚动
    switch(){
      this.$refs.box_list.scrollBy({
        left:this.$refs.li.offsetWidth,
        behavior:"smooth"
      })
      if(this.flag<=this.list.length-3){
        this.flag+=1
      }else{
        this.$refs.box_list.scrollTo({
          left:0,
          behavior:"smooth"
        })
        this.flag = 0
      }
    },
    // 滑块判断左右滚动
    Switch(Normal){
      switch (Normal){
        case 'left':
          this.$refs.box_list.scrollBy({
            left:-this.$refs.li.offsetWidth,
            behavior:"smooth"
          })
            if(this.flag>0) return this.flag-=1
              break;
        case 'right':
          this.switch()
              break;
      }
    },
  //  精选商品数据传输给展示柜
    prop(item){
      this.items = item
    },
  //  添加购物车
    async buy(){
      if(this.isShow) {
        this.isShow=false
        const result = await reqAdd_cart(this.items.id)
        setTimeout(()=>{
          this.isShow=true
        },1000)
      }
    },
    //  随机颜色
    getColor() {
      let str = '#'
      let arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e']
      for (let i=0;i<6;i++){
        let num = parseInt(Math.random()*15);
        str += arr[num];
      }
      this.color = str
    }
  },
  watch:{
    //监视list，当list更新时，给items默认值
    list:{
      handler(){
        this.items = this.list[0]
      }
    },
  //  购物车状态
    items(){
      // !this.$store.state.cart_list.includes(this.items)?this.isShow=true:this.isShow=false
    }
  },
  created() {
    //自动滚动
    const timer = setInterval(()=>{
      this.switch()
    },5000)
    this.$once('hook:beforeDestroy',()=>{
      clearInterval(timer)
    })
  },
}
</script>

<style scoped>
.app{
  width: 80%;
  height: 300px;
  margin: 50px auto 20px;
  display: flex;
  justify-content: space-between;
  font:italic 1em Georgia, serif;
  font-size: 0.9em;
}
.left{
  width: 50%;
  padding: 15px;
  border-radius: 10px;
}
.ul_left{
  display: flex;
  margin-left: 2px;
  border-radius: 5px;
  width: 100%;
  height: 200px;
  justify-content: space-around;
}
.ul_left>li:nth-child(1){
  width: 200px;
  height: 200px;
}
.ul_left>li:nth-child(1)>img{
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: unset;
}
.ul_left>li:nth-child(2){
  width: 320px;
  height: 200px;
  padding: 20px 0 0;
  display: flex;
  flex-direction: column;
  font-size: 1.1em;
  justify-content: space-between;
}
.button_array{
  display: flex;
  /*width: 150px!important;*/
  justify-content: flex-end;
}
.button_array li{
  width: 35px;
  height: 35px;
}
.button_array li img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.right{
  width: 45%;
  /*border: 1px solid green;*/
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 15px;
}
.text_box{
  display: flex;
  align-items: center;
  height: 24px;
  justify-content: space-between;
}
.text_box ul{
  display: flex;
  width: 12%;
  justify-content: space-around;
  font-size: 1.5em;
  cursor: pointer;
}
.img_box{
  height: 250px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow-x: auto;
}
.img_box::-webkit-scrollbar {
  width: 2px;
  height: 2px;
  background-color: rgba(211,211,211,1);
}
.img_box::-webkit-scrollbar-thumb{
  background-color: rgba(230,230,230,1);
}
.ul_right{
  display: flex;
  margin-left: 2px;
  border-radius: 10px;
}
.ul_right>li{
  width: 173px;
  height: 200px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  align-items: center;
  border-radius: 10px;
  position: relative;
  bottom: 0;
}
.ul_right>li:hover{
  bottom: 5px;
  z-index: 10;
  box-shadow: 0 0 10px 3px rgba(25,174,145, 0.4);
}
.ul_right>li>img{
  width: 120px;
  height: 120px;
  border-radius: 5px;
}
a{
  color: green;
  text-decoration: none;
}
.button_array{
  position: relative;
}
.up{
  color: transparent;
  -webkit-background-clip: text;
  font-size: 0.8em;
  position: absolute;
  opacity: 0;
  top: -15px;
}
.buy_active{
  animation:Buy 0.6s linear;
}
.up_active{
  animation: up 1s linear;
}
@keyframes Buy {
  0%{
    transform: rotate(0deg);
  }
  25%{
    transform: rotate(-25deg);
  }
  75%{
    transform: rotate(25deg);
  }
  100%{
    transform: rotate(0deg);
  }
}
@keyframes up {
  0%{
    opacity: 0.2;
    top: -15px;
  }
  100%{
    opacity: 1;
    top: -30px;
  }
}
</style>