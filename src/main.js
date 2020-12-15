import Vue from 'vue'
import App from './App'
import axios from 'axios'

// 设置后端接口的地址
Vue.prototype.backEndHost = '/api/v1/'

Vue.prototype.axios = axios;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
