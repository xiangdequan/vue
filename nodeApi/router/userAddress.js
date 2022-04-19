//用户收货地址api
//导入express
const express = require('express');
//创建路由实例
const router = express.Router();
//导入路由处理函数
const handle = require('../router_handle/userAddress_had');
//导入数据库配置对象
const db = require("../mysql/mysql");

//用户添加收货地址api
router.post('/addAddress',updateDefault,handle.addAddress);

//用户获取收货地址api
router.get('/myAddress',handle.myAddress);

//用户切换默认地址api
// router.post('/updateDefault',handle.updateDefault);

//用户修改地址信息api
router.post('/updateAddress',updateDefault,handle.updateAddress);

//用户删除收货地址
router.post('/deleteAddress',handle.deleteAddress);

//修改
//修改默认地址
function updateDefault(req,res,next){
    console.log(req.body.isDefault)
    //判断是否有设为默认值，没有打算设置默认值不执行以下代码
    if(req.body.isDefault === true){
        //定义sql,先全部变成不默认选中
        const sqlOne = 'update userAddress set isDefault=false where userName = ?';
        //修改
        db.query(sqlOne,req.user.userName,(err,results)=>{
            //判断是否出错
            if(err) res.rep('服务器繁忙');
            //判断是否修改成功
            if(results.affectedRows === 0) res.rep("修改默认地址失败");
            //到这步表示已成功
        })
    }
    //放行
    next();
}


//导出router
module.exports = router;