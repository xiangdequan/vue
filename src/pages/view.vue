<template>
<div id="pageView">
  <keep-alive include="buy">
    <router-view></router-view>
  </keep-alive>
  <bar/>
</div>
</template>

<script>
import Bar from "../components/bar";
export default {
  name: "pageView",
  components: {
    Bar,
  },
  mounted() {
    //在绑定时，触发购物车模块方法，获取数据库信息
    this.$store.dispatch('buyCar/getBuyCarShop');
  }
}
</script>

<style scoped>
#pageView{
  width: 100%;
  height: 100%;
}
</style>