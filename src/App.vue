<template>
  <div id="app">
    <transition name="van-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  beforeMount() {
    //触发vuex中的方法  获取所有商品数据
    this.$store.dispatch('allShops/getAllShops',0);
  }
}
</script>

<style lang="less">
html,body,#app{
  width: 100%;
  height: 100%;
  min-width: 320px;

  .bar{

  }
}
</style>
