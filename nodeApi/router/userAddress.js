//用户收货地址api
//导入express
const express = require('express');
//创建路由实例
const router = express.Router();
//导入路由处理函数
const handle = require('../router_handle/userAddress_had');
const db = require("../mysql/mysql");

//用户添加收货地址api
router.post('/addAddress',changeDefault,handle.addAddress);

//用户获取收货地址api
router.get('/myAddress',handle.myAddress);

//用户修改地址信息api
router.post('/updateAddress',changeDefault,handle.updateAddress);

//用户删除收货地址
router.post('/deleteAddress',handle.deleteAddress);

function changeDefault(req,res,next){
    console.log(req.body.isDefault)
    //判断是否需要修改，isDefault为true就需要修改
    if(req.body.isDefault){
            //定义sql,先全部变成不默认选中
            const sqlOne = 'update userAddress set isDefault=0 where userName = ?';
            //修改
            db.query(sqlOne,req.user.userName,(err,results)=>{
                //判断是否出错
                if(err) return res.rep('服务器繁忙');
                //判断是否修改成功
                if(results.affectedRows === 0) return  res.rep("修改默认地址失败");
                //到这步表示已成功
                next();
            })
        }else{
        next();
    }
}

//导出router
module.exports = router;