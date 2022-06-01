//订单中心相关路由
//导入express模块
const express = require('express');
//创建router实例
const router = express.Router();
//导入订单中心处理函数
const handle = require('../router_handle/orders_handle');

//提交订单路由
router.post('/submitOrders',handle.submitOrders);

//查询所有订单
router.get('/getOrders',handle.getOrders);

//删除订单
router.post('/deleteOrder',handle.deleteOrder);

//更改订单类型
// rou

//导出router
module.exports = router;
