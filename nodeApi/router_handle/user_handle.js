//路由处理函数
//导入数据库配置文件 以及实例对象
const db = require("../mysql/mysql");
//导入用于生成jwt字符串的包
const jwt = require("jsonwebtoken");
//定义jwt字符串加密/解密的密钥
//当生成 JWT 字符串的时候，需要使用 secret 密钥对用户的信息进行加密，最终得到加密好的 JWT 字符串
//当把 JWT 字符串解析还原成 JSON 对象的时候，需要使用 secret 密钥进行解密
//服务器可以通过 express-jwt 这个中间件，自动将客户端发送过来的 Token 解析还原成 JSON 对象：
const secretKey = "secretKey";


//register注册处理函数
exports.register = (req,res)=>{
    //查询数据库是否存在同用户  sql语句
    const sqlOne = 'select * from users where userName=?';
    //查询
    db.query(sqlOne,req.body.userName,(err,results)=>{
        //判断是否失败 失败后返回失败信息
        if(err) return res.rep("注册失败，请稍后重试");
        //判断是否存在该用户
        if(results.length > 0) return res.rep("注册失败,该账号已存在！");
        //如果不存在则注册
        //sql语句
        const sqlTwo = 'insert into users set ?';
        //插入数据  简写形式直接传入对象
        db.query(sqlTwo,req.body,(err,results)=>{
            //判断是否失败  响应失败提示
            if(err) return res.rep("注册失败，请稍后重试")
            //判断数据是否插入成功  利用results上的属性affectedRows  插入语句时results为一个对象有affectedRows属性 查询时为一个数组
            if(results.affectedRows !== 1) return res.rep("注册失败，请稍后重试");
            //以上都没问题，说明注册成功，响应数据给服务器
            res.send({
                code:0,
                msg:"注册成功",
                //将token返回给客户端
                token: "Bearer " + jwt.sign({userName:req.body.userName,name:req.body.info},secretKey,{expiresIn:"12h"})
            });
        })
    })
}

//login登录处理函数
exports.login = (req,res)=>{
    //查询sql语句
    const sql = 'select * from users where userName=? and password=?';
    //向数据库查询
    db.query(sql,[req.body.userName,req.body.password],(err,results)=>{
        //失败响应信息
        if(err) return res.rep("登陆失败，请稍后重试！");
        //查询不到数据响应信息
        if(results.length === 0) return res.rep("用户名或密码错误");
        //登录成功后响应数据，并将带有用户名、昵称的token响应给客户端
        res.send({
            code:0,
            msg:"登陆成功！",
            //通过jwt的sign方法生成token返回客户端  配置项: 第一个是需要加密的用户数据  第二个是jwt密钥  第三个是token的有效期（失效后解析不了）
            //为方便前端处理,加上Bearer字符前缀(前端传给后端token时需要加Bearer前缀)
            token: "Bearer " + jwt.sign({userName:results[0].userName,name:results[0].id},secretKey,{expiresIn:"1h"})
        });
    })
}