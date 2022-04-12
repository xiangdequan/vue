<template>
  <div id="app">
    <router-view></router-view>
    <router-view class="bar" name="bar"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

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
