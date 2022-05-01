//订单中心路由处理函数
//导入数据库实例对象
const db = require('../mysql/mysql');

//提交订单路由处理函数
exports.submitOrders = (req,res)=>{
    // console.log(Object.keys(req.body[0]))
    // console.log(Object.values(req.body[0]))
    //定义sql
    // const sql = `INSERT INTO myorders (orderNumber,totalPrice,name,orderAddress,tel,orderKind,orderTime,payKind,userName,shopId,num,price,font,promise,img,discount) VALUES ?`;
    const sql = `insert into myorders set ?`;
    //操作数据库
    db.query(sql,[...req.body],(err,results)=>{
        //判断是否出错
        if(err) return res.rep('服务器繁忙');
        //判断是否成功
        if(results.affectedRows === 0) return res.rep('支付失败');
        //到这就表示成功
        res.rep('操作成功',0);
    })
}

//查询所有订单路由处理函数
exports.getOrders = (req,res)=>{
    //定义sql
    const sql = 'select * from myorders where userName = ?';
    //操作数据库
    db.query(sql,req.user.userName,(err,results)=>{
        //判断是否出错
        if(err) return res.rep('服务器繁忙');
        //将查询到的数据返回给客户端
        res.send({
            code:0,
            msg:'已找到相关结果',
            results
        })
    })
}

//根据id删除订单
exports.deleteOrder = (req,res)=>{
    //定义sql
    const sql = 'delete from myorders where id = ? and userName = ?';
    //操作数据库
    db.query(sql,[req.body.id,req.user.userName],(err,results)=>{
        //失误
        if (err) return res.rep('删除失败');
        //删除失败
        if (results.affectedRows === 0) return res.rep('删除失败');
        //成功返回
        res.rep('删除成功',0);
    })
}