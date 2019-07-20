import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Test from './components/Test.vue'
// import router from './router'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueLocalStorage from 'vue-localstorage'
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
 
window.toastr = require('toastr')
 
Vue.use(VueToastr2)

Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true
})
Vue.config.productionTip = false

// Vue.use(Vuetify, {
//   iconfont: 'md'
// })

new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount('#app')
