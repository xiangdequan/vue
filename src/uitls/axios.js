import axios from "axios";
//axios配置对象
axios.defaults.baseURL = "http://10.20.25.15/";

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