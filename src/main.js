import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './libs/global'


import './plugins/element.js'
import 'normalize.css'
import './assets/styles/index.scss'


Vue.prototype.$global = global;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
