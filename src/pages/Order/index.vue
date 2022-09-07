<template>
<div class="app">
  <div class="nav">
<div class="nav_left" @click="$router.push({name:'home'})">
  <span style="font-style: italic;">Yc </span><span style="font-size: 0.9em">商城</span>
</div>
    <div class="nav_right" @click="$router.push({name:'cart'})">
      用户中心
    </div>
  </div>
  <div class="headline">订单确认</div>
  <div class="container">
<!--    订单填写-->
    <div class="content">
<div class="title">收货信息</div>
      <ul class="address">
        <Li><input disabled type="text" value="中国"></Li>
        <Li>
          <input type="text" v-model="address.name" placeholder="姓名">
        </Li>
        <Li>
          <input type="text" v-model="address.tel" placeholder="电话">
        </Li>
        <Li>
          <input type="text" v-model="address.site" placeholder="地址">
        </Li>
        <Li></Li>
      </ul>
      <div class="title">配送方式</div>
      <ul class="delivery">
        <li :style="{'border': address.delivery==='快递'?'2px dodgerblue solid':'2px rgba(211,211,211,1) solid'}" @click="cut('快递')">
          <p>京东 或者 顺丰-邮费20元</p>
          <p>工作日.双休与节假日均可送货</p>
          <p></p>
        </li>
        <li :style="{'border': address.delivery==='自提'?'2px dodgerblue solid':'2px rgba(211,211,211,1) solid'}" @click="cut('自提')">
          <p>自提-普通快递-免费</p>
          <p>工作日.双休均可送货</p>
        </li>
      </ul>
      <div class="title">备注</div>
      <textarea class="text" placeholder="不能超过100个字哦!" maxlength="100" v-model="address.note">

      </textarea>
    </div>
  </div>
  <!--    订单概览-->
  <div :class="flag?'order':'order_fixed'" ref="order">
    <div class="title" style="display:flex;justify-content: space-between;align-items: flex-end">
      <span>订单概览</span><span style="font-size: 0.6em;cursor: pointer" @click="$router.push({name:'cart',params:{page:'onlineshopping'}})">返回购物车</span>
    </div>
    <ul class="order_list">
      <li v-for="item in ready">
        <div class="item">
          <img :src="item.img" alt="商品图片">
          <div class="item_list">
            <p style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;margin: 5px 0 15px 0">{{item.name}}</p>
            <p>{{item.price}}&nbsp;&times;&nbsp;{{item.num}}</p>
          </div>
        </div>
        <div class="price">
          &yen;&nbsp;{{item.price*item.num}}
        </div>
      </li>
    </ul>
<!--    未使用优惠卷-->
    <div class="add_kfc" @click="show_kfc" v-show="!Switch">
      <span>+</span>
      <span>使用优惠卷</span>
    </div>
    <ul class="price_list">
      <li>
        <p>商品总金额：</p>
        <p>&yen;&nbsp;{{total_price}}</p>
      </li>
      <li>
        <p>运费：</p>
        <p>&yen;&nbsp;{{address.freight}}</p>
      </li>
      <!--    使用优惠卷后-->
      <li class="have_kfc" v-show="Switch">
        <p>优惠卷减免：</p>
        <p>-{{address.kfc}}</p>
      </li>
      <li>
        <p>应付金额：</p>
        <p style="zoom: 150%">&yen;&nbsp;{{ param_price }}</p>
      </li>
    </ul>
    <li class="href">
      <p>提交订单即表示我同意 YC 猫猫商城的&nbsp;<span style="color: dodgerblue;cursor:default;">销售政策</span></p>
    </li>
    <div class="submit_order" @click="submit">
      提交订单
    </div>
  </div>
<!--  底部-->
  <div class="bottom">
    <p><span style="font-style: italic">YC</span>商城&nbsp;&reg;yoyocat.xyz&nbsp;注册所有</p>
  </div>
