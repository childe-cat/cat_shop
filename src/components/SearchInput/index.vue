<template>
<div class="contant">
  <input type="text" v-model="keyword" placeholder="输入关键字搜索">
  <div class="search" @click="goSearch">搜索</div>
</div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      keyword:''
    }
  },
  methods:{
    goSearch(){
      console.log(goSearch)
    }
  }
}
</script>

<style scoped>
.contant{
  width: 40%;
  margin: 0 30%;
  height: 60px;
  background-color: rgb(246, 247, 248);
  border-radius: 5px;
  display: flex;
  align-items: center;
}
.contant:hover{
  border: 1px solid rgba(246, 247, 248,1);
  background-color: white;
}
input{
  height: 100%;
  width: 80%;
  border: 0;
  background-color: rgba(246, 247, 248,0);
  font-size: 1.2em;
  padding-left: 50px;
  background: url("./images/search.png") no-repeat 10px center;
  background-size: 35px;
}
.search{
  width: 16%;
  height: 60%;
  margin-left: 2%;
  font-weight: 550;
  border-radius: 10px;
  text-align: center;
  line-height: 200%;
  color: white;
  background-color: rgb(5, 174, 236);
  cursor: pointer;
}
</style>