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

//定义获取用户信息路由
router.get("/info",handle.info);

//定义修改用户头像路由
router.post('/updataImg',handle.updateImg);

//定义更改密码路由  使用局部中间件验证
router.post("/updatePsw",expressJoi(updatePassword),handle.updatePsw);

//导出router
module.exports = router;