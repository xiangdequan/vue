<!--用户信息修改、用户注销-->
<template>
<div id="userIfo">
  <van-nav-bar
      title="用户信息管理"
      left-text="返回"
      right-text="注销登录"
      left-arrow
      @click-left="goBack"
      @click-right="loginOut"
  />
  <van-cell-group style="margin: 6% 0">
    <van-cell icon="user-o" is-link title="用户头像修改" size="large" @click="isShow('用户头像修改')" />
    <van-cell icon="edit" is-link title="用户昵称修改" size="large" @click="isShow('用户昵称修改')" />
    <van-cell icon="closed-eye" is-link title="用户密码修改" size="large" @click="isShow('用户密码修改')" />
    <van-cell icon="records" is-link title="修改所有信息" size="large" @click="isShow('修改所有信息')" />
    <van-cell icon="close" is-link title="注销账号" size="large" @click="isShow('注销账号')" />
  </van-cell-group>
  <van-action-sheet v-model="show" :title="title">
    <updateUserImg v-show="title === '用户头像修改'"/>
    <updatePassword v-show="title === '用户密码修改'"/>
    <updateName v-show="title === '用户昵称修改'"/>
    <updateAll v-show="title === '修改所有信息'"/>
    <deleteUser v-show="title === '注销账号'"/>
  </van-action-sheet>
</div>
</template>

<script>
//引入vant
import {NavBar,Toast,Dialog,Cell,CellGroup,ActionSheet,Form,Field,Button} from 'vant'
import updatePassword from "@/pages/mine/updatePassword";
import updateUserImg from "@/pages/mine/updateUserImg";
import updateName from "@/pages/mine/updateName";
import updateAll from "@/pages/mine/updateAll";
import deleteUser from "@/pages/mine/deleteUser";

export default {
  name: "userInfo",
  components:{
    updatePassword,
    updateUserImg,
    updateName,
    updateAll,
    deleteUser,
    [NavBar.name]:NavBar,
    [Toast.name]:Toast,
    [Cell.name]:Cell,
    [Form.name]:Form,
    [Field.name]:Field,
    [Button.name]:Button,
    [CellGroup.name]:CellGroup,
    [ActionSheet.name]:ActionSheet
  },
  data(){
    return {
      activeName:"0",//点击的标签索引
      show:false,  //是否显示
      title: '' , //用户储存操作类型
    }
  },
  methods:{
    //返回
    goBack(){
      //跳转上一个页面  用户信息
      this.$router.replace({name:'mine'});
    },
    //注销登录
    loginOut(){
      //弹窗提示
      Dialog.confirm({
        title: '注销登录',
        message: '这将导致您将失去购物功能,重新登录后恢复',
      })
          .then(() => {
            // on confirm
            //清除本地储存的token
            window.localStorage.removeItem('token');
            //提示
            Toast('注销登录成功');
            //跳转登录页
            this.$router.replace('/login');
          }).catch(()=>{})
    },
    //是否显示  传参操作类型
    isShow(title){
      //根据操作类型  定义标题内容
      this.title = title;
      //取反
      this.show = !this.show;
    }
  }
}
</script>

<style lang="less" scoped>
#userIfo{
  height: 100%;

  //弹出层高度
  .van-action-sheet{
    padding: 4% 2% 3%;
    //height: 90%;
  }
}
</style>