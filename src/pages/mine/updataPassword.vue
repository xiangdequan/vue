<template>
<div>
  <van-field
      v-model="oldPassword"
      label="旧密码"
      placeholder="旧密码"
      :rules="[{ required: true, message: '请填写旧密码' }]"
  />
  <van-field
      v-model="newPassword"
      type="password"
      label="新密码"
      placeholder="新密码"
      :rules="[{ required: true, message: '请填写新密码' }]"
  />
</div>
</template>

<script>
import {Field} from "vant";

export default {
  name: "updataName",
  components:{
    [Field.name]:Field
  },
  data(){
    return {
      oldPassword: '', //旧密码
      newPassword: '' //新密码
    }
  }
}
</script>

<style scoped>

</style>