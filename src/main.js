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

//阻止vue产生生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,store,
}).$mount('#app')
