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
    <van-cell icon="user-o" is-link title="用户头像修改" size="large" @click="isShow" />
    <van-cell icon="edit" is-link title="用户昵称修改" size="large" @click="isShow" />
    <van-cell icon="closed-eye" is-link title="用户密码修改" size="large" @click="isShow" />
    <van-cell icon="records" is-link title="修改所有信息" size="large" @click="isShow" />
    <van-cell icon="close" is-link title="注销账号" size="large" @click="isShow" />
  </van-cell-group>
  <van-action-sheet v-model="show" :title="title" :closeable="false">
    <updateUserImg v-if="title === '用户头像修改'"/>
    <updatePassword v-if="title === '用户密码修改'"/>
    <updateName v-if="title === '用户昵称修改'"/>
    <updateAll v-if="title === '修改所有信息'"/>
    <deleteUser v-if="title === '注销账号'"/>
  </van-action-sheet>
</div>
</template>

<script>
//引入vant
import {Cell,CellGroup} from 'vant'
import updatePassword from "@/pages/userInfo/updateInfo/updatePassword";
import updateUserImg from "@/pages/userInfo/updateInfo/updateUserImg";
import updateName from "@/pages/userInfo/updateInfo/updateName";
import updateAll from "@/pages/userInfo/updateInfo/updateAll";
import deleteUser from "@/pages/userInfo/updateInfo/deleteUser";

export default {
  name: "userInfo",
  components:{
    updatePassword,
    updateUserImg,
    updateName,
    updateAll,
    deleteUser,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
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
      this.$dialog.confirm({
        title: '注销登录',
        message: '这将导致您将失去购物功能,重新登录后恢复',
      })
          .then(() => {
            // on confirm
            //清除本地储存的token
            window.localStorage.removeItem('token');
            //提示
            this.$toast('注销登录成功');
            //跳转登录页
            this.$router.replace('/login');
          }).catch(()=>{})
    },
    //是否显示  传参操作类型
    isShow(event){
      //根据操作类型  定义标题内容
      this.title = event.target.innerText;
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