//导入express
const express = require("express");
//导入用于解析还原jwt字符串为json数据的包
const expressJWT = require("express-jwt");
//导入cors
const cors = require("cors");
//导入用户注册登录router
const userRouter = require("./router/user");
//导入用户信息路由
const userInfo = require("./router/userInfo");
//导入添加/获取商品api
const shops = require("./router/shops");
//导入用户地址相关路由
const userAddress = require('./router/userAddress');
//导入添加购物车相关路由
const buyCar = require('./router/buyCar');
//导入订单中心路由配置
const orders = require('./router/orders');

//导入验证插件
const joi = require("joi");
//实例化express对象
const app = express();
//导入bodyParser模块  用于设置处理请求数据最大长度、空间大小
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit:'10mb'}));  //用于设置处理json格式请求数据大小
app.use(bodyParser.urlencoded({limit:'10mb',extended:true})); //用于设置处理urlencoded格式请求数据大小

//全局注册cors解决跨域问题
app.use(cors());

//启动服务器
app.listen(80,()=>{
    console.log("服务器启动成功");
})

// 全局注册解析用户端传入数据中间件
// app.use(express.urlencoded({extended:false}));
app.use(express.json());
//全局注册express-jwt中间件，用来解析客户端传来的token
//客户端通过在请求头中设置Authorization字段并将其属性值(Bearer + 已保存的token)发送给后端
//expressJWT方法配置项 {secret: 定义的密钥},通过unless方法排除不需要验证token的接口  这里是以/api开头的api
//解析成功后，会自动在需要验证的接口req对象上生成user属性，通过req.user可以获取解析还原后的json数据对象
app.use(expressJWT({secret:"secretKey"}).unless({path:[/^\/api\//]}));

//全局注册中间件,用来优化封装res.send方法
app.use((req,res,next)=>{
    //给res自定义一个方法，封装res.send方法   以后可以通过res.rep调用
    res.rep = (msg,code = 1)=>{
        res.send({code,msg});
    }
    //放行
    next();
})

//注册用户注册登录router  添加/api前缀  功能：登录、注册
app.use("/api",userRouter);
//注册用户信息路由，添加user前缀  功能:获取用户信息、修改密码
app.use("/user",userInfo);
//添加/获取商品
app.use('/api',shops);
//添加、修改、获取收货地址api，需要验证token
app.use('/user',userAddress);
//购物车相关操作路由
app.use('/user',buyCar);
//订单中心路由
app.use('/user',orders);

//全局注册错误级别中间件，用来处理错误保证程序继续运行  同时捕捉token解析失败的错误(如果用户端传来的token不合法或过期会导致解析失败)
app.use((err,req,res,next)=>{
    //通过错误对象的名称来判断是否为token解析失败产生的错误，如果是则返回错误信息
    if(err.name === "UnauthorizedError") return res.send({code:2,msg:"无效的token!"});
    //全局错误级别中间件中，捕获验证失败的错误，并把验证失败的结果响应给客户端：
    if(err instanceof joi.ValidationError) return res.rep("输入不合法");
    //处理其他错误
    console.log(err.message)
    res.rep("服务器错误,请稍后再试");
    next();
})

