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
    //触发vuex中订单管理模块数据更新
    this.$store.dispatch('orders/getOrders');
  }
}
</script>

<style scoped>
#pageView{
  width: 100%;
  height: 100%;
}
</style>