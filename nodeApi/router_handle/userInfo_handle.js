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

//更改密码路由处理函数
exports.updatePsw = (req,res)=>{
    //定义sql语句查询该用户密码  通过用户保存的token查询,通过添加限制条件判断密码是否正确
    const sqlOne = "select * from users where userName =? and password=?";
    //查询
    db.query(sqlOne,[req.user.userName,req.body.oldPassword],(err,results)=>{
        //判断是否出错
        if(err) return res.rep("出错了，请稍后重试");
        //判断是否查询到该条数据
        if(results.length === 0) return res.rep("修改失败,原密码输入不正确！");
        //到这步了用户是存在的,接下来进行修改密码部分
        //定义sql语句用来修改密码
        const sqlTwo = "update users set password=? where userName=?";
        //修改密码
        db.query(sqlTwo,[req.body.newPassword,req.user.userName],(err,results)=>{
            //判断是否出错
            if(err) return res.rep("修改密码失败,请稍后重试");
            //判断是否修改成功
            if(results.affectedRows === 0) return res.rep("修改密码失败!");
            //提示修改成功
            res.rep("修改密码成功!",0)
        })
    })
}

//修改用户所有信息api  需要通过token验证是否过期，用户旧密码是否正确
exports.updateAll = (req,res)=>{
    /*//定义sql  验证密码是否正确
    const sqlOne = 'select * from users where userName = ? and password = ?';
    //验证密码
    db.query(sqlOne,[req.user.userName,req.body.oldPassword],(err,results)=>{
        //是否出错
        if (err) return res.rep('服务器繁忙');
        //判断是否查询到结果
        if(results.length === 0) return res.rep('原密码错误,修改失败!');
        //到这步就没问题了，可以进行修改操作*/
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