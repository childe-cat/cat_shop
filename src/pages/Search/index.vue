<template>
<div class="app">
  <div class="search_nav">
<!--  左侧导航栏-->
  <div class="nav_left">
    <div class="logo">
    <i>LOGO</i>
  </div>
    <input type="text" v-model.trim="content">
    <div class="button" @click="search">搜一下</div>
    <img class="no" src="./images/no.png" alt="叉" v-show="content" @click="content=''">
  </div>
<!--  右侧-->
  <ul class="nav_right">
    <li @click="go('home')">商城首页</li>
    <li class="userinfo" v-if="userinfo">
      <img :src="userinfo.img_url" alt="">
      <p @click="go('cart')">{{userinfo.nickname}}</p>
    </li>
    <li v-if="!userinfo" @click="go('login')">立即登录</li>
  </ul>
</div>
  <p class="length">商城为您找到相关结果约为{{ length }}个</p>
  <div class="content">
    <ul v-if="goods_list" class="shop_list">
      <li v-for="item in pageShow" :key="item.id">
        <div class="name" @click="go_details(item.id)">{{item.goods_name}}</div>
        <div class="details">
          <img class="details_img" :src="item.goods_image" @click="go_details(item.id)">
          <div class="details_box">
            <p class="details_p" @click="go_details(item.id)">
              {{item.goods_Details}}
            </p>
            <div class="tag_box">
              <p class="tag" @click="$router.push({name:'category',params:{keyword:item.goods_category}})">{{item.goods_category}}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <img v-if="!goods_list" src="./images/no_2.png" alt="没有商品" style="margin-left: -5%">
    <ol :class="flag?'search_hot':'search_hot_fixed'">
      <p>热搜&nbsp;></p>
      <li class="search_li" @click="go_details(item.id)" v-for="item in hot" :key="item.id"><span class="id">{{id(item.goods_name)+1}}</span>{{item.goods_name}}</li>
    </ol>
  </div>
  <ul class="idx" v-show="pageNum!==1">
    <li @click="page(Page-1)" v-show="Page!==0"><</li>
    <li class="active_no" v-show="Page==0"></li>
    <li @click="page(Page-3)" v-show="Page>2">{{Page-2}}</li>
    <li @click="page(Page-2)" v-show="Page>1">{{Page-1}}</li>
    <li @click="page(Page-1)" v-show="Page>0">{{Page}}</li>
    <li class="active" @click="page(Page)">{{Page+1}}</li>
    <li @click="page(Page+1)" v-show="pageNum>Page+1">{{Page+2}}</li>
    <li @click="page(Page+2)" v-show="pageNum>Page+2">{{Page+3}}</li>
    <li @click="page(Page+3)" v-show="pageNum>Page+3">{{Page+4}}</li>
    <li class="active_no" v-show="Page==pageNum-1"></li>
    <li @click="page(Page+1)" v-show="Page!==pageNum-1">></li>
  </ul>
</div>
</template>

<script>
import {reqSearch_goods, reqUserinfo, reqGoods_hot} from "@/api"
export default {
  name: "index",
  props: {
    keyword:{
      type:String,
      default:''
    }
  },
  data(){
    return{
      //搜索内容
      content:'',
      //搜索结果
      goods_list:[],
     // 分页
     // 所有数据
      totalPage:[],
     // 单页数据
      pageSize:10,
     // 总共页数
      pageNum:1,
     // 显示的数据
      pageShow:[],
     // 显示第几页
      Page:0,
     // 用户信息
     userinfo:[],
      //热销
      hot_list:[],
    //  判断吸顶
      flag:true
    }
  },
  methods:{
    //路由跳转
    go(name){
      this.$router.push({
        name:name
      })
    },
    //跳转商品详情
    go_details(id){
      this.$router.push({
        name:'details',
        params:{
          id:id
        }
      })
    },
    //分页
    fenye(){
      //获取页数
      this.pageNum = Math.ceil(this.goods_list.length / this.pageSize) || 1
      //存放每一页的数据
      for(let i = 0;i<this.pageNum;i++){
        this.totalPage[i] = this.goods_list.slice(this.pageSize * i,this.pageSize * (i + 1))
      }
      this.Page = 0
    },
    //分页跳转
    page(num){
      this.Page = num
      this.pageShow = this.totalPage[this.Page]
    },
    //搜索功能
    async search(){
      if(this.content === '') return 0
      window.localStorage.setItem('content',this.content)
      const result = await reqSearch_goods(this.content)
      this.goods_list = result.data.data
      this.fenye()
      this.page(this.Page)
    },
    //  鼠标滚动事件,热搜吸顶
    scroll(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      scrollTop < 142?this.flag=true:this.flag=false
    },
  },
  computed:{
    //返回长度
    length(){
      if(!this.goods_list) return 0;
      return this.goods_list.length
    },
  //  热销排序
    hot(){
      return this.hot_list.sort((a,b)=>{b.goods_sold - a.goods_sold}).slice(0,10)
    },
  //  热搜序号
    id(){
      return name=>{
        return this.hot.findIndex(item=>item.goods_name === name)
      }
    }
  },
  async created() {
    window.localStorage.getItem('content') ? this.content = window.localStorage.getItem('content') : this.content = this.keyword
    //商品信息
    const shop_result = await reqSearch_goods(this.content)
    this.goods_list = shop_result.data.data
    //分页
    this.fenye()
    this.page(this.Page)
  //  用户头像
    const img_result = await reqUserinfo()
    this.userinfo = img_result.data.data
  //  获取热销记录
    const hot_result = await reqGoods_hot()
    this.hot_list = hot_result.data.data
  },
  mounted() {
    //创建监听事件
    window.addEventListener('scroll', this.scroll)
    this.scroll()
  },
  destroyed () {
    window.localStorage.setItem('content',this.content)
    //销毁监听事件
    window.removeEventListener('scroll', this.scroll)
  }
}
</script>

