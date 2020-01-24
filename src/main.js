import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuex from 'vuex'
import { store } from './store'
import VueMeta from 'vue-meta'

import VueGoogleApi from 'vue-google-api'

const config = {
  apiKey: process.env.VUE_APP_GOOGLEAPI_KEY,
  clientId: process.env.VUE_APP_GOOGLEAPI_ID,
  scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  sheetId: '1vt1SlAfqV5cvWFVBFslCiNl5xyocLi9U31NuafCLw6g'
}
Vue.use(VueGoogleApi, config)

require('dotenv').config()

Vue.config.productionTip = false

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

// Vue.use({
//     install (Vue) {
//     Vue.prototype.$api = axios.create({
//       baseURL: 'https://cors-anywhere.herokuapp.com/https://www.librarything.com/api_getdata.php'
//     })
//   }
// })

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
