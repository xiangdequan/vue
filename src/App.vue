<template>
  <div id="app">
    <keep-alive include="searchShop">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  beforeMount() {
    //触发vuex中的方法  获取所有商品数据
    this.$store.dispatch('allShops/getAllShops');
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
