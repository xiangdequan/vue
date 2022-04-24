import vueRouter from "vue-router";
//引入前置路由守卫处理函数
import isLogin from "@/router/beforeEach";
//导入一级路由
import firstRoute from "@/router/firstRoute";
//导入视图路由
import viewRoute from "@/router/viewRoute";

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
        //一级路由
        ...firstRoute,
        //视图路由
        ...viewRoute
    ]
})

//全局前置路由守卫  验证token
router.beforeEach(isLogin)

//导出router
export default router;