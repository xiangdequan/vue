import axios from "axios";
//axios配置对象
export default axios.create({
    baseURL:"http://10.20.25.15/",
    headers:{
        'Authorization': window.localStorage.getItem('token')
    }
})