<template>
<div>
  <van-field
      v-model="oldPassword"
      label="旧密码"
      required
      placeholder="请填写旧密码"
  />
  <van-field
      v-model="newPassword"
      type="password"
      label="新密码"
      required
      placeholder="请填写新密码"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" @click="updatePassword">修改密码</van-button>
  </div>
</div>
</template>

<script>
import {Field,Button,Toast} from "vant";
import updateInfo from "@/mixin/updateInfo";

export default {
  name: "updataName",
  components:{
    [Field.name]:Field,
    [Button.name]:Button,
    [Toast.name]:Toast()
  },
  mixins:[updateInfo], //注册混合
  data(){
    return {
      oldPassword: '', //旧密码
      newPassword: '' //新密码
    }
  },
  methods:{
    //修改密码
    updatePassword(){
      //验证输入是否为空
      let oldPassword = this.oldPassword;
      let newPassword = this.newPassword;
      if(oldPassword.length > 12 || oldPassword.length < 6 || oldPassword.indexOf(' ') !== -1) return Toast('旧密码格式不正确(无空格6~12位)');
      if (newPassword.length > 12 || newPassword.length < 6 || newPassword.indexOf(' ') !== -1) return Toast('新密码格式不合法(无空格6~12位)');
      //没问题发送请求 混合内封装的方法
      this.postAxios('updatePassword',{oldPassword,newPassword});
      //修改成功后跳转重新登录
      if(this.isOk) this.$router.replace('/login');
    }
  }
}
</script>

<style scoped>

</style>