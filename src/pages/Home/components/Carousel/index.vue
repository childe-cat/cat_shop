<template>
<div class="app">
  <transition mode="out-in">
    <li v-for="item in $store.state.carousel" :key="item.id" v-if="flag===item.id">
      <img :src="item.image" alt="">
    </li>
  </transition>
</div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      flag:1
    }
  },
  methods:{
    zero(){
      if(this.flag>this.$store.state.carousel.length){
        this.flag =1
      }
    }
  },
  mounted() {
    this.$store.dispatch('all_Carousel')
    setInterval(()=>{
      this.flag+=1
      this.zero()
    },5000)
  }
}
</script>

<style scoped>
.app{
  display: flex;
}
li{
  height:calc(100vh - 70px);
  width: 100%;
}
img{
  width: 100%;
  height: 100%;
}
.v-enter-active{
  animation: Carousel 0.5s linear;
}
.v-leave-active{
  animation: Carousel 0.5s linear reverse;
}
@keyframes Carousel {
  0%{
    opacity: 0.8;
  }
  100%{
    opacity: 1;
  }
}
</style>