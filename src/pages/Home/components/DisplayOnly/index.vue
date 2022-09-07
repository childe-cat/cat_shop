<template>
<div class="app">
<h1>{{ title }}</h1>
  <ul class="shop_class">
    <li v-for="(item,index) in $store.state.classify" :key="index" @mouseenter="flag(item.head)">
      {{item.head}}
    </li>
  </ul>
  <ul class="shop_info">
    <li v-for="item in shop_list" :key="item.id" @click="details(item.id)">
      <img :src="item.goods_image" alt="">
      <h2>{{item.goods_name}}</h2>
      <p>{{item.goods_intro}}</p>
        <h6><slot></slot>￥{{item.goods_price}}</h6>
    </li>
  </ul>
</div>
</template>

<script>

export default {
  name: "index",
  props:{
    title:{
      type:String,
      required:true
    },
    list:{
      type:Array,
      required: true
    },
    isShow:{
      type:Function,
      default:null
    }
  },
  computed:{
    shop_list(){
      this.list.sort((a,b)=>{
        return b.goods_sold - a.goods_sold
      })
      return this.list.slice(0,5)
    }
  },
  methods:{
    flag(a){
      setTimeout(()=>this.isShow(a),100)
    },
    //商品跳转
    details(id){
      this.$router.push({
        name:'details',
        params:{
          id:id
        }
      })
    }
  }
}
</script>

<style scoped>
.app{
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h1{
  font-size: 2em;
}
.shop_class{
  display: flex;
}
.shop_class>li{
  height: 30px;
  width: 100px;
  margin: 20px 0;
  border: 1px solid gray;
  border-left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor:default;
  border-radius: 1px;
}
.shop_class>li:hover{
  border: 2px solid green !important;
}
.shop_class>li:nth-child(1){
  border-left: 1px solid gray;
}
.shop_info{
  /*border-bottom: 1px green solid;*/
  padding: 10px 20px;
  display: flex;
}
.shop_info li{
  width: 200px;
  height: 260px;
  margin: 0 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.shop_info li h2{
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 700;
}
.shop_info li p{
  font-size: 0.8em;
  margin: 5px 0;
  color: gray;
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 700;
}
.shop_info li h6{
  color: green;
  font-size: 1em;
  font-weight: 700;
  font-family: "阿里妈妈数黑体 Bold";
}
.shop_info li img{
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>