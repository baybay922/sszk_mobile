// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mintui from 'mint-ui'
import '../libs/mint/style.less'
import VueWechatTitle from 'vue-wechat-title'
import Chart from 'chart.js'
import VueClipboard from 'vue-clipboard2'
import store from "./store/index"
import storage from "../src/storage"
Vue.use(VueClipboard)
Vue.use(VueWechatTitle)
Vue.use(Mintui)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  
})