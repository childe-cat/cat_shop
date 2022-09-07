<template>
<div class="app">
  <div class="container">
      <li>
        <ul>
          <li>热门产品分类</li>
          <li @click="$router.push({name:'category',params:{keyword:'笔记本'}})">笔记本</li>
          <li @click="$router.push({name:'category',params:{keyword:'手机'}})">手机</li>
          <li @click="$router.push({name:'category',params:{keyword:'实木家具'}})">实木家具</li>
        </ul>
      </li>
    <li>
      <ul>
        <li @click="$router.push({name:'index'})">购买渠道</li>
        <li>商城官网</li>
        <li>线下仓库</li>
        <li>手机商城</li>
      </ul>
    </li>
    <li>
      <ul>
        <li>社区</li>
        <li @click="code=1">QQ群</li>
        <li @click="code=2">微信群</li>
      </ul>
    </li>
    <li style="border-left: 1px solid gray"></li>
    <li>
      <ul>
        <li @click="code=0">yoyocat商城订阅号</li>
        <li>
          <img v-show="code===0" class="code" src="./images/Code.png" alt="订阅号">
          <img v-show="code===1" class="code" src="./images/code1.png" alt="QQ群">
          <img v-show="code===2" class="code" src="./images/qrcode.png" alt="微信群">
        </li>
      </ul>
    </li>
  </div>
  <div class="bottom">
    <div class="bottom_top">
      <li><p>欢迎各位关注我们的官方账号</p></li>
      <ul>
        <li><img src="./images/tiktok.png" alt=""></li>
        <li><img src="./images/bilibili.png" alt="" style="width: 20px"></li>
      </ul>
    </div>
    <hr color="gray">
    <div class="bottom_double">
      <p><a href="https://beian.miit.gov.cn/">鄂ICP备2021014809号-1</a></p>
      <p>本网站直接或间接向消费者推销商品或者服务的商业宣传均属于“测试数据”（所有信息均为测试使用，非真实信息）</p>
      <p>yoyocat喵啊！</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      code:0
    }
  }
}
</script>

<style scoped>
.app{
  background-color: rgb(39, 39, 39);
  color: gray;
  font-size: 0.8em;
  height: 276.2px;
}
.container{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 40px 15% 20px;
}
.code{
  width: 100px;
  border: 2px solid green;
}
.container>li>ul>li{
  margin: 5px 0;
  display: flex;
  justify-content: center;
}
.container>li>ul>li:nth-child(1){
  color: white;
  margin-bottom: 10px;
  font-size: 1.1em;
}
.bottom{
  padding: 10px 10% 5px;
}
.bottom_top{
  display: flex;
  justify-content: end;
  margin-bottom: 5px;
  margin-right: 7%;
}
.bottom_top>ul{
  display: flex;
}
.bottom_top>ul>li>img{
  width: 18px;
  margin-left: 10px;
}
.bottom_double{
  padding: 5px 0 10px;
  display: flex;
  justify-content: space-around;
}
.bottom_double>p>a{
  text-decoration: none;
  color: gray;
}
</style>