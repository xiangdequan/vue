<template>
<div id="pageView">
  <router-view></router-view>
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
  /*mounted() {
    //在绑定时，发送验证token,获取内容，并保存到vuex的userInfo中
    this.$store.dispatch('userInfo/getUserIfo');
  }*/
}
</script>

<style scoped>
#pageView{
  width: 100%;
  height: 100%;
}
</style>