<style scoped>
.app{
  min-height: calc(100vh);
  background-color: white;
}
/*导航条*/
.search_nav{
  width: 100%;
  height: 60px;
  padding: 0 2%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 960px;
}
.nav_left{
  width: 45%;
  display: flex;
  align-items: center;
  position: relative;
}
.logo{
  width: 20%;
  text-align: center;
  font-size: 2em;
  font-family: "阿里妈妈数黑体 Bold";
}
.logo~input{
  margin-left: 5%;
  height: 35px;
  width: 60%;
  padding-left: 10px;
  border: 2px solid rgb(211,211,211);
  border-right: 0;
  border-radius: 10px 0 0 10px;
}
.logo~input:focus{
  border: 2px solid #4e6ef2;
}
.button{
  height: 35px;
  width: 15%;
  background-color: #4e6ef2;
  border-radius: 0 10px 10px 0;
  text-align: center;
  line-height: 35px;
  color: white;
  font-size: 1.2em;
  cursor: pointer;
}
.no{
  position: absolute;
  left: 80%;
}
.nav_right{
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.nav_right li{
  cursor: pointer;
  font-size: 0.8em;
}
.userinfo{
  display: flex;
  align-items: center;
  width: 50%;
}
.userinfo img{
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin-right: 5%;
  border: 1px solid #4e6ef2;
  border-radius: 50%;
}
.userinfo p{
  width: 100%;
  font-size: 0.8em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.length{
  font-size: 0.9em;
  color: rgb(121,121,121);
  padding-left: 15%;
}
.content{
  display: flex;
  justify-content: space-between;
  margin-top: 1%;
  padding: 0 15% 2%;
  border-bottom: 1px dashed rgba(211,211,211,1);
}
.shop_list{
  width: 40%;
}
.shop_list li{
  justify-content: center;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.name{
  min-width: 40%;
  max-width: 80%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: rgb(35, 64, 195);
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 600;
  border-bottom: 2px solid rgb(35,64,195);
  margin-bottom: 5px;
  padding-bottom: 2px;
  cursor: pointer;
}
.details{
  width: 100%;
  height: 100px;
  display: flex;
  align-items: start;
}
.details_img{
  max-width: 100px;
  max-height: 100px;
  border-radius: 10px;
}
.details_box{
  display: flex;
  width: 70%;
  margin-left: 20px;
  height: 100%;
  padding: 5px 0;
  flex-direction: column;
  justify-content: space-around;
}
.tag_box{
  width: 100%;
  display: flex;
  justify-content: end;
  padding-right: 25px;
}
.tag{
  width: 60px;
  height: 20px;
  line-height: 17px;
  border-radius: 8px;
  font-size: 0.6em;
  border: 1px solid gray;
  text-align: center;
  background-color: #027bff;
  color: white;
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 700;
  cursor: pointer;
}
.details_p{
  display: flex;
  text-indent: 2em;
  font-size: 0.8em;
  letter-spacing: 2px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp:3;
  text-overflow: ellipsis;
  overflow: hidden;
}
.search_hot{
  width: 30%;
  height: 500px;
  margin: 5% 5% 0 0;
}
.search_hot_fixed{
  width: 25%;
  height: 500px;
  margin: 1% 5% 0 0;
  position: fixed;
  right: calc(4.5% - 3px);
  top: -10px;
}
.search_hot>p,
.search_hot_fixed>p{
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 700;
}
.search_hot>p:hover,
.search_hot_fixed>p:hover{
  color: #027bff;
}
.search_li{
  width: 100%;
  height: 25px;
  line-height: 25px;
  cursor: pointer;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #2996ff;
  display: flex;
  font-size: 0.9em;
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 700;
}
.search_li:nth-child(2) span{
  color: red!important;
}
.search_li:nth-child(3) span{
  color: red!important;
}
.search_li:nth-child(4) span{
  color: red!important;
}
.search_li:hover{
  color: red;
}
.id{
  display: block;
  width: 30px;
  text-align: center;
  color: gray;
}
.idx{
  margin-left: 15%;
  width: 25%;
  height: 40px;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 1px dashed rgba(211,211,211,1);
}
.idx li{
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 0.8em;
  color: rgb(123, 123, 123);
  cursor: pointer;
  margin: 0 10px;
}
.idx li:nth-child(1),
.idx li:last-child{
  font-size: 1.5em;
}
.idx li:hover{
  background-color: rgb(241, 243, 244);
  color: black;
}
.active{
  border-bottom: 2px solid dodgerblue;
}
.active:hover{
  background-color: white!important;
}
.active_no{
  border: 0!important;
  cursor: default!important;
}
.active_no:hover{
  background-color: white!important;
}
</style>