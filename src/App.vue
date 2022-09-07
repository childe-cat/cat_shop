<template>
  <div id="app">
    <Header v-if="$route.meta.isShow"></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 1em;
  box-sizing: border-box;
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
}
body{
  overflow-x:hidden;
  background-color: rgb(247, 246, 252);
}
@font-face {
  font-family: "阿里妈妈数黑体 Bold";font-weight: 700;src: url("//at.alicdn.com/wf/webfont/qXB4F5wFmBAq/47i6Sf58bBjMXt162xUj0.woff2") format("woff2"),
url("//at.alicdn.com/wf/webfont/qXB4F5wFmBAq/cTAEvRbxvhTrvnR9-PCpP.woff") format("woff");
  font-display: swap;
}
   ::-webkit-scrollbar {
     width: 5px;
     height: 5px;
   }

::-webkit-scrollbar-track {
  width: 5px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(144,147,153,.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color .3s;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144,147,153,.3);
}

#app{
  width: 100vw;
}
input{outline:none;}
</style>
