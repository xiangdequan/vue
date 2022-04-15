//导入vue
import Vue from 'vue'
//导入app组件
import App from './App.vue'
//导入axios插件
import axios from "axios";
//导入vue-router插件
import vueRouter from "vue-router";
//导入路由配置对象
import router from "./router/router";
//导入vuex配置对象
import store from "./store/store";
//导入less
import less from "less";
//导入less-loader
import lessLoader from "less-loader";

//注册router //注册axios less lessLoader
Vue.use(vueRouter,axios,less,lessLoader);

//设置axios默认基础路径
//10.20.25.15
//192.168.43.83
// axios.defaults.baseURL = "http://192.168.43.83/";
axios.defaults.baseURL = "http://10.20.25.15/";
// axios.defaults.baseURL = "http://10.20.140.50/";

//阻止vue产生生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,store
}).$mount('#app')
