//导入express
const express = require("express");
//导入路由
const router = express.Router();
//导入路由处理函数
const handle = require('../router_handle/shops_handle');

//商品上传api
router.post('/addShops',handle.addShops);

//获取商品信息api
router.get('/getShops',handle.getShops);

module.exports = router;