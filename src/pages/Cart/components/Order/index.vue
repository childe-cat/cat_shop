<template>
<div class="content">
  <div class="title">我的订单</div>
  <ul class="order_list">
    <li v-for="item in order" :key="item.id">
      <div class="li_head">
<!--        <input type="checkbox">-->
        <p class="li_time">{{item.time}}<span style="margin-left: 10%">订单号：{{item.id}}</span></p>
        <p>总价：{{item.money}}<span>（含运费{{item.site?20:0}}元）</span></p>
        <p class="qq" @click="go_qq(item.id)">联系客服</p>
        <img style="margin-left: 12%;cursor: pointer" @click="del(item.id,item.status)" src="./images/del.png" alt="">
      </div>
      <ul class="li_content">
        <li v-for="good in item.blurb" :key="good.name">
          <div class="blurb">
            <img @click="details(good.id)" :src="good.img" alt="商品图片">
            <div @click="details(good.id)" class="blurb_name">{{good.name}}</div>
            <div class="price_div">
              <p style="font-size: 0.7em">原价￥{{good.price}}</p>
              <p style="font-size: 0.9em">实付￥{{good.price}}</p>
            </div>
            <div class="num">
              <p>{{good.num}}</p>
            </div>
          </div>
        </li>
        <div class="order_status">
          <div class="status" :style="{color:color(item.status)}">
            {{status(item.status)}}
          </div>
          <div class="button" :style="{borderColor:color(item.status)}" @click="dispose(item.status,item.id)">
            {{dispose_status(item.status)}}
          </div>
        </div>
      </ul>
    </li>
  </ul>
</div>
</template>

<script>
import {reqSearch_order,reqDel_order} from "@/api";
export default {
  name: "index",
  data(){
    return{
      //订单列表
      order:[]
    }
  },
  methods:{
    //商品跳转
    details(id){
      this.$router.push({
        name:'details',
        params:{
          id:id
        }
      })
    },
    //查询订单
    search_order(){
      reqSearch_order().then(res=>{
        this.order = res.data.data
        // json转数组订单商品
        this.order.forEach(item=>{
          item.blurb = JSON.parse(item.blurb)
        })
      })
    },
    //跳转客服
    go_qq(id){

    },
  //  删除订单
    async del(id,status){
      if(status==='1') return alert('订单处理中')
      const result = await reqDel_order(id)
      if(result.data.status===0){
        this.search_order()
      }else{
        alert('删除失败，请稍候再试!')
      }
    },
  //  处理订单
    dispose(status,order_id){
      //生成前往订单的必要数据：商品图片，商品名称，商品价格，商品数量，总价
      let ready=[]
      let total_price = 0
      //获取当前订单商品数据
      this.order.forEach(item=>{
        if(item.id===order_id){
          ready=item.blurb
        }
      })
      //修改符合要求的属性名称
      ready = ready.map(item=>({
        ...item,
        goods_image:item.img,
        goods_name:item.name,
        goods_price:item.price
      }))
      //获取总价格
      ready.forEach(item=>{
        total_price+=item.goods_price*item.num
      })
      switch (this.status(status)){
        case '未付款':
          this.$router.push({
            name:'order',
            params:{
              id:order_id,
              ready:ready,
              total_price:total_price
            }
          })
              break;
          case '待处理':
            console.log('待处理')
              break;
            case '已完成':
              console.log('已完成')
      }
    }
  },
  computed:{
    //处理状态
    status(){
      return (state)=>{
        state = Number(state)
        switch (state){
          case 0:
            return '未付款';
          case 1:
            return '待处理';
          case 2:
            return '已完成';
        }
      }
    },
    //状态颜色
    color(){
      return state=>{
        switch (state){
          case '0':
            return 'red';
          case '1':
            return 'blue';
          case '2':
            return 'green';
        }
      }
    },
    //操作状态
    dispose_status(){
      return (state)=>{
        state = Number(state)
        switch (state){
          case 0:
            return '去付款';
          case 1:
            return '查询订单';
          case 2:
            return '评价';
        }
      }
    }
  },
  created() {
    this.search_order()
  }
}
</script>

<style scoped>
.content{
  width: 100%;
  min-height: 200px;
  padding: 30px 40px 0;
  border-radius: 15px;
  background-color: white;
}
.title{
  font-size: 2em;
}
.order_list{
  padding-bottom: 10px;
}
.order_list>li{
  border-bottom: 1px solid rgba(211,211,211,1);
}
.order_list li{
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}
.li_head{
  background-color: rgba(211,211,211,0.2);
  width: 100%;
  height: 25px;
  font-size: 0.8em;
}
.li_time{
  width: 40%;
  margin-left: 1%;
}
.qq{
  margin-left: 15%;
  padding-left: 20px;
  background: url("./images/qq.png") no-repeat 0 center;
  cursor: pointer;
}
.qq:hover{
  color: #2996ff;
}
.li_head,
.li_content{
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 5px;
}
.li_content{
  flex-direction: column;
  position: relative;
}
.li_content li,
.blurb{
  display: flex;
}
.blurb{
  width: 60%;
  justify-content: space-between;
  align-items: center;
}
.blurb p{
  font-size: 0.9em;
  display: flex;
  font-weight: 700;
  justify-content: center;
  font-family: cursive;
}
.blurb>img{
  height: 100px;
}
.blurb_name,
.li_head p{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.blurb_name{
  width:25%;
  font-family: cursive;
  font-weight: 700;
  font-size: 0.9em;
}
.order_status{
  padding-left: 2%;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9em;
  font-weight: 700;
  position: absolute;
  right: 2%;
  top: 5%;
  height: 90%;
  border-left: 1px dashed rgba(211,211,211,1);
}
.order_status div{
  font-family: cursive;
}
.button{
  border-radius: 10px;
  cursor: pointer;
  border: 1px dashed rgb(211,211,211);
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
</style>