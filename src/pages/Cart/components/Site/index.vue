<template>
  <div class="content">
    <div class="title">我的地址</div>
    <p>提示：目前仅支持在结账过程中编辑和新增地址。</p>
    <div class="box">
      <p style="font-size: 1.2em">暂无收货地址</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "index"
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
  margin-bottom: 10px;
}
.box{
  width: 100%;
  height: 250px;
  display: flex;
  margin: 20px 0 0;
  background: url("./images/site.png") no-repeat center 20%;
  background-size: 30%;
  padding-top: 20%;
  display: flex;
  justify-content: center;
}
p{
  color: rgba(151,151,151,1);
}
</style>