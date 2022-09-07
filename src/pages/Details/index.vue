<template>
<div class="app">
<!--  导航条-->
<div class="details_nav">
  <p class="nav_left">
    <span @click="$router.push({name:'home'})">首页</span>&nbsp;>
    <span>热门分类</span>&nbsp;>
    <span>{{goods_details.goods_type}}</span>&nbsp;>
    <span>{{goods_details.goods_category}}&nbsp;:</span>
  </p>
  <div class="nav_right">
    <div><p class="zy">自营</p><span>Yo猫自营旗舰店</span></div>
    <span @click="flag=!flag" class="kf">微信客服</span>
    <span class="gz">关注店铺</span>
  </div>
  <div v-show="flag" class="wx">
    <p>微信扫码联系客服</p>
    <img src="./images/qrcode.png" alt="">
  </div>
</div>
<!--  商品详情-->
  <div class="details">
<!--    商品图片-->
    <img :src="goods_details.goods_image" alt="" class="details_img">
<!--    商品介绍-->
    <div class="details_content">
      <p class="name">{{ goods_details.goods_name }}</p>
      <p class="intro">{{goods_details.goods_Details}}</p>
      <p class="price"><span style="font-family: Arial">&yen;</span>&nbsp;{{goods_details.goods_price}}</p>
      <div class="num">
        <p>数量：</p>
        <div class="num_content">
          <p>{{num}}</p>
          <div class="small_num">
            <div @click="num++">+</div>
            <div @click="num>1?num--:0">-</div>
          </div>
        </div>
      </div>
      <p class="tp">总价:{{goods_details.goods_price * num}}</p>
      <div class="use">
        <div class="button" @click="go_order" style="background-color: rgb(255, 237, 237);color: red">立即购买</div>
        <div class="button" @click="add_cart" style="background-color: rgb(196, 0, 1);color:white">加入购物车</div>
      </div>
    </div>
    <!--  推荐-->
    <div class="AD">
      <div>看了又看<img src="./images/flush.png" title="刷新" @click="ruffle"></div>
      <ul class="AD_list">
        <li v-for="item in AD_shop.slice(0,2)" :key="item.id" @click="shop_id=item.id">
          <img :src="item.goods_image" class="AD_img"></img>
          <p class="AD_name">{{ item.goods_name }}</p>
          <p class="AD_price">￥{{ item.goods_price }}</p>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import {reqPay_no_order, reqSearch_id, reqAdd_cart,reqGoods_vip} from "@/api";

export default {
  name: "index",
  props:{
    id:{
      type:Number,
      default:2
    }
  },
  data(){
    return{
      //商品ID
      shop_id: 1,
    //  商品数据
      goods_details:{},
      //要添加的数量
      num:1,
    //  订单数据
      pay_no:{},
    //  推荐商品
      AD_shop:[],
    //  微信客服
      flag:false
    }
  },
  methods:{
    //随机排序
    ruffle(){
      this.AD_shop.sort(()=>{
        return 0.5-Math.random()
      })
    },
  //  立即购买
    go_order(){
      if(this.num<=0) return alert('商品数量不能小于1')
      //生成商品id序列和商品数量组成对象数组
      let blurb = []
        let object = {
          name:this.goods_details.goods_name,
          img:this.goods_details.goods_image,
          price:this.goods_details.goods_price,
          num:this.num
        }
        blurb.push(object)
      blurb = JSON.stringify(blurb)
      //生成订单时间
      let time = this.utils.timeNow()
      //未付款订单详情
      this.pay_no = {
        blurb: blurb,
        money:this.goods_details.num * this.goods_details.goods_price,
        time:time
      }
      //发起请求生成订单
      reqPay_no_order(this.pay_no).then(res=>{
        const id = res.data.data
        if(res.data.status===0){
          //跳转提交订单页
          this.$router.push({
            name:'order',
            params:{
              id:id,
              ready:JSON.parse(this.pay_no.blurb),
              total_price:this.goods_details.goods_price * this.num
            }
          })
        }else{
          alert('请稍后再试')
        }
      })
    },
    //加入购物车
    async add_cart(){
      for(let i = 0;i<this.num;i++){
        let result = await reqAdd_cart(this.goods_details.id)
        if(result.data === 1) return alert('加入购物车失败!')
      }
      alert('添加成功!')
    }
  },
  computed:{
    ad_shop() {
      return JSON.parse(JSON.stringify(this.AD_shop))
    }
  },
  watch:{
    //监听传递来的商品id发送查询请求
    id:{
      handler(newV){
        this.shop_id = newV
        reqSearch_id(this.shop_id).then(res=>{
          this.goods_details = res.data.data
        })
      },
      immediate:true
    },
  //  请求数据
    shop_id(){
      reqSearch_id(this.shop_id).then(res=>{
        this.goods_details = res.data.data
      })
    },
  //  监听AD是否有重复
    ad_shop:{
      handler(a, b) {
        let arr1 = a.slice(0, 2)
        let arr2 = b.slice(0, 2)
        //将数组序列化为字符串通过set方法去重再反序列化数组
        let arr3 = [...new Set([...arr1,...arr2].map(item=>JSON.stringify(item)))].map(item => JSON.parse(item))
        arr3.length!==4?this.ruffle():0
      },
      deep:true
    }
  },
  created() {
    reqGoods_vip().then(res=>{
      const result = res.data.data
      this.AD_shop = result.filter(item=>item.goods_type === this.goods_details.goods_type)
      this.ruffle()
    })
  }
}
</script>

