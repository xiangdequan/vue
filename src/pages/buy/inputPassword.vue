<template>
<!-- 密码输入 -->
<div id="inputPassword">
  <!-- 密码输入框 -->
  <van-password-input
      :value="value"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
  />
  <!-- 数字键盘 -->
  <van-number-keyboard
      v-model="value"
      :show="showKeyboard"
      @blur="showKeyboard = false"
  />
</div>
</template>

<script>
import { PasswordInput, NumberKeyboard } from 'vant';

export default {
  name: "inputPassword",
  components:{
    [PasswordInput.name]:PasswordInput,
    [NumberKeyboard.name]:NumberKeyboard
  },
  data() {
    return {
      value: '123',
      showKeyboard: true,
    };
  },
}
</script>

<style scoped>
#inputPassword{
  height: 100%;
}
</style>