<!--  优惠卷列表-->
  <div class="zz" v-show="isShow">
    <div class="kfc_box">
      <ul class="kfc_list">
        <li
            :class="'kfc_'+item.content.lines"
            @click="active(item.content.lines,item.content.term,item.create_time)"
            :style="{'border': address.kfc===item.content.lines?'2px black solid':'2px rgba(211,211,211,1) dashed'}"
            v-for="item in kfc_list"
            :key="item.id">
          <p>&yen;{{ item.content.lines }}<span style="font-size: 0.3em;margin-left: 5%;font-weight: 500">{{ item.content.name }}</span></p>
          <p>{{item.content.lines}}元优惠卷满{{item.content.term}}元使用</p>
          <p>有效期：{{ get_time(item.create_time) }}——{{ overdue_time(item.create_time,item.content.overdue_time) }}</p>
        </li>
      </ul>
      <div class="button_array">
        <div class="button" style="color: #f13434;border: 1px solid #f13434" @click="isShow=false,address.kfc=0">取消</div>
        <div class="button" style="color: #2996ff;border: 1px solid #2996ff" @click="use_kfc">确定</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {reqKfc, reqPay_order} from "@/api";

export default {
  name: "index",
  props: {
    id:{
      type:Number
    },
    ready: {
      type:Array
    },
    total_price:{
      type:Number,
      default:0
    }
  },
  data(){
    return{
      //优惠卷信息
      kfc_list:[],
      //信息
      address:{
        //收件人
        name:'',
        //电话号码
        tel:'',
        //地址
        site:'',
        //备注
        note:'',
        //寄件方式
        delivery:'快递',
        //快递费
        freight:20,
        //优惠金额
        kfc:0,
        kfc_time:0
      },
      //判断吸顶条件
      flag:true,
    //  控制优惠卷显示
      isShow:false,
      Switch:false
    }
  },
  methods:{
    //切换配送方式
    cut(val){
      this.address.delivery=val
      val==='快递'?this.address.freight=20:this.address.freight=0
    },
  //  提交订单
    submit(){
      if(!this.ready || this.param_price<0){
        return alert('请退出，重新返回订单')
      }
      //生成订单数据
      let order = {
        id:this.id,
        balance:this.param_price,
        courier:this.address.delivery,
        site:this.address.site,
        note:this.address.note,
        name:this.address.name,
        tel:this.address.tel,
        coupon:this.address.kfc,
        create_time:this.address.kfc_time
      }
        //更新订单
        reqPay_order(order).then(res=>{
          const r = res.data
          if(r.status===0){
            this.$router.push({
              name:'cart',
              params:{
                page:'order'
              }
            })
          }else{
            alert('提交失败，请稍候再试')
          }
        })
    },
  //  鼠标滚动事件,订单概览吸顶
    scroll(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      scrollTop < 114?this.flag=true:this.flag=false
    },
    //显示优惠卷
    show_kfc(){
      this.isShow = true
    },
  //  选中优惠卷
    active(lines,term,time){
      if(term>this.total_price) return alert('优惠卷不满足使用条件!取消或重新选择')
      this.address.kfc=lines
      this.address.kfc_time = time
    },
  //  使用优惠卷
    use_kfc(){
      if(this.address.kfc<=0 || this.param_price<0) return alert('优惠卷不满足使用条件!取消或重新选择')
      this.Switch=true
      this.isShow=false
    },
    //  时间戳转换
    timeout(time){
      let date = new Date(time*1);
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = date.getDate() + ' ';
      return Y+M+D;
    }
  },
  computed:{
    //优惠卷时间处理
    get_time(){
      return (time)=>{
        return this.timeout(time)
      }
    },
    overdue_time(){
      return (time,overdue)=>{
        const timer = time*1 + overdue*60*60*24*1000
        return this.timeout(timer)
      }
  },
    //应付金额
    param_price(){
      return this.total_price+this.address.freight-this.address.kfc
    }
  },
  mounted () {
    //创建监听事件
    window.addEventListener('scroll', this.scroll)
    this.scroll()
    //监听数据丢失
    if(!this.ready || this.param_price<0){
      alert('数据丢失，返回订单页面')
      this.$router.push({
        name:'cart',
        params:{
          page:'order'
        }
      })
    }
  //  获取优惠信息
    reqKfc().then(res=>{
      this.kfc_list = res.data.data
    })
  },
  destroyed () {
    //销毁监听事件
    window.removeEventListener('scroll', this.scroll)
  }
}
</script>

<style scoped>
body{
  background-color: white;
}
/*优惠卷概览*/
.zz{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: rgba(251,251,251,0.4);
}
.kfc_box{
  width: 350px;
  height: 250px;
  padding: 10px 0;
  border-radius: 10px;
  position: absolute;
  top: calc(50% - 125px);
  left: calc(50% - 175px);
  background-color: rgba(251,251,251,1);
}
.kfc_list{
  max-height: 210px;
  overflow-y: auto;
}
.kfc_list li{
  width: 80%;
  height: 98px;
  margin: 4px 0 4px 10%;
  border-radius: 10px;
  padding-left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;
}
.kfc_list li p{
  font-size: 0.8em;
  margin-bottom: 5px;
}
.kfc_list li p:nth-child(1){
   font-size: 2em;
   font-weight: 550;
   width: 100%;
 }
