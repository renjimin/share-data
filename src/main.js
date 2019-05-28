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
/*
               _oo0oo_
              o8888888o
             88\" . \"88
              (| -_- |)
              0\\ = //0
            ___/`---'\\___
          .' \\\\|     |// '.
        / \\\\|||  :  |||// \\
        / _||||| -:- |||||- \\
      |   | \\\\\\  -  /// |   |
      | \\_|  ''\\---/''  |_/ |
      \\  .-\\__  '-'  ___/-. /
    ___'. .'  /--.--\\  `. .'___
  .\"\" '<  `.___\\_<|>_/___.' >' \"\".
| | :  `- \\`.;`\\ _ /`;.`/ - ` : | |
\\  \\ `_.   \\_ __\\ /__ _/   .-` /  /
===`-.____`.___ \\_____/___.-`___.-'===
                  `=---='"
          佛祖保佑         永无BUG

*/
