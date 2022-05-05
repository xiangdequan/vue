<template>
<div>
    <van-field
        v-model="info"
        type="text"
        label="昵称"
        required
        placeholder="请输入新昵称"
    />
  <van-button round block type="info" @click="updateName">修改昵称</van-button>
</div>
</template>

<script>
import updateInfo from "@/mixin/updateInfo";

export default {
  name: "updateName",
  mixins:[updateInfo],
  data(){
    return {
      info:'',//用于储存用户输入的新昵称
    }
  },
  methods:{
    updateName(){
      //验证用户是否输入
      if(this.info.length < 3 || this.info.length > 6) return this.$toast('昵称不合法(无空格3~6位)');
      //调用混合内方法，执行操作
      this.postAxios('updateName',{info:this.info});
      //修改成功后，清空输入框
      if(this.isOk) this.info = '';
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