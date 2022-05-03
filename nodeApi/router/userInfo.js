//导入express
const express = require("express");
//创建Router对象
const router = express.Router();
//导入用户信息处理函数
const handle = require("../router_handle/userInfo_handle");
//导入执行验证规则中间件
const expressJoi = require("@escook/express-joi");
//导入密码验证规则
const updatePassword = require("../schema/updatePassword");
//导入mysql模块
const db = require("../mysql/mysql");


//定义获取用户信息路由
router.get("/info",handle.info);

//定义修改用户头像路由
router.post('/updateUserImg',handle.updateImg);

//定义更改密码路由  使用局部中间件验证
router.post("/updatePassword",expressJoi(updatePassword),authUser,handle.updatePsw);

//定义修改用户昵称路由 局部中间件验证
router.post('/updateName',handle.updateName);

//定义修改用户所有信息路由  验证
router.post('/updateAll',authUser,handle.updateAll);

//定义注销用户路由
router.post('/deleteUser',authUser,handle.deleteUser);

//验证用户支付密码路由
router.post('/checkPayword',authUser,handle.checkPayword);

//修改用户支付密码路由
router.post('/updatePayword',expressJoi(updatePassword),authUser,handle.updatePsw);

//导出router
module.exports = router;

//定义验证用户账号密码中间件 payword newPayword
function authUser(req,res,next){
    let type = 'password';//用于储存当前操作类型，默认为修改登录密码
    let data = []; //储存上传数据库的数据
    if(req.body.payword){ //根据操作类型给data赋相应值
        type = 'payword';//当修改支付密码时，给type赋值payword
        data = [req.user.userName,req.body.payword];
    }else{
        data = [req.user.userName,req.body.oldPassword];
    }
    //定义sql  验证密码是否正确
    const sql = `select * from users where userName = ? and ${type}= ?`;
    //验证密码
    db.query(sql,data,(err,results)=>{
        //是否出错
        if (err) return res.rep('服务器繁忙');
        //判断是否查询到结果
        if(results.length === 0) {
            //根据不同情况返回提示语句
            if (type === 'payword') return res.rep('支付密码错误');
            res.rep('原密码不正确');
        }else{
            //到这步就没问题了，可以进行修改操作
            res.type = type;
            next();
        }

    })
}