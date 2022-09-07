<template>
<div class="app">
  <div class="container">
    <img class="left" src="./images/back.png" alt="" @click="back">
    <img src="./images/cut.png" alt="" class="right" @click="show">
    <img class="logo" src="./images/logo.png" alt="">
      <h1 v-show="flag">Log In</h1>
      <h1 v-show="!flag">Sign Up</h1>
    <ul>
      <li>账号：<input type="text" v-model="username" placeholder="请输入您的邮箱地址"></li>
      <li>密码：<input type="text" v-model="password" placeholder="含大小写及数字的8位字符"></li>
    </ul>
    <li class="hint">{{hint}}</li>
    <div class="button" v-show="flag" @click="login">登录</div>
    <div class="button" v-show="!flag" @click="signup">注册</div>
  </div>
</div>
</template>

<script>
import {reqLogin,reqRegister} from "@/api";

export default {
  name: "index",
  data(){
    return{
      flag:true,
      hint:'',
      username:'',
      password:''
    }
  },
  methods:{
    //切换
    show(){
      this.flag=!this.flag
      this.username = ''
      this.password = ''
    },
    //返回
    back(){
      this.$router.push({
        name:'home'
      })
    },
    //验证

    //注册
    signup(){
      reqRegister(this.username,this.password).then((res=>{
        console.log(res.data)
        if(res.data.status==1){
          if(res.data.message=='用户名被占用，请更换其他用户名') return this.hint = res.data.message
          this.hint = '用户名或密码不符合要求'
        }
        this.flag = !this.flag
      }))
    },
    //登录
    login(){
      reqLogin(this.username,this.password).then((res=>{
        if(res.data.status==1){
          if(typeof res.data.message == "string") return this.hint = res.data.message
          this.hint = '用户名或密码不符合要求'
        }
          localStorage.setItem('token',res.data.token)
        this.$router.push({
          name:'cart'
        })
      }))
      // this.$router.push({
      //   name:'cart'
      // })
    }
  },
  watch:{
    username(){
      this.hint=''
    },
    password(newVal){
      if(newVal!=='') return this.hint=''
    },
    hint(newVal){
      if(newVal!=='') return this.password = ''
    }
  }
}
</script>

<style scoped>
.app{
  width: 100%;
  height: 100vh;
  /*background-color:rgb(250, 233, 189);*/
  background: url("./images/bg3.png") no-repeat center;
  background-size: 100vw 100vh;
  padding-top: 180px;
}
.left{
  position: absolute;
  top: 10px;
  left: 10px;
  width: 50px;
  height: 50px;
  transform: rotate(180deg);
  transition: 0.5s;
}
.left:hover{
  transform: rotate(360deg);
}
.right{
  position: absolute;
  top: 13px;
  right: 13px;
  transition: 0.5s;
  width: 40px;
  height: 40px;
}
.right:hover{
  transform: rotate(180deg);
}
.left,
.right{
  border-radius: 50%;
}
.container{
  width: 620px;
  min-height: 360px;
  border: 1px solid rgba(211,211,211,1);
  border-radius:10px;
  background-image: linear-gradient(to left bottom,rgba(255,255,255,0.4),rgba(255,255,255,0.1));
  backdrop-filter: blur(5px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: -5px 9px 14px 1px rgba(111,111,111,0.7);
  position: relative;
  padding-bottom: 20px;
}
.logo{
  width: 200px;
}
h1{
  font-size: 2.5em;
}
ul{
  color: white;
  font-size: 1.2em;
  height: 92px;
}
ul>li{
  margin-top: 20px;
  height: 40px;
}
input{
  border: 0;
  border-bottom: 1px solid white;
  background: rgba(255,255,255,0);
  margin-right: 20px;
}
.button{
  margin-top: 30px;
  height: 35px;
  width: 80px;
  text-align: center;
  border-radius: 10px;
  color: white;
  font-size: 1.5em;
  background-color: rgba(55,55,55,0.3);
  cursor: pointer;
}
.hint{
  margin-top: 20px;
  font-size: 0.8em;
  color: green;
}
</style>