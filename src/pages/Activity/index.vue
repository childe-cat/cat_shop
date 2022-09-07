<template>
<div class="app">
  <h1 class="title">本周没有新活动!</h1>
  <h1 class="pd">——cat_shopping</h1>
</div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
.app{
  min-height: calc(100vh - 346.2px);
  padding-top: 5%;
  background: url("./images/bg2.jpg") no-repeat center fixed;
  background-size: cover;
}
.title{
  font-family: "阿里妈妈数黑体 Bold";
  font-size: 1.5em;
  text-align: center;
  color: rgb(81,81,81);
}
.pd{
  font-size: 1.5em;
  font-weight: 500;
  margin-top: 4em;
  text-align: center;
  padding-left: 40%;
}
</style>