.kfc_5{
  background-color: #f39b00;
}
.kfc_10{
  background-color: #d24161;
}
.kfc_20{
  background-color: #7eab1e;
}
.kfc_50{
  background-color: #50add3;
}
.kfc_100{
  background-color: #b42606;
}
.button,
.button_array{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.button_array{
  border-top: 1px dashed rgb(150,150,150);
  height: 50px;
  margin-top: 10px;
}
.button{
  width: 80px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
}
.nav{
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgba(211,211,211,0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10%;
}
.nav_left{
  font-weight: 500;
  font-size: 1.6em;
  cursor: pointer;
}
.nav_right{
  display: flex;
  font-size: 1.1em;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}
.headline{
  width: 100%;
  font-size: 2em;
  display: flex;
  justify-content: center;
  padding: 30px 0 0 0;
}
.container{
  display: flex;
  padding: 0 0 0 10%;
  justify-content: space-between;
  position: relative;
}
.title{
  font-size: 1.4em;
  margin: 30px 0 20px;
}
.address,
.delivery{
  width: 85%;
}
.address li{
  margin-bottom: 15px;
  position: relative;
}
.address li input{
  border: 0;
  border: 1px solid rgba(211,211,211,1);
  width: 100%;
  height: 50px;
  border-radius: 5px;
  font-size: 1.1em;
  padding-left: 10px;
  padding-top: 13px;
}
.address li:nth-child(1) input{
  background-color: rgba(211,211,211,0.3);
  padding-top: 20px;
  color: gray;
}
.address li:nth-child(1)::before{
  content: '国家或地区';
  position: absolute;
  color: gray;
  font-size: 0.7em;
  padding:5px 0 0 5px ;
}
.delivery li{
  height: 120px;
  margin-bottom: 15px;
  border-radius: 10px;
  padding: 25px 0 0 0;
  cursor: default;
}
.delivery li p{
  font-size: 1.2em;
  margin-bottom: 10px;
 text-align: center;
  color: rgba(81,81,81,1);
}
.text{
  width: 90%;
  height: 120px;
  border: 2px rgba(211,211,211,1) solid;
  border-radius: 10px;
  resize: none;
  padding: 10px;
  outline: none;
}
.content{
  border-right: 2px solid rgb(201,201,201);
  width: 55%;
}
.order_fixed{
  width: 25%;
  height: 460px;
  position: fixed;
  top: 0;
  left: 65%;
}
.order{
  width: 25%;
  height: 460px;
  position: absolute;
  top: 15%;
  left: 65%;
}
.order_list{
  padding: 0 20px 0;
  border-bottom: 1px rgba(211,211,211,1) solid;
  margin-bottom: 10px;
  max-height: 277px;
  overflow-y: auto;
}
.order_list li{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.item img{
  width: 30%;
  border-radius: 5px;
}
.item_list{
  width: 60%;
  flex-direction: column;
  justify-content: space-around;
}
.item{
  display: flex;
  flex: 7;
  justify-content: space-between;
}
.price{
  flex: 3;
  text-align: right;
}
.add_kfc{
  height: 30px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  cursor: pointer;
}
.add_kfc span:nth-child(1){
  font-size: 1.2em;
  width: 20px;
  height: 20px;
  display: block;
  border: 1px solid gray;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: white;
  background-color: dodgerblue;
}
.have_kfc{
  display: flex;
  justify-content: space-between;
}
.price_list{
  margin-top: 10px;
  padding: 0 20px 10px;
}
.price_list li{
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.href{
  font-size: 0.5em;
  text-align: center;
}
.submit_order{
  margin: 20px 20px 0;
  height: 50px;
  border-radius: 5px;
  border: 1px solid gray;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  color: white;
  padding-left: 20px;
  font-weight: 550;
  background: url("./images/look.png") no-repeat calc(50% - 35px) center,linear-gradient(#2996ff,#007cff);
  background-size: 20px;
}
.submit_order:hover{
  opacity: 0.9;
}
.bottom{
  margin-top: 40px;
  height: 80px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom p{
  font-family: cursive;
  font-size: 0.9em;
  font-weight: 700;
}
</style>