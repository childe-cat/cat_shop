<template>
<div class="app">
      <p class="title_div">
        <img src="./images/back.png" alt="" @click="go_shop">
        <span>PLUS会员&nbsp;&nbsp;享专属特权</span>
      </p>
      <div class="open_plus" v-if="!userInfo.vip" @click="isShow = true">
        <p>立即开通</p>
        <p>尊敬的{{userInfo.nickname}},您的专属价<span style="font-size: 1.3em">&nbsp;6M/月&nbsp;</span><s style="font-size: 0.9em;color: rgb(81,81,81);">￥30/月</s></p>
      </div>
      <div class="open_plus" v-if="userInfo.vip" @click="go_shop">
    <p>已经开通</p>
    <p>快去挑选您喜欢的商品吧！</p>
      </div>
      <div class="vip">
        <div class="vip_box">
          <p class="vip_title">典藏卡<span style="font-size: 0.7em;font-family: '阿里妈妈数黑体 Bold';font-weight: 700">(尊享四大特权)</span></p>
          <ul class="vip_content">
            <li>
              <img src="./images/a.png" alt="">
              <p>双倍返利</p>
            </li>
            <li>
              <img src="./images/d.png" alt="">
              <p>专属折扣</p>
            </li>
            <li>
              <img src="./images/c.png" alt="">
              <p>运费礼包</p>
            </li>
            <li>
              <img src="./images/b.png" alt="">
              <p>大额优惠卷</p>
            </li>
          </ul>
        </div>
      </div>
  <div class="zz" v-if="isShow">
    <div class="vip_order">
      <img src="./images/back_black.png" alt="返回" @click="isShow = false">
      <h1 style="margin: 1em">会员充值订单</h1>
      <div :style="{'border':money===6?'1px solid green':''}" @click="money=6" class="vip_order_box_m">
        <p>商城会员服务(月)</p>
        <p>6M/月</p>
      </div>
      <div :style="{'border':money===60?'1px solid gray':''}" @click="money=60" class="vip_order_box_one_y">
        <p>商城会员服务(年)</p>
        <p>60M/年</p>
      </div>
      <div class="button" @click="pay">确定支付</div>
    </div>
  </div>
</div>
</template>

<script>
import {reqUserinfo} from "@/api";
export default {
  name: "index",
  data(){
    return{
      money:6,
      isShow:false,
      userInfo:[]
    }
  },
  methods:{
    //饭回首页
    go_shop(){
      this.$router.push({
        name:'home'
      })
    },
    //打开订单
    go_vip(){
      console.log('vip')
    },
  //  充值
    pay(){
      console.log(this.money )
    }
  },
  async created() {
    const result = await reqUserinfo()
    this.userInfo = result.data.data
  }
}
</script>

<style scoped>
.app{
  min-height: 100vh;
  padding-top: 8%;
  background: url("./images/bg1.jpg") no-repeat 0 0 fixed;
  background-size: cover;
  width: 100%;
  padding-left: 80px;
}
.title_div{
  width: 500px;
  text-align: center;
  letter-spacing: 3px;
  color: white;
  font-size: 2.2em;
}
.title_div>img{
  width: 1em;
  margin-right: 1em;
}
.open_plus{
  width: 500px;
  height: 70px;
  margin: 4% 0 8%;
  background-color: rgb(224, 180, 79);
  border-radius: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  opacity: 0.8;
}
.open_plus:hover{
  opacity: 0.9;
}
.open_plus>p:nth-child(1){
  font-size: 1.3em;
  font-weight: 700;
}
.open_plus>p:nth-child(2){
  font-weight: 700;
  font-size: 0.9em;
  letter-spacing: 1px;
}
.vip{
  width: 800px;
  height: 160px;
  border-radius: 5px;
  background-color:rgba(238, 212, 162,0.8);
  padding: 10px 0 0 10px;
}
.vip_box{
  width: 780px;
  height: 140px;
  background-color: rgba(255,255,255,0.5);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.vip_title{
  font-size: 1.4em;
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 700;
}
.vip_content{
  width: 80%;
  height: 80px;
  display: flex;
  justify-content: space-between;
}
.vip_content li{
  display: flex;
  width: 80px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.vip_content li img{
  width: 50px;
  height: 50px;
  object-fit: contain;
}
.vip_content li p{
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 700;
}
.zz{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(211,211,211,0.1);
}
.vip_order{
  width: 400px;
  height: 180px;
  background-color: #e1d8c6;
  position: absolute;
  left: calc(50% - 200px);
  top: calc(50% - 100px);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px dashed white;
}
.vip_order img{
  position: absolute;
  left: 1em;
  top: 0.8em;
  width: 1.5em;
}
div[class^='vip_order_box']{
  display: flex;
  width: 100%;
  cursor: pointer;
  margin-bottom: 1em;
  border-left: 0!important;
  border-right: 0!important;
}
div[class^='vip_order_box'] p{
  flex: 1;
  text-align: center;
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 700;
}
.button{
  width: 100px;
  height: 40px;
  border: 1px solid gray;
  text-align: center;
  line-height: 40px;
  border-radius: 20px;
  cursor: pointer;
}
</style>