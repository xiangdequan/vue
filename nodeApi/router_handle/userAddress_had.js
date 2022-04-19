//用户地址api处理函数
//导入mysql模块对象
const db = require('../mysql/mysql');

//添加收货地址处理函数
exports.addAddress = (req,res)=>{
    //定义sql
    const sql = 'insert into userAddress set ?';
    //插入数据
    db.query(sql,{userName:req.user.userName,...req.body},(err,results)=>{
        //判断是否出错
        if(err) return res.rep('服务器繁忙');
        //判断是否添加成功
        if(results.affectedRows === 0) return res.rep('地址添加失败');
        //到这步就成功了
        res.rep('地址添加成功',0)
    })
}

//获取收货地址处理函数
exports.myAddress = (req,res)=>{
    //定义sql 因为收货地址是通过用户名为标识存储的，为了和其他用户区分，所以查询时以用户名为限制条件
    const sql = 'select * from userAddress where userName = ?';
    //查询
    db.query(sql,req.user.userName,(err,results)=>{
        //判断是否出错
        if(err) res.rep('服务器繁忙');
        //判断是否查询到数据
        if(results.length === 0) return res.rep('您当前无收货地址');
        //到这证明一切正常,将查询到的所有数据返回给客户端
        res.send({code:0,results,msg:'获取成功'});
    })
}

//修改收货地址api处理函数
exports.updateAddress = (req,res)=>{
    //定义sql
    const sql = 'update userAddress set ? where userName = ? and id = ?';
    //定义data
    let name = req.body.name;
    let tel = req.body.tel;
    let areaCode = req.body.areaCode;
    let addressDetail = req.body.addressDetail;
    let postalCode = req.body.postalCode;
    let isDefault = req.body.isDefault;
    let address = req.body.address;
    let id = req.body.id;
    let userName = req.user.userName;

    let data = {name,tel,areaCode,addressDetail,postalCode,isDefault,address};
    //修改
    db.query(sql,[data,userName,id],(err,results)=>{
        //判断是否出错
        if(err) return res.rep('服务器繁忙');
        //判断是否修改成功
        if(results.affectedRows === 0) return res.rep("修改失败");
        //到这表示成功了
        res.rep('修改成功',0)
    })
}

//删除收货地址api处理函数
exports.deleteAddress = (req,res)=>{
    //定义sql
    const sql = 'delete from userAddress where userName = ? and id = ?';
    //执行语句
    db.query(sql,[req.user.userName,req.body.id],(err,results)=>{
        //判断是否出错
        if(err) return res.rep('服务器繁忙');
        //判断是否删除成功
        if(results.affectedRows === 0) return  res.rep('删除失败');
        //成功响应
        res.rep('已删除',0);
    })
}