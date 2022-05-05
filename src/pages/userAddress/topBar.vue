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

export default {
  name: "topBar",
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