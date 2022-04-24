//导入express
const express = require('express');
//创建router实例
const router = express.Router();
//导入处理函数
const handle = require('../router_handle/buyCar_handle')

//获取所有购物车商品
router.get('/selectShops',handle.selectShops);

//修改num
router.post('/updateNum',handle.updateNum);

//添加购物车路由
router.post('/addBuyCar',handle.addBuyCar);

//删除购物车商品路由
router.post('/deleteShop',handle.deleteShop);

//清空购物车商品路由
router.delete('/clearAll',handle.clearAll)

module.exports = router