import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueLocalStorage from 'vue-localstorage'
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'

export const STORAGE_TODO = 'todo-storage';
export const STORAGE_DATE = 'date-storage';
export const STORAGE_DONE = 'done-storage';
export const STORAGE_INDEX = 'index-storage';
export const eventBus = new Vue();

window.toastr = require('toastr')
Vue.use(VueToastr2)
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true
})
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
