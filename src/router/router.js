import vueRouter from "vue-router";
import axios from "axios";

//导出router对象
const router = new vueRouter({
    //mode配置项表示使用哪种方案 history或hash
    mode:"history",
    //路由配置
    routes:[
        {
            path:"/",
            redirect:"/view"
        },
        //view视图路由
        {
          path:"/view",
          component: ()=>import("../pages/view"),
          //二级路由
          children:[
              //首页路由
              {
                  path:"/home",
                  component: ()=>import("../pages/home/home")
              },
              //分类页路由
              {
                  path:"/kind",
                  component: ()=>import("../pages/kind/kind")
              },
              //购物车路由
              {
                path:"/buy",
                component: ()=>import("../pages/buy/buy"),
                meta:{
                    isAuth:true
                  }
              },
              //个人中心页
              {
                  path:"/mine",
                  component: ()=>import("../pages/mine/mine"),
                  meta:{
                      isAuth:true
                  }
              }
          ]
        },
        //登录页路由
        {
            path:"/login",
            component: ()=>import("../pages/login/login") //路由懒加载
        },
        //搜索页路由
        {
            path:"/search",
            component: ()=>import("../pages/search/searchShop")
        },
        //首页路由
        {
            path:"/home",
            component: ()=>import("../pages/home/home")
        },
    ]
})

//全局前置路由守卫  验证token
router.beforeEach((to,from,next)=>{
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
                        router.replace('/login')
                    }
                })
        }
    }else{
        //不需要鉴权放行
        next();
    }
})

//导出router
export default router;