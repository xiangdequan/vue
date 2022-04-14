<template>
<div id="login">
    <van-nav-bar
        :title="show ? '登录' : '注册'"
        left-text="返回"
        left-arrow
        @click-left="backHome"
    />
  <div class="logo"></div>
  <van-form>
    <van-field
        v-model="userName"
        name="userName"
        label="用户名"
        placeholder="用户名"
    />
    <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
    />
    <div class="submit" v-show="show">
      <van-button round block type="info" @click="loginORregister">登录</van-button>
      <p @click="showButton">没有账号？去注册</p>
    </div>
    <div class="submit" v-show="!show">
      <van-button round block type="info" @click="loginORregister">注册</van-button>
      <p @click="showButton">已有账号？去登陆</p>
    </div>
  </van-form>
</div>
</template>

<script>
//导入vant组件
import { Form,Field,Button,Toast,Icon,NavBar } from 'vant';
import axios from "axios";

export default {
  name: "login",
  components:{
    [Form.name]: Form,
    [Field.name]:Field,
    [Button.name]:Button,
    [Toast.name]:Toast,
    [Icon.name]:Icon,
    [NavBar.name]:NavBar
  },
  data() {
    return {
      userName: '', //用户名
      password: '', //密码
      show: true,  //控制登录/注册
    };
  },
  methods: {
    //p标签点击事件处理函数，每次点击取反show值，从而控制页面登录与注册交替显示
    showButton(){
      //清空输入框值
      this.userName = '';
      this.password = '';
      this.show = !this.show; //show值取反
    },
    //登录请求函数
    loginORregister(e) {
      let userName = this.userName;
      let password = this.password;
      //储存点击按钮的文本
      let text = e.target.innerText;
      //定义url存地址
      let url = '';
      //定义提示语前部分
      let tip = '';
      //当收集的数据为空时，终止函数运行
      if (userName === '' || userName.length < 5 || userName.length > 12) return Toast("用户名长度6~12位");
      //验证
      if (password === '' || password.length < 5 || password.length > 12) return Toast("密码长度6~12位");
      //根据点击的按钮实现相关功能
      if(text === "登录"){
        tip = "登录";
        url = 'api/login';
      }else{
        tip = "注册";
        url = 'api/register'
      }
      //发送请求验证登录
      axios.post(url,{userName,password}).then(res=>{
        //根据返回的数据判断是否登录成功
        if(!res.data.code){
          //当登录时，成功后储存token
          if(text === "登录"){
            //储存返回token
            window.localStorage.setItem("token",res.data.token);
          }
          //提示登录成功 组件库自带方法
          Toast.success(tip+'成功');
          //跳转页面
          this.$router.replace("/");
        }else{
          Toast.fail(res.data.msg);
        }
      }).catch(()=>{
        Toast.fail("请稍后重试")
      })
    },
    //点击跳转首页
    backHome(){
      //跳转
      this.$router.replace("/view");
    }
  },
}
</script>

<style lang="less" scoped>
#login{
  height: 100%;
  //top导航栏样式
  .top{
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  //logo样式
  .logo{
    width: 289.5px;
    height: 211px;
    margin: 16% auto 0;
    background: url("../../assets/sg1.png");
    background-size: 100%;
  }
  //登录表单样式
  .van-form{
    width: 90%;
    margin: 0 5%;
    position: relative;
    left: 0;
    top: 8%;
    //表单提交按钮div样式
    .submit{
      margin-top: 16px;
      //提交div内p标签样式
      p{
        height: 12px;
        font-size: 12px;
        float: right;
        margin-right: 10px;
      }
    }
  }
}
</style>