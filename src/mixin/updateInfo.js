//用户信息修改混合

import axios from "axios";
import {Toast} from "vant";

const updateInfo = {
    methods:{
        postAxios(url,data){
            //获取本地存储token
            let token = window.localStorage.getItem('token');
            //发送axios
            axios.post(
                'user/'+url,
                data,
                {
                    headers:{
                        'Authorization':token
                    }
                })
                .then(res=>{
                    //判断是否成功
                    if(!res.data.code) {
                        //根据oldPassword值判断哪些操作需要跳转
                        if(this.oldPassword !== undefined) this.$router.replace('/login');
                        //提示
                        Toast(res.data.msg);
                        //判断是否是token问题导致失败
                    }else if(res.data.code === 2){
                        //提示
                        Toast('登陆过期,请重新登录!');
                        //跳转登录
                        this.$router.replace('/login');
                    }else{
                        //表示操作失败
                        this.isOk = false;
                        //不是失败token问题导致
                        Toast(res.data.msg);
                    }
                }).catch(()=>Toast('服务器繁忙！'))
        }
    }
}

export default updateInfo;