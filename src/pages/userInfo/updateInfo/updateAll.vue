<template>
  <div id="updateAll">
    <van-uploader :after-read="afterRead" max-count="1" v-model="fileList"/>
    <van-field
        v-model="oldPassword"
        type="text"
        label="旧密码"
        required
        placeholder="请输入旧密码"
    />
    <van-field
        v-model="newPassword"
        type="text"
        label="新密码"
        required
        placeholder="请输入新密码"
    />
    <van-field
        v-model="info"
        type="text"
        label="新昵称"
        required
        placeholder="请输入新昵称"
    />
    <van-button round block type="info" @click="updateAll">修改全部信息</van-button>
  </div>
</template>

<script>
import updateInfo from "@/mixin/updateInfo";

export default {
  name: "updateAll",
  mixins:[updateInfo], //注册混合
  data() {
    return {
      oldPassword:'',
      newPassword:'',
      info: '',//用于储存用户输入的新昵称
      fileList:[], //文件
      file:'', //上传的文件
    }
  },
  methods:{
    //文件上传完成事件，默认参数file已转换了base64格式 通过file.content获取
    afterRead(file){
      //将读取完成的file保存的变量
      this.file = file.content;
    },
    updateAll(){
      //保存用户输入到当前变量
      let oldPassword = this.oldPassword;
      let newPassword = this.newPassword;
      let info = this.info;
      let userImg = this.file;
      //判断用户内容是否输入合法
      if (oldPassword.length < 6 || oldPassword.length > 12) return this.$toast('旧密码不合法(无空格6~12位)');
      if (newPassword.length < 6 || newPassword.length > 12) return this.$toast('新密码不合法(无空格6~12位)');
      if(info.length < 3 || info.length > 6) return this.$toast('新昵称不合法(无空格3~6位)');
      if(userImg.length === 0) return this.$toast('请上传新头像');
      //没问题发送请求 混合内封装的方法
      this.postAxios('updateAll',{oldPassword,newPassword,info,userImg});
    }
  }
}
</script>

<style scoped>
#updateAll{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.van-button{
  margin: 16px 0;
  width: 90%;
}
</style>