<style scoped>
.app{
  width: 100%;
  background-color: white;
  height: calc(100vh - 346.2px);
}
/*导航条*/
.details_nav{
  height: 30px;
  width: 100%;
  padding: 0 10%;
  line-height: 30px;
  border-bottom: 1px dashed rgba(211,211,211,1);
  border-top: 1px dashed rgba(211,211,211,1);
  display: flex;
  justify-content: space-between;
  position: relative;
}
.nav_left span{
  font-family: '阿里妈妈数黑体 Bold'!important;
}
.nav_right{
  display: flex;
}
.details_nav p,
.details_nav span{
  font-family: cursive;
  font-size: 0.95em;
  font-weight: 700;
  cursor: default;
}
.nav_right>div{
  display: flex;
  margin-right: 10px;
}
.zy{
  background-color: red;
  color: white;
  text-align: center;
  border-radius: 5px;
  height: 20px;
  line-height: 20px;
  margin-top: 5px;
  margin-right: 5px;
  padding-right: 2px;
}
.kf{
  background: url("./images/qq.png") no-repeat 0 center;
  background-size: 20px;
  padding-left: 20px;
  margin-right: 10px;
}
.gz{
  background-size: 20px;
  background: url("./images/store.png") no-repeat 0 center;
  padding-left: 20px;
}
.details_nav span:hover{
  color: red;
}
.wx{
  position: absolute;
  width: 105px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  top:40px;
  right: 13.6%;
  background-color: white;
}
.wx>p{
  font-size: 0.8em;
}
.wx>img{
  width: 85px;
  height: 85px;
}
/*详情*/
.details{
  display: flex;
  justify-content: space-around;
  padding: 30px 10% 20px;
}
.details div,
.details p,
.details span{
  font-family: cursive;
  font-weight: 700;
}
.details_img{
  width: 25%;
  max-height: 308px;
  aspect-ratio: 1/1;
}
.details_content{
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1%;
}
.name,
.intro,
.price,
.num,
.use,
.tp,
.num_content,
.button{
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.num_content p{
  margin-left: 20px;
  font-size: 2em;
  height: 40px;
  width: 40px;
  text-align: center;
  border: 1px solid rgba(211,211,211,1);
}
.small_num div{
  border-left: 0!important;
  border: 1px solid rgba(211,211,211,1);
  height: 20px;
  width: 20px;
  text-align: center;
  cursor: pointer;
}
.name{
  font-size: 1.5em;
}
.intro{
  font-size: 0.8em;
  text-indent: 2em;
}
.price{
  height: 10%;
  width: 100%;
  padding-left: 5%;
  font-size: 1.2em;
  background-color: rgba(255, 180, 179,0.5);
}
.use{
  width: 55%;
  height: 20%;
  justify-content: space-between;
}
.button{
  margin: 0;
  width: 40%;
  height: 50%;
  border: 1px solid gray;
  justify-content: center;
  border-radius: 2px;
  font-weight: 550!important;
  cursor: pointer;
}
/*广告*/
.AD{
  width: 14%;
  aspect-ratio: 1/2;
}
.AD>div{
  font-size: 1.1em;
  color: rgb(101,101,101);
  display: flex;
  padding: 5px 15% 0;
  justify-content: space-around;
  align-items: center;
}
.AD_list li{
  width: 60%;
  margin: 10px auto 0;
}
.AD_img{
  width: 100%;
  aspect-ratio: 1/1;
}
.AD_name{
  overflow: hidden;
  margin-top: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.8em;
  text-align: center;
}
.AD_price{
  text-align: center;
}
</style>