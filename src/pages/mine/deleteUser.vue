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
import {Field, Button,Toast} from "vant";
import updateInfo from "@/mixin/updateInfo";

export default {
  name: "deleteUser",
  components:{
    [Field.name]:Field,
    [Button.name]:Button,
  },
  mixins:[updateInfo],
  data(){
    return {
      oldPassword:''
    }
  },
  methods:{
    //用户注销
   async deleteUser(){
      //判断是否输入内容
      if(this.oldPassword.length < 6 || this.oldPassword.length > 12) return Toast('密码不合法(无空格6~12位)');
      //发请求注销
      this.postAxios('deleteUser',{oldPassword:this.oldPassword});
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