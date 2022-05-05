<template>
  <van-search placeholder="请输入搜索关键词" @focus="search" shape="round"/>
</template>

<script>
export default {
  name: "search",
  methods:{
    //搜索跳转
    search(){
      this.$router.push('/search');
    },
  }
}
</script>

<style scoped>
/*搜索框样式*/
.van-search{
  top: 0;
  left: 0;
  height: 6%;
  width: 100%;
  z-index: 3;
  position: fixed;
}
</style>