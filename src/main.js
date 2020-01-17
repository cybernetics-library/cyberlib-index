import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuex from 'vuex'
import { store } from './store'

require('dotenv').config()

Vue.config.productionTip = false

Vue.use({
    install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: 'https://cors-anywhere.herokuapp.com/https://www.librarything.com/api_getdata.php'
    })
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
