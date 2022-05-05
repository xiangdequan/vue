<template>
<div>
  <van-field
      v-model="oldPassword"
      type="text"
      label="密码"
      required
      placeholder="请输入该账号密码"
  />
  <van-button round block type="info" @click="deleteUser">注销账号</van-button>
</div>
</template>

<script>
import updateInfo from "@/mixin/updateInfo";

export default {
  name: "deleteUser",
  mixins:[updateInfo],
  data(){
    return {
      oldPassword:''
    }
  },
  methods:{
    //用户注销
   deleteUser(){
      //判断是否输入内容
      if(this.oldPassword.length < 6 || this.oldPassword.length > 12) return this.$toast('密码不合法(无空格6~12位)');
     //弹窗提示
     this.$dialog.confirm({
       title: '注销账号',
       message: '此操作将清空您在闪购平台的所有数据,且无法恢复,请谨慎操作!',
     })
         .then(() => {
           //发请求注销
           this.postAxios('deleteUser',{oldPassword:this.oldPassword});
         }).catch(()=>{})
    }
  }
}
</script>

<style scoped>
.van-button{
  margin: 16px 0;
  width: 96%;
}
</style>