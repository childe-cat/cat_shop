<template>
  <transition name="kind">
    <div class="select" v-if="show" @mouseleave="Show">
      <li v-for="item in classify_list" :key="item.id">
        <ul>
          <li v-for="items in item.splice(1)" @click="goShop(items)">
            {{items}}
          </li>
        </ul>
      </li>
    </div>
  </transition>
</template>

<script>
export default {
  name: "index",
  props:{
    flag:{
      type:Boolean
    }
  },
  data(){
    return{
      arr:[],
      show:false
    }
  },
  methods:{
    //离开隐藏
    Show(){
      this.show=!this.show
    },
    //定义一个方法，将对象数组转化为二维数组
    targetDate(arr){
      //声明一个新的数组
      let newArr =[];
      //循环遍历数组
      arr.forEach(item => {
        //用obj.value拿到数组里对象的value push到新的数组里
        newArr.push(Object.values(item))
      });
      return newArr
    },
    goShop(item){
      if(['电子类','服装类','日用类','家具类'].includes(item)) return false
      this.$router.push({
        name:'category',
        params:{
          keyword:item
        }
      })
      this.Show()
    }
  },
  computed:{
    classify_list(){
      return this.targetDate(this.$store.state.classify)
    }
  },
  watch:{
    //监听flag控制show
    flag(){
      this.show = !this.show
        //获取商品分类
        this.$store.dispatch('all_Classify')
    }
  },
  created() {

  }
}
</script>

<style scoped>
.select{
  position: absolute;
  top: 70px;
  width: 100vw;
  background-color: rgba(255,255,255,1);
  border-top:1px dashed deepskyblue;
  display: flex;
  padding: 10px 300px;
  flex-direction: column;
  color: rgba(210,180,140,1);
  z-index: 1;
  min-height: 193px;
}
.select>li{
  margin: 10px 0;
}
ul{
  display: flex;
  align-items: center;
}
ul>li{
  margin-right: 40px;
  width: 100px;
  text-align: center;
}
ul li:nth-child(1){
  color: green;
  font-size: 1.1em;
  margin-right: 100px;
}
/*动画效果*/
.kind-enter-active{
  animation: kind 0.6s linear;
}
.kind-leave-active{
  animation: kind 0.2s linear reverse;
}
@keyframes kind {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;

  }
}
</style>