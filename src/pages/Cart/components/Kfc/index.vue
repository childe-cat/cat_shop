<template>
  <div class="content">
    <div class="title">优惠卷</div>
    <ul class="kfc_list">
      <li
          :class="'kfc_'+item.content.lines"
          v-for="item in kfc_list"
          :key="item.id">
        <p>&yen;{{ item.content.lines }}<span style="font-size: 0.3em;margin-left: 5%;font-weight: 500">{{ item.content.name }}</span></p>
        <p>{{item.content.lines}}元优惠卷满{{item.content.term}}元使用</p>
        <p>有效期：{{ get_time(item.create_time) }}——{{ overdue_time(item.create_time,item.content.overdue_time) }}</p>
      </li>
      <li>
        <div class="add" @click="add_kfc">
          +
        </div>
      </li>
    </ul>
    <div
        class="mask"
        v-if="flag">
      <div class="mask_box">
        <div class="mask_box_title">输入兑换码</div>
        <div class="mask_box_content">
          <input type="text">
        </div>
        <div class="mask_box_bottom">
          <div
              class="mask_box_button"
              style="background-color: #d54b4d"
              @click="cancel">
            取消
          </div>
          <div
              class="mask_box_button"
              @click="submit">
            确定
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reqKfc} from "@/api";

export default {
  name: "index",
  data(){
    return{
      kfc_list:[],
      flag:false
    }
  },
  methods:{
    //弹出兑换弹框
    add_kfc(){
      this.flag = true
      console.log(this.flag)
    },
  //  确定兑换
    submit(){
      console.log('submit')
    },
  //  取消兑换
    cancel(){
      this.flag = false
    },
  //  时间戳转换
    timeout(time){
      let date = new Date(time*1);
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = date.getDate() + ' ';
      return Y+M+D;
    }
  },
  computed:{
    get_time(){
      return (time)=>{
        return this.timeout(time)
      }
    },
    overdue_time(){
      return (time,overdue)=>{
       const timer = time*1 + overdue*60*60*24*1000
        return this.timeout(timer)
      }
    }
  },
  created() {
    reqKfc().then(res=>{
      this.kfc_list = res.data.data
    })
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
.kfc_list{
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 2% 0 0 2%;
}
.kfc_list li{
  border: 1px dashed gray;
  border-radius: 10px;
  width: 30%;
  aspect-ratio: 16/8;
  margin:0 0 2% 2%;
  padding-left: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;
}
.kfc_list li p{
  font-size: 0.8em;
  margin-bottom: 5px;
}
.kfc_list li p:nth-child(1){
  font-size: 2em;
  font-weight: 550;
  width: 100%;
}
.kfc_5{
  background-color: #f39b00;
}
.kfc_10{
  background-color: #d24161;
}
.kfc_20{
  background-color: #7eab1e;
}
.kfc_50{
  background-color: #50add3;
}
.kfc_100{
  background-color: #b42606;
}
.kfc_list li:last-child,
.add{
  padding: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 0;
  color: rgba(211,211,211,0.8);
}
.add{
  font-size: 5em;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px rgba(211,211,211,1) dashed;
  display: flex;
  cursor: pointer;
}
.mask{
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mask_box{
  border-radius: 20px;
  background-color: rgb(255,255,255);
  width: 30%;
  height: 25vh;
}
.mask_box_title{
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4em;
}
.mask_box_content{
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mask_box_content input{
  border: 0;
  border-bottom: 1px solid black;

}
.mask_box_bottom{
  width: 100%;
  height: 20%;
  padding: 0 10%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.mask_box_button{
  width: 15%;
  text-align: center;
  font-size: 1.2em;
  border-radius: 10px;
  background-color: dodgerblue;
  color: white;
  cursor: default;
}
</style>