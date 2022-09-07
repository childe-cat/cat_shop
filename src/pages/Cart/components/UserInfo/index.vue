<template>
<div class="content">
  <div class="box">
    <div class="left">
      <div class="img">
        <img :src="userinfo.img_url" alt="">
      </div>
      <div class="user">
        <h1>{{userinfo.nickname}}<span style="font-size: 0.6em;margin-left: 5px;color: red">VIP:{{userinfo.vip}}</span></h1>
        <p class="email">{{ userinfo.username }}</p>
        <p class="a" style="color: cornflowerblue;cursor: pointer" @click="flag = true">修改密码  ></p>
      </div>
    </div>
    <div class="right">
      <p style="display: flex;align-items: flex-end">
        我的可用M币
        <img @click="isShow=!isShow" v-show="!isShow" style="margin-left: 2%" src="./images/eye.png">
        <img @click="isShow=!isShow" v-show="isShow" style="margin-left: 2%" src="./images/eye_none.png">
      </p>
      <div class="residual">
        <h1 v-show="isShow" style="font-size: 1.5em;margin-top: 8%;">¥{{userinfo.residual}}</h1>
        <h1 v-show="!isShow" style="font-size: 1.5em;margin-top: 8%;color: #ff7900">****</h1>
        <div class="button">在线充值</div>
      </div>
      <p class="target a" @click="$bus.$emit('flag_page','money')">我的M币充值记录  ></p>
    </div>
  </div>
  <div class="zz" v-if="flag">
    <div class="password_box">
      <img class="password_img" src="./images/no.png" alt="" @click="flag=false">
      <div class="input_array">
        <p><span>原密码：</span><input type="text" v-model="old_password"></p>
        <p><span>新密码：</span><input type="text" v-model="new_password" @blur="password_revise"></p>
        <p><span>确认密码：</span><input type="text" v-model="affirm_password"></p>
        <p v-if="ifFlag" class="ts" v-text="text"></p>
      </div>
      <div class="button" style="margin-right: 0;margin-top: 15px" @click="submit_password">确认修改</div>
    </div>
  </div>
  <onlineshopping></onlineshopping>
</div>
</template>

<script>
import onlineshopping from '../OnlineShopping'
import {reqRevise_password} from "@/api";

export default {
  name: "index",
  props:{
    userinfo:{
      type:Object
    }
  },
  data(){
    return{
      //资金显示隐藏
      isShow:false,
    //  修改密码框显示隐藏
      flag:false,
     // 提示框,提示文本
      ifFlag:false,
      text:'',
     // 新旧密码
      old_password:'',
      new_password:'',
    //  确认密码,
      affirm_password:''
    }
  },
  methods:{
  //  密码验证
    password_revise(){
      console.log(1)
    },
  //  修改密码
    async submit_password(){
      //比对两次新密码
      if(this.new_password!==this.affirm_password){
        this.ifFlag = true
        this.text = '两次输入密码不一致'
        return 0
      }
      //发送数据修改
      const result = await reqRevise_password(this.old_password,this.affirm_password)
      console.log(result.data)
      if(result.data.status===0){
        this.flag = false
        alert('修改成功')
      }else if(result.data.message==='旧密码错误'){
        this.isFlag=true
        this.text = '旧密码错误'
      }else if(result.data.message.password){
        this.ifFlag=true
        this.text = '密码为含有大小写的8-16位字符'
      }
    }
  //  在线充值
  },
  components:{
    onlineshopping
  }
}
</script>

<style scoped>
.box{
  width: 100%;
  min-width: 600px;
  display: flex;
  aspect-ratio: 16/3.5;
  margin-bottom: 20px;
}
.left,
.right{
  background-color: white;
  border-radius: 5px;
  display: flex;
  padding: 20px 0 0 30px;
}
.left{
  width: 55%;
  margin-right: 5%;
}
.img{
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.img>img{
  width: 100%;
}
.user{
  margin: 4% 0 0 6%;
}
.user .email{
  height: 25px;
  line-height: 23px;
  margin-top: 10%;
  margin-bottom: 10%;
  padding-left: 22px;
  background: url("./images/email.png") no-repeat 0 0;
  background-size: 21px 21px;
}
.target{
  margin-top: 10%;
  color: cornflowerblue;
  cursor: pointer;
}
.residual{
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.button{
  margin-right: 20px;
  width: 100px;
  height: 30px;
  color: white;
background-color: #6495ef;
  border-radius: 20px;
  font-size: 1.1em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.right{
  width: 40%;
  flex-direction: column;
}
.a:hover{
  text-decoration: underline #6495ef;
}
.zz{
  position: fixed;
  background-color: rgba(211,211,211,0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.password_box{
  position: absolute;
  height: 200px;
  width: 30%;
  padding: 10px 0;
  max-width: 60%;
  top: calc(50% - 100px);
  left: calc(35%);
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.password_img{
  position: absolute;
  right: 15px;
  top: 10px;
}
.input_array{
  width: 80%;
  height: 60%;
  display: flex;
  margin-right: 10%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.input_array p input{
  border: 0;
  border-bottom: 1px solid rgb(211,211,211);
  width: 0;
  flex: 2;
}
.input_array p{
  width: 100%;
  display: flex;
}
.input_array p span{
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 700;
  flex: 1;
  text-align: right;
}
.ts{
  position: absolute;
  bottom: 25%;
  left: 0;
  font-size: 0.8em;
  color: #b42606;
  justify-content: center;
}
</style>