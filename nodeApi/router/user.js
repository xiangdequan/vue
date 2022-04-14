/*
 * @Author: Peng
 * @Date: 2022-04-09 14:03:04
 * @LastEditors: Peng
 * @LastEditTime: 2022-04-12 23:16:18
 * @Description: file content
 * @FilePath: \nodeApi\router\user.js
 */
//导入express
const express = require("express");
//创建Router对象
const router = express.Router();
//导入路由处理函数
const handle = require("../router_handle/user_handle");
//1.导入导入验证表单数据的中间件
const expressJoi = require("@escook/express-joi");
// 2. 导入需要的验证规则对象
const userRoule = require("../schema/userRules");
// 3. 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 3.1 数据验证通过后，会把这次请求流转给后面的路由处理函数
// 3.2 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行

//注册api   使用expressJoi中间件验证用户名和密码是否合法
router.post("/register",expressJoi(userRoule),handle.register);

//登录api
router.post("/login",handle.login);

//导出router
module.exports = router;