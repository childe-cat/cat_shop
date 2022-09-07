<template>
<div class="nav">
<!--  左侧搜索框-->
<div class="search">
  <transition name="search">
    <input type="text" placeholder="输入关键字搜索" v-model.trim="keyword" v-show="isShow">
  </transition>
  <img src="./images/search.png" alt="搜索" @click="search" @mouseenter.once="isShow=!isShow">
</div>
<!--  中间logo导航条-->
  <div class="content">
    <li @click="$router.push({name:'home'})">首页</li>
    <li @click="flag=!flag">热门分类</li>
    <li>
<!--      <img src="./images/logo.png" alt="">-->
      logo
    </li>
    <li @click="$router.push({name:'member'})">会员优选</li>
    <li @click="$router.push({name:'activity'})">特惠活动</li>
  </div>
<!--  右侧登录购物车-->
  <div class="cart">
<!--    <li @click="toLogin">登录</li>-->
    <img src="./images/cart_white.png" alt="购物车" @click="cart">
  </div>
<!--  分类弹出框-->
       <Select :flag="flag"></Select>
<!--提示弹出框-->
  <keep-alive>
    <Modals :title="head" :none="none">
      <template>
        <p>请先输入商品信息</p>
      </template>
    </Modals>
  </keep-alive>
</div>
</template>

<script>
import Select from "./components/Select/index"
import Modals from "@/components/Modals"
import 'animate.css'
export default {
  name: "index",
  components:{
    Select,
    Modals
  },
  data(){
    return{
      isShow:false,
      keyword:'',
      //  提示框
      head:'提示',
      none:false,
      flag:false
    }
  },
  methods:{
    //传递子组件切换状态
    //登录跳转
    toLogin(){
      this.$router.push({
        name:'login'
      })
    },
    //购物车跳转
    cart(){
        this.$router.push({
          name:'cart',
          page:'userinfo'
        })
    },
    //搜索
    search(){
      if(this.keyword==='') return this.none = !this.none
      this.$router.push({
        name:'search',
        params:{
          keyword:this.keyword
        }
      })
    }
  },
  updated() {
    window.localStorage.setItem('content',this.keyword)
  }
}
</script>

<style scoped>
img{
  cursor: pointer;
}
.nav{
  width: 100%;
  min-width: 720px;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: 550;
  user-select: none;
  background-color: white;
}
.search{
  width: 220px;
  padding-left: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search input{
  width: 180px;
  height: 25px;
  border: 0;
  border-bottom: 2px solid black;
  padding-left: 10px;
}
.search img,
.cart img{
  width: 25px;
  height: 25px;
}
.content{
  height: 100%;
  width: 600px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.content li{
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}
.content li:hover{
  animation: Hover 0.3s linear;
}
.content>li:nth-child(3){
  font-size: 2em;
}
.cart{
  width: 220px;
  padding-right: 5px;
  display: flex;
  justify-content: end;
  align-items: center;
}
.cart li{
  margin-right: 10px;
}
/*过渡效果*/
.search-enter-active{
  animation: Search 0.5s linear;
}
@keyframes Search {
  0%{
    width: 0;
  }
  100%{
    width: 180px;
  }
}
@keyframes Hover {
  0%{
    top: 0px;
  }
  50%{
    top: -10px;
  }
  100%{
    top: 0px;
  }
}
</style>