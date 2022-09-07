<template>
<div class="app">
  <div class="list">
    <ul>
      <li @click="target('userinfo')">用户信息</li>
    </ul>
    <li>购物</li>
    <ul>
      <li @click="target('onlineshopping')">我的购物车</li>
      <li @click="target('order')">我的订单</li>
    </ul>
    <li>资产</li>
    <ul>
      <li @click="target('kfc')">我的优惠卷</li>
      <li @click="target('money')">我的M币</li></ul>
    <li>设置</li>
    <ul>
      <li @click="target('site')">我的收货地址</li>
    </ul>
  </div>
  <div class="container">
<!--    用户信息-->
    <userinfo
        v-show="flag==='userinfo'"
        :userinfo="userinfo"
    ></userinfo>
<!--    购物车信息-->
    <onlineshopping
        v-show="flag==='onlineshopping'"
    ></onlineshopping>
<!--    优惠卷信息-->
    <kfc
        v-show="flag==='kfc'"
        :userinfo="userinfo"
    ></kfc>
<!--    订单信息-->
    <order
        v-show="flag==='order'"
    ></order>
<!--    地址信息-->
    <site
        v-show="flag==='site'"
    ></site>
<!--    M币信息-->
    <money
        v-show="flag==='money'"
        :residual="userinfo.residual"
    ></money>
  </div>
</div>
</template>

<script>
import {reqUserinfo} from "@/api";
import userinfo from './components/UserInfo'
import onlineshopping from './components/OnlineShopping'
import kfc from './components/Kfc'
import site from './components/Site'
import money from './components/Money'
import order from "@/pages/Cart/components/Order";

export default {
  name: "index",
  components:{
    onlineshopping,
    userinfo,
    kfc,
    site,
    money,
    order
  },
  data(){
    return{
      flag:this.$route.params.page||'userinfo',
      userinfo:{}
    }
  },
  methods:{
    //切换组件
    target(name){
      this.flag = name
    },
  },
  created() {
    //获取用户信息
    reqUserinfo().then(res=>{
      this.userinfo = res.data.data
    })
  },
  mounted() {
    //  总线获取子组件发来的信息切换组件
    this.$bus.$on('flag_page',page=> this.flag = page)
  }
}
</script>

<style scoped>
.app{
  padding: 20px 0;
  width: 80%;
  margin-left: 10%;
  min-height: calc(100vh - 346.2px);
  display: flex;
  justify-content: space-between;
}
.list,
.container{
  border-radius: 5px;
  box-sizing: border-box;
}
.list{
  min-width: 220px;
  flex: 2;
  margin-right: 40px;
  padding: 0 0 0 30px;
  font-size: 0.9em;
  background-color: white;
  max-height: 380px;
}
.list ul{
  margin-bottom: 20px;
}
.list ul li{
  margin: 20px 0;
  padding-left: 30px;
}
.list ul:nth-child(1) li{
  background: url("./images/userinfo.png") no-repeat 0 0;
  background-size: 22px 22px;
}
/*列表图标*/
.list ul:nth-of-type(2) li:nth-child(1){
  background: url("./images/cart.png") no-repeat 0 0;
  background-size: 22px 22px;
}
.list ul:nth-of-type(2) li:nth-child(2){
  background: url("./images/order.png") no-repeat 0 0;
  background-size: 22px 22px;
}
.list ul:nth-of-type(3) li:nth-child(1){
  background: url("./images/kfc.png") no-repeat 0 0;
  background-size: 22px 22px;
}
.list ul:nth-of-type(3) li:nth-child(2){
  background: url("./images/gold.png") no-repeat 0 0;
  background-size: 22px 22px;
}
.list ul:nth-of-type(4) li{
  background: url("./images/add.png") no-repeat 0 0;
  background-size: 22px 22px;
}
.list>li{
  color: #8c8c8c;
  margin-bottom: 10px;
}
.list li{
  cursor: pointer;
}
.container{
  flex: 6;
}
</style>