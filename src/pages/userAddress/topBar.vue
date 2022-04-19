<template>
<!-- 导航栏，传参title -->
  <div id="topBar">
    <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="goBack"
    />
  </div>
</template>

<script>
import {NavBar} from 'vant';

export default {
  name: "topBar",
  components:{
    [NavBar.name]:NavBar
  },
  props:['title'],
  methods:{
    //返回上一页
    goBack() {
      //跳转上一页
      this.$router.back();
    }
  }
}
</script>

<style scoped>

</style>