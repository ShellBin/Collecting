import Vue from 'vue'
import App from './App'
import axios from 'axios'

Vue.prototype.axios = axios;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})