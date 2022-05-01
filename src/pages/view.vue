<template>
<div id="pageView">
  <keep-alive include="buy">
<!--  组件动画  -->
    <transition name="van-fade">
      <router-view key="1"></router-view>
    </transition>
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