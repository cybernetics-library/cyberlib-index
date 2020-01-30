import Vue from 'vue'
import App from './App.vue'
import { store } from './store'

//meta
import VueMeta from 'vue-meta'
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

//google api
import VueGoogleApi from 'vue-google-api'
const config = {
  apiKey: process.env.VUE_APP_GOOGLEAPI_KEY,
  clientId: process.env.VUE_APP_GOOGLEAPI_ID,
  scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  sheetId: '1vt1SlAfqV5cvWFVBFslCiNl5xyocLi9U31NuafCLw6g'
}
Vue.use(VueGoogleApi, config)

//router
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import BookPage from './pages/book-page.vue';
import HomePage from './pages/home-page.vue';
import ErrorPage from './pages/error-page.vue';

const routes = [
  {
    path: '/:id',
    component: BookPage,
  },{
    path: '',
    component: HomePage,
  },{
    path: '*',
    component: ErrorPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

Vue.config.productionTip = false

new Vue({
  store,
  router: router,
  render: h => h(App),
}).$mount('#app')
