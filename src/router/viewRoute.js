export default [
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
                path:"buyCar",
                name:"buyCar",
                component: ()=>import("../pages/buy/buyCar"),
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
]