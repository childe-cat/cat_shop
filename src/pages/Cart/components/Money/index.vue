<template>
  <div class="content">
    <div class="content_box">
      <div class="title">资金总览</div>
<!--      有m币-->
          <div class="box"
               v-if="residual"
          >
            <div class="text_box">
              <p class="money">
                可用余额 (M)
                <img @click="isShow=!isShow" v-show="!isShow" src="./images/eye.png" alt="">
                <img @click="isShow=!isShow" v-show="isShow" src="./images/eye_none.png" alt="">
              </p>
              <p v-show="isShow" style="zoom: 250%;color:#ff7900;">{{residual}}</p>
              <p v-show="!isShow" class="residual_none">*****</p>
              <p @click="flag = true">我的 M 币充值记录 ></p>
            </div>
          </div>
<!--      没有m币-->
          <div
          class="none_box"
          v-if="!residual"
      >
        <div class="none_text">
          <p>暂无M币</p>
          <p>M币可用于抵扣订单中等值金额的货币。</p>
        </div>
      </div>
    </div>
<!--    充值记录-->
    <div class="zz" v-if="flag">
      <div class="log">
        <img src="./images/no.png" alt="关闭" @click="flag = false">
        <ul class="log_list">
          <li>
            <p>订单号</p>
            <p>用户账户</p>
            <p>充值额度</p>
            <p>剩余额度</p>
            <p>充值时间</p>
          </li>
          <li v-for="item in pay_rank" :key="item.id">
            <p>{{ item.id }}</p>
            <p>{{ item.username }}</p>
            <p>{{ item.credit }}</p>
            <p>{{ item.balance}}</p>
            <p>{{ item.time }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <p style="font-size: 1.1em">M币说明</p>
      <li class="extra">M 币是猫猫商城的虚拟货币，在猫猫商城，它可以作为实际货币来使用。</li>
      <ol class="m_text">
        <li>M 币单位与人民币相同。</li>
        <li>M 币不能兑现，也不支持转让给其他账户使用。</li>
        <li>在猫猫商城的付款页面，账户中的 M 币可用于抵扣订单中等值金额的货币（运费除外），抵扣后仍未达订单支付总额时，可通过其他支付方式支付剩余金额。</li>
        <li>订单签收成功之后，M 币还不能马上使用，只有在可退货期内没有产生退货等行为，M 币才可生效。M 币通常在订单签收 15-35 天内生效。</li>
        <li>M 币的有效期是生效之后的次年年末。此次调整，2022 年 6 月 30 日 23:59:59 （北京时间）之前生效的M 币不过期，但在购买商品使用M 币时将优先使用。</li>
      </ol>
    </div>
  </div>
</template>

<script>
import {reqSkype} from "@/api";
export default {
  name: "index",
  props:['residual'],
  data(){
    return{
      //余额显示
      isShow:false,
      //充值记录
      flag:false,
      pay_rank:[]
    }
  },
  async created() {
    const result = await reqSkype()
    this.pay_rank = result.data.data
  }
}
</script>

<style scoped>
.content{
  width: 100%;
  min-height: 200px;
}
.content_box,
.bottom{
  background-color: white;
  border-radius: 15px;
  padding: 30px 40px 20px;
  margin-bottom: 20px;
}
.title{
  font-size: 2em;
}
.box,
.none_box{
  width: 100%;
  height: 250px;
  /*border: 1px solid gray;*/
  display: flex;
  margin: 20px 0 0;
  align-items: center;
}
.box{
  height: auto;
  margin-left: 4%;
}
.none_box{
  background: url("./images/money.png") no-repeat center 40%;
  justify-content: center;
}
.none_text{
  margin-top: 10%;
}
.none_text p{
  text-align: center;
  margin-top: 5px;
  font-size: 0.9em;
}
.none_text p:nth-child(1){
  font-size: 1.3em;
}
.m_text,
.extra{
  font-size: 0.8em;
}
.bottom{
  margin: 0;
  color: rgba(151,151,151,1);
}
.extra{
  margin-top: 1.5%;
}
.m_text li{
  margin-top: 0.5%;
  list-style: decimal!important;
  margin-left: 1em;
}
.money{
  font-size: 0.6em;
  color: rgba(151,151,151,1);
  display: flex;
  align-items: flex-end;
  margin-bottom: 5%;
}
.money>img{
  margin-left: 5%;
}
.text_box p:last-child{
  color: dodgerblue;
  cursor: pointer;
}
.text_box p:last-child:hover{
  text-decoration:underline #2996ff;
}
.residual_none{
  color:#ff7900;
  zoom: 250%;
  display: flex;
  align-items: flex-end;
}
/*充值记录*/
.zz{
  width: 100%;
  height: 100%;
  background-color: rgba(211,211,211,0.5);
  position: fixed;
  left: 0;
  top: 0;
}
.log{
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60%;
  height: 60%;
  border-radius: 10px;
  background-color: white;
}
.log img{
  position: absolute;
  right: 20px;
  top: 15px;
}
.log_list{
  width: 90%;
  height: 80%;
  margin-top: 5%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border: 1px solid rgb(181,181,181);
}
.log_list li:nth-child(1){
  height: 20%;
}
.log_list li:nth-child(1) p{
  font-size: 1.4em;
}
.log_list li{
  display: flex;
  width: 100%;
  height: 15%;
  flex-shrink: 0;
}
.log_list li p{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgb(181,181,181);
  border-bottom: 1px solid rgb(181,181,181);
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 700;
  font-size: 0.9em;
}
.log_list li p:last-child{
  border-right: 0!important;
}
</style>