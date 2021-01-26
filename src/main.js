import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'

Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.$cookies.config('30d')

// var express = require('express')
//   , cors = require('cors')
//   , app = express()

// app.use(cors({
//     origin: "http://localhost:8081",
//     credentials: true
// }))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
