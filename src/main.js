import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuex from 'vuex'
import { store } from './store'
import VueMeta from 'vue-meta'



require('dotenv').config()

Vue.config.productionTip = false

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

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
