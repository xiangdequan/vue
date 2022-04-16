//前置路由守卫  用于验证用户token
import axios from "axios";
import router from "@/router/router";

function isLogin(to,from,next){
    //判断是否要鉴权
    if(to.meta.isAuth){
        //判断用户有没有登录，没有登录先去登录
        //取出本地存储token
        let token = window.localStorage.getItem("token");
        //判断token是否存在
        if(token !== ''){
            //如果取到了token,判断有没有过期
            axios.get(
                "/user/info",
                {
                    //设置请求头，向服务器验证token
                    headers:{
                        "Authorization":token
                    }
                }
            ).then(res=>{
                //根据返回值判断token是否有效
                if(!res.data.code){
                    //有效就放行
                    next();
                }else{
                    //无效去登录
                    router.push('/login')
                }
            })
        }
    }else{
        //不需要鉴权放行
        next();
    }
}

//导出前置路由守卫
export default isLogin;