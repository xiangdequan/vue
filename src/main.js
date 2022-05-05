//导入vue
import Vue from 'vue'
//导入app组件
import App from './App.vue'
//导入axios配置对象
import axios from "./uitls/axios";
//导入路由配置对象
import router from "./router/router";
//导入vuex配置对象
import store from "./store/store";
//导入vant配置文件  运行模块内容
import './vant/vant'
//导入less
import less from "less";
//导入less-loader
import lessLoader from "less-loader";

//注册router //注册axios less lessLoader
Vue.use(less,lessLoader);
Vue.prototype.$axios = axios;

//设置axios默认基础路径
//10.20.25.15
//192.168.43.83
// axios.defaults.baseURL = "http://192.168.43.83/";//热点ip
// axios.defaults.baseURL = "http://127.0.0.1/";  //本地ip
// axios.defaults.baseURL = "http://10.20.140.50/";  //教室ip

//阻止vue产生生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,store,
}).$mount('#app')
