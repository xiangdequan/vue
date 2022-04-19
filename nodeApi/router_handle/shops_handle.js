//导入数据库配置对象
const db = require('../mysql/mysql');


//上传商品处理函数
exports.addShops = (req,res)=>{
    //sql语句
    const sql = 'insert into shops set?';
    //发送  储存商品图片、描述信息、价格、分类
    db.query(sql,req.body,(err,results)=>{
        //判断是否出错
        if (err) return res.rep('出错了');
        //判断影响的数据行数
        if(results.affectedRows !== 1)  return res.rep('失败了');
        //成功了
        res.rep('成功');
        console.log('成功添加一条数据')
    })
}

//获取商品信息
exports.getShops = (req,res)=>{
    //sql
    const sql = 'select*from shops';
    //发送
    db.query(sql,(err,results)=>{
        //判断是否出错
        if(err) return res.rep("获取出错");
        //给客户端返回数据  商品图片、描述信息、价格、分类
        res.send({
            code:'0',
            results,
            msg:'成功'
        })
    })
}

//获取点击项商品信息
exports.getShopInfo = (req,res)=>{
    //定义sql
    const sql = 'select * from shops where id = ?';
    //查询数据
    db.query(sql,req.body.id,(err,results)=>{
        //判断是否出错
        if(err) return res.rep('获取商品信息失败');
        //判断是否找到商品
        if(results.length === 0) return res.rep('未找到相关商品');
        //到这步就成功了 返回数据给客户端
        res.send({code:0,results});
    })
}