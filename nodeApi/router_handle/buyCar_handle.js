//购物车相关处理函数
//导入mysql实例对象
const db = require('../mysql/mysql')

//查询购物车中所有商品 根据token中的userName查询
exports.selectShops = (req,res)=>{
    //定义sql
    const sql = 'select * from buycar where userName = ?';
    //操作数据库
    db.query(sql,req.user.userName,(err,results)=>{
        //判断是否失误
        if(err) return res.rep('服务器繁忙');
        //判断是否查到数据
        if(results.length === 0) return res.send({msg:'当前账号购物车为空',results,code:0});
        //到这就代表有数据  将数据返回给客户端
        res.send({
            msg:'已查到相关数据',
            code:0,
            results
        })
    })
}

//删除购物车商品
exports.deleteShop = (req,res)=>{
    //定义sql 传参shopId userName(验证token)
    const sql = 'delete from buycar where shopId = ? and userName = ?';
    //操作数据库
    db.query(sql,[req.body.shopId,req.user.userName],(err,results)=>{
        //判断是否出错
        if(err) return res.rep('服务器繁忙');
        //判断是否删除成功
        if(results.affectedRows === 0) return res.rep("删除失败");
        //到这代表成功
        res.rep("删除成功",0);
    })
}

//清空购物车商品路由处理函数
exports.clearAll = (req,res)=>{
    //定义sql
    const sql = 'delete from buycar where userName=?';
    //操作数据库
    db.query(sql,req.user.userName,(err,results)=>{
        //判断是否出错
        if(err) return res.rep('服务器繁忙');
        //判断是否删除
        if(results.affectedRows === 0) return res.rep('清空失败');
        //到这表示清空成功
        res.rep('已清空购物车',0);
    })
}

//添加、减少购物车商品数量  传参:shopId(商品id)、num(商品数量)、userName
exports.updateNum = (req,res)=>{
    //定义sql
    const sql = 'update buycar set num=? where userName=? and shopId=?';
    //操作数据库
    db.query(sql,[req.body.num,req.user.userName,req.body.shopId],(err,results)=>{
        //判断是否出错
        if(err) return res.rep('服务器繁忙');
        //判断是否修改成功
        if(results.affectedRows === 0) return res.rep('操作失败');
        //到这就成功了
        res.rep('成功',0);
    })
}

//添加商品到购物车
exports.addBuyCar = (req,res)=>{
    //先查询是否加入过购物车，加入过就增加数量
    const sqlOne = 'select * from buycar where shopId = ? and userName = ?';
    console.log(req.body)
    //操作数据库
    db.query(sqlOne,[req.body.shopId,req.user.userName],(err,results)=>{
        //判断是否出错
        if(err) return res.rep('服务器繁忙');
        //判断是否查询到数据 没有查到数据就新增
        if (results.length === 0) return addcar(req,res);
        //已经添加过，就将商品数量加1
        updateNum(results,res);
    })
}

//添加购物车片段处理函数 添加购物车
function addcar(req,res){
    //定义sql
    const sql = 'insert into buycar set ?';
    //操作数据库
    db.query(sql,{userName:req.user.userName,...req.body},(err,results)=>{
        //判断是否出错
        if(err) return res.rep('服务器繁忙');
        //判断是否存入
        if(results.affectedRows === 0) return res.rep('加入购物车失败');
        //到这就代表成功
        res.rep('已加入购物车',0);
    })
}

//修改商品购物车中数量  加
function updateNum(results,res){
    //判断商品数量是否超过最大限制5
    if(results[0].num >= 5) return res.rep('商品添加数量上限');
    //定义sql
    const sql = 'update buycar set num=? where userName=? and shopId=?';
    //操作数据库
    db.query(sql,[results[0].num+1,results[0].userName,results[0].shopId],(err,result)=>{
        //判断是否出错
        if(err) return res.rep('服务器繁忙');
        //判断是否修改成功
        if(result.affectedRows === 0) return res.rep('失败');
        //到这就成功
        res.rep('成功',0);
    })
}