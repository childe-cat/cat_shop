import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import axios from "axios";
import store from "@/store";
import utils from "./utils/index"
import AsyncComputed from "vue-async-computed";

Vue.use(AsyncComputed)

Vue.prototype.utils = utils
Vue.config.productionTip = false

Vue.prototype.axios = axios

new Vue({
  render: h => h(App),
  router,
  store,
//  挂载全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
