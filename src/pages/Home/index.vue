<template>
<div class="app">
  <Carousel></Carousel>
  <DisplayOnly :title="title[1]" :list="vip_list" :isShow="Flag">
    <template>
      特价促销
    </template>
  </DisplayOnly>
  <hr color="green" width="60%" style="margin-bottom: 50px;margin-left: 20%">
  <DisplayOnly :title="title[0]" :list="boom_list" :isShow="flag">
    <template>
      本周仅售
    </template>
  </DisplayOnly>
  <div class="banner"><img @click="$router.push({name:'activity'})" src="./images/banner.png" alt=""></div>
  <GiftWare :list="goods_vip"></GiftWare>
  <div class="bottom">
    <li>7天无理由退货</li>
    <li>15天免费换货</li>
    <li>满199包邮</li>
  </div>
</div>
</template>

<script>
import DisplayOnly from "./components/DisplayOnly"
import Carousel from "./components/Carousel"
import GiftWare from "./components/GiftWare"
import {reqGoods_hot,reqGoods_vip} from "@/api";
export default {
  name: "index",
  components:{
    Carousel,
    DisplayOnly,
    GiftWare
  },
  data(){
    return{
      title:['上周畅销商品','本周特惠商品'],
      //畅销商品
      goods_boom:[],
      boom_list:[],
      //折扣商品
      goods_vip:[],
      vip_list:[]
    }
  },
  methods:{
    //切换畅销类别
    flag(goods_type){
      this.boom_list = this.goods_boom.filter((item)=>{
        return item.goods_type == goods_type
      })
    },
  //  切换折扣类别
    Flag(goods_type){
          this.vip_list = this.goods_vip.filter((item)=>{
            return item.goods_type == goods_type
          })
    }
  },
  created() {
    //获取商品分类
    this.$store.dispatch('all_Classify')
    //获取畅销商品信息
    reqGoods_hot().then((res=>{
      this.goods_boom = res.data.data
      this.boom_list = res.data.data.filter(i=>i.goods_type == '电子类')
    }))
    //获取推广促销商品信息
    reqGoods_vip().then((res=>{
      this.goods_vip = res.data.data
      this.vip_list = res.data.data.filter(i=>i.goods_type == '服装类')
    }))
  }
}
</script>

<style scoped>
.banner{
  width: 80%;
  height: 160px;
  margin-left: 10%;
}
.banner img{
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: unset;
}
.bottom{
  height: 80px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 400px;
  border-top: 1px dashed rgba(211,211,211,1);
}
.bottom li{
  width: 180px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 2px rgba(211,211,211,1) solid;
  border-right: 2px solid rgba(211,211,211,1);
}
</style>