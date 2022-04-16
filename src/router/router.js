import vueRouter from "vue-router";
//引入前置路由守卫处理函数
import isLogin from "@/router/beforeEach";
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
              //初步展示 重定向
              {
               path:"/",
               redirect:"home"
              },
              //首页路由
              {
                  path:"home",
                  name:"home",
                  component: ()=>import("../pages/home/home")
              },
              //分类页路由
              {
                  path:"kind",
                  name:"kind",
                  component: ()=>import("../pages/kind/kind")
              },
              //购物车路由
              {
                path:"buy",
                name:"buy",
                component: ()=>import("../pages/buy/buy"),
                meta:{
                    isAuth:true
                  }
              },
              //个人中心页
              {
                  path:"mine",
                  name:"mine",
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
        //用户信息管理
        {
            path:'/userInfo/:userName',
            component: ()=> import("../pages/mine/userInfo"),
            meta:{
                isAuth:true
            }
        }
    ]
})

//全局前置路由守卫  验证token
router.beforeEach(isLogin)

//导出router
export default router;