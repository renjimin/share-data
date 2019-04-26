// main.js
import Vue from "vue"; // 引入 Vue 是因为要用到 Vue.extend() 这个方法
import Main from "./main.vue"; // 引入刚才的 toast 组件

let ToastConstructor = Vue.extend(Main);
let instance;

const Toast = function() {
  instance = new ToastConstructor().$mount(); // 渲染组件
  document.body.appendChild(instance.$el); // 挂载到 body 下
};

export default Toast;
