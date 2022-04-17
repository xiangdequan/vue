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
router.post("/updatePassword",expressJoi(updatePassword),handle.updatePsw);

//定义修改用户昵称路由 局部中间件验证
router.post('/updateName',handle.updateName);

//定义修改用户所有信息路由  验证
router.post('/updateAll',authUser,handle.updateAll);

//定义注销用户路由
router.post('/deleteUser',authUser,handle.deleteUser);

//导出router
module.exports = router;

//定义验证用户账号密码中间件
function authUser(req,res,next){
    //定义sql  验证密码是否正确
    const sqlOne = 'select * from users where userName = ? and password = ?';
    //验证密码
    db.query(sqlOne,[req.user.userName,req.body.oldPassword],(err,results)=>{
        //是否出错
        if (err) return res.rep('服务器繁忙');
        //判断是否查询到结果
        if(results.length === 0) {
            res.rep('原密码不正确');
        }else{
            //到这步就没问题了，可以进行修改操作
            next();
        }

    })
}