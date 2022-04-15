//导入mysql配置文件
const db = require("../mysql/mysql");

//info根据用户带来的token信息获取数据库中信息
exports.info = (req, res)=>{
    //定义sql语句
    const sql = 'select * from users where userName=?';
    //查询信息   通过解析成功后生成的user属性中的数据查询
    db.query(sql,req.user.userName,(err,results)=>{
        //判断是否出错
        if(err) return res.rep("请稍后再试");
        //判断是否找到数据
        if(results.length === 0) return res.rep("未找到相关数据");
        //找到后响应给客户端
        res.rep(results,0);
    })
}

//更改密码路由处理函数
exports.updatePsw = (req,res)=>{
    //定义sql语句查询该用户密码  通过用户保存的token查询,通过添加限制条件判断密码是否正确
    const sqlOne = "select * from users where id =? and password=?";
    //查询
    db.query(sqlOne,[req.user.id,req.body.oldPassword],(err,results)=>{
        //判断是否出错
        if(err) return res.rep("出错了，请稍后重试");
        //判断是否查询到该条数据
        if(results.length === 0) return res.rep("修改失败,原密码输入不正确！");
        //到这步了用户是存在的,接下来进行修改密码部分
        //定义sql语句用来修改密码
        const sqlTwo = "update users set password=? where id=?";
        //修改密码
        db.query(sqlTwo,[req.body.newPassword,req.user.id],(err,results)=>{
            //判断是否出错
            if(err) return res.rep("修改密码失败,请稍后重试");
            //判断是否修改成功
            if(results.affectedRows === 0) return res.rep("修改密码失败!");
            //提示修改成功
            res.rep("修改密码成功!",1)
        })
    })
}