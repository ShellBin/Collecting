import Vue from 'vue'
import App from './App'
import axios from 'axios'

const server = 'http://localhost:8089/api/v1/'

Vue.prototype.axios = axios;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
