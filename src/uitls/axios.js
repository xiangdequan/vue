import axios from "axios";

//axios全局配置基础路径
axios.defaults.baseURL = "http://10.20.25.15/";
//全局配置请求超时时间，2分钟
// axios.defaults.timeout = 120*1000;
//请求拦截器
axios.interceptors.request.use(
    //成功情况
    config=>{
        //验证token
        config.headers['Authorization'] = window.localStorage.getItem('token');
        return config;
    },
    //失败情况
    error => {
        return Promise.reject(error);
    }
)

export default axios;