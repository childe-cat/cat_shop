<template>
<div class="content">
  <div class="head">
    <p class="title">购物车</p>
  </div>
  <div class="list" v-if="flag">
    <li>
    <div style="text-align: center"><input style="zoom: 90%" type="checkbox" @click="all_select" v-model="checked">全选</div>
      <p>商品</p>
      <p>单价</p>
      <p>数量</p>
      <p>小记</p>
    </li>
    <li v-for="item in cart" :key="item.id">
      <input type="checkbox" v-model="ready" :value="item" style="zoom: 150%">
      <div>
        <img @click="details(item.id)" :src="item.goods_image" alt="商品图片">
        <div class="goods">
          <p @click="details(item.id)" style="font-size: 1.2em">{{item.goods_name}}</p>
        </div>
      </div>
      <p>¥{{item.goods_price}}</p>
      <ul class="num">
        <li class="del" @click="del(item.id)"></li>
        <li>{{item.num}}</li>
        <li class="add" @click="add(item.id)"></li>
      </ul>
      <p>¥{{item.goods_price * item.num}}</p>
    </li>
  </div>
  <ul class="bottom" v-if="flag">
    <li>
      <input type="checkbox" v-model="checked" @click="all_select">全选
    </li>
    <ul>
      <li>总计：<span style="color: #ca161e;zoom: 180%">{{total_price}}</span></li>
      <li style="cursor: pointer" @click="balance">立即结算</li>
    </ul>
  </ul>
  <div class="none" v-if="!flag">
<p>购物车空空如也!</p>
  </div>
</div>
</template>

<script>
import {reqPay_no_order} from "@/api";
export default {
name: "index",
  data(){
  return{
    //选中的商品
    ready:[],
  //  全选状态
    checked:false,
  //  显示
    flag:true,
  //  总价
    total_price:0
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
  //  全选
    all_select(){
      if(this.checked){
        this.ready=[]
      }else{
        this.cart.forEach(item=>{
          if(this.ready.indexOf(item) === -1) return this.ready.push(item)
        })
      }
    },
  //  增减
    add(tag){
      this.$store.dispatch('add_Cart',tag)
    },
    del(tag){
      this.$store.dispatch('del_Cart',tag)
    },
  //  结算
    balance(){
      if(this.ready.length<=0) return alert('还没有选购商品')
      //生成商品id序列和商品数量组成对象数组
      let blurb = []
      this.ready.forEach((item)=>{
        let object = {
          id:item.id,
          name:item.goods_name,
          img:item.goods_image,
          price:item.goods_price,
          num:item.num
        }
        blurb.push(object)
      })
      blurb = JSON.stringify(blurb)
      //生成订单时间
      let time = this.utils.timeNow()
      console.log(time)
      //未付款订单详情
      let pay_no = {
        blurb: blurb,
        money:this.total_price,
        time:time
      }
      //发起请求生成订单
      reqPay_no_order(pay_no).then(res=>{
        const id = res.data.data
        if(res.data.status===0){
          //跳转提交订单页
          this.$router.push({
            name:'order',
            params:{
              id:id,
              ready:JSON.parse(blurb),
              total_price:this.total_price
            }
          })
        }else{
          alert('请稍后再试')
        }
      })
    }
  },
  computed:{
    cart(){
      return this.$store.state.cart_list.filter(item=>{
        return item.num>0
      })
    }
  },
  watch:{
  //判断全选
  ready:{
    deep:true,
    handler(){
      this.ready.length === this.$store.state.cart_list.length?this.checked = true:this.checked = false
      //总价
      let price = 0
      this.ready.forEach((item,i)=>{
        price+=item.goods_price * item.num
        if(item.num===0){
          this.ready.splice(i,1)
        }
      })
      this.total_price = Number(price.toFixed(2))
    }
  },
    cart(){
      if(this.cart.length !==0) return this.flag = true
      this.flag = false
    }
  },
  created() {
  this.$store.dispatch('all_Cart_list')
  }
}
</script>

<style scoped>
.content{
  background-color: white;
  border-radius: 5px;
  padding: 30px 40px 0;
}
.head{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title{
  font-size: 2em;
}
/*.button{*/
/*  font-size: 1.1em;*/
/*  border: 1px solid green;*/
/*  border-radius: 5px;*/
/*  display: flex;*/
/*  align-items: center;*/
/*  justify-content: center;*/
/*  width: 60px;*/
/*  height: 30px;*/
/*  position: relative;*/
/*  top: 0;*/
/*  cursor: pointer;*/
/*}*/
/*.button:hover{*/
/*  box-shadow: 1px 1px 1px 1px rgba(211,211,211,0.6);*/
/*  top: -1px;*/
/*}*/
.list{
  padding: 10px 10px 0 10px;
}
.list>li:nth-child(1){
  height: 40px;
}
.list li{
  border-bottom: 1px solid rgba(211,211,211,0.8);
  justify-content: space-between;
  height: 200px;
  display: flex;
  align-items: center;
}
.list li>*{
  text-align: center;
  justify-content: center;
  flex: 1;
}
.list li div:nth-child(2),
.list li p:nth-child(2){
  flex: 5;
  display: flex;
  /*justify-content: center;*/
  margin: 0 20px;
}
.list li img{
  width: 150px;
  height: 150px;
}
.goods{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin:0 0 0 10px!important;
}
.num{
  display: flex;
  align-items: center;
}
.num>*{
  height: 20px!important;
  border-bottom: 1px solid black;
  border-right: 0;
  justify-content: center!important;
  cursor: pointer;
}
.add{
  width: 20px;
  background: url("./images/addel.png") no-repeat center;
  background-size: 40px 40px;
  background-position: 0 -20px;
}
.del{
  width: 20px;
  background: url("./images/addel.png") no-repeat center;
  background-size: 40px 40px;
  background-position: 0 -3px;
}
.bottom{
  padding: 0 10px;
}
.bottom,
.bottom>ul{
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
}
.bottom>ul{
  width: 45%;
}
.bottom li{
  justify-content: center;
  align-items: center;
  display: flex;
}
.bottom>ul>li:nth-child(2){
  width: 45%;
  color: white;
  background-color: #ca161e;
  height: 100%;
}
.none{
  margin-top: 20px;
  padding-left: 350px;
  height: 250px;
  background: url("./images/cart.png") no-repeat 150px center;
  display: flex;
  align-items: center;
  font-size: 2.5em;
}
</style>