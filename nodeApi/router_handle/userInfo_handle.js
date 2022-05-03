//导入mysql配置文件
const db = require("../mysql/mysql");

//info根据用户带来的token信息获取数据库中信息
exports.info = (req, res)=>{
    //定义sql语句
    const sql = 'select userName,userImg,info from users where userName=?';
    //查询信息   通过解析成功后生成的user属性中的数据查询
    db.query(sql,req.user.userName,(err,results)=>{
        //判断是否出错
        if(err) return res.rep("请稍后再试");
        //判断是否找到数据
        if(results.length === 0) return res.rep("未找到相关数据");
        //找到后响应给客户端 将用户token内保存的值
        res.rep(results[0],0);
    })
}

//更改用户头像api
exports.updateImg = (req,res)=>{
    //定义sql语句  通过token获取
    const sql = 'UPDATE  users  SET  userImg=?  WHERE  userName = ?';
    //发送验证
    db.query(sql,[req.body.userImg,req.user.userName],(err,results)=>{
        //判断是否出错
        if(err) return res.rep('服务器错误！请稍后重试');
        //判断是否修改成功
        if(results.affectedRows === 0) return res.rep('头像修改失败!请稍后重试');
        //到这步就表示修改成功
        res.rep('头像修改成功',0);
    })
}

//更改用户昵称api
exports.updateName = (req,res)=>{
    //定义sql
    const sql = 'update users set info=? where userName=?';
    //发送请求
    db.query(sql,[req.body.info,req.user.userName],(err,results)=>{
        //判断是否出错
        if(err) return res.rep('服务器繁忙!')
        //判断是否已修改
        if(results.affectedRows === 0) return res.rep('昵称修改失败!');
        //到这步已成功
        res.rep('昵称修改成功!',0);
    })
}

//更改支付密码、账户密码路由处理函数
exports.updatePsw = (req,res)=>{
    let type = 'password';//用于储存当前操作类型，默认为修改登录密码
    let data = []; //储存上传数据库的数据
    //根据操作类型给data赋相应值
    if(res.type === 'payword'){
        type = 'payword';
        data = [req.body.newPayword,req.user.userName];
    }else{
        data = [req.body.newPassword,req.user.userName];
    }
    //定义sql语句用来修改密码
    const sqlTwo = `update users set ${type}=? where userName=?`;
    //修改密码
    db.query(sqlTwo,data,(err,results)=>{
        //判断是否出错
        if(err) return res.rep("修改密码失败,请稍后重试");
        //判断是否修改成功
        if(results.affectedRows === 0) return res.rep("修改密码失败!");
        //提示修改成功
        res.rep("修改密码成功!",0)
    })
}

//修改用户所有信息api  需要通过token验证是否过期，用户旧密码是否正确
exports.updateAll = (req,res)=>{
        //定义sql
        const sql = 'update users set password=?,info=?,userImg=? where userName=?';
        //修改密码、头像、昵称
        db.query(sql,[req.body.newPassword,req.body.info,req.body.userImg,req.user.userName],(err,results)=>{
            //判断是否出错
            if(err) return res.rep('服务器繁忙');
            //判断是否修改
            if(results.affectedRows === 0) return res.rep('修改失败!');
            //到这已经修改成功
            res.rep('修改成功',0);
        })
    // })
}

//验证支付密码处理函数
exports.checkPayword = (req,res)=>{
    //前面中间件已经验证过了，到这就表示成功，现在只需要返回数据
    res.rep('支付密码正确',0);
}

//注销用户api
exports.deleteUser = (req,res)=>{
    //定义sql
    const sql = 'delete from users where userName=?';
    //删除
    db.query(sql,req.user.userName,(err,results)=>{
        //判断是否出错
        if(err) return res.rep('服务器繁忙,注销失败!')
        //判断是否注销
        if(results.affectedRows === 0) return res.rep("注销失败");
        //到这证明已成功
        res.rep('注销成功!',0);
    })
}