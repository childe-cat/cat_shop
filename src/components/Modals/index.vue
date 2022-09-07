<template>
<div class="app" v-if="flag">
<div class="title">
  <h4>{{ title }}:</h4>
</div>
  <div class="container">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: "index",
  props: {
    title:{
      type:String
    },
    none:{
      type:Boolean
    }
},
  data(){
    return {
      flag:false
    }
  },
  watch:{
    none(){
      this.flag = true
    },
    flag(newVal,oldVal){
      if(oldVal === false) return setTimeout(()=> this.flag = false,3000)
    }
  },
  created() {
    this.flag = this.none
  },
}
</script>

<style scoped>
.app{
  z-index: 999;
  font-size: 1em;
  color: rgba(0,0,0,0.7);
  position: absolute;
  top: 150px;
  left: calc(50% - 150px);
  width: 300px;
  padding:5px 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255,0.5);
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.6);
}
.container{
  margin: 10px 0;
  text-indent: 2em;
}
</style>