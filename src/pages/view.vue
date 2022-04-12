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
  components: {Bar}
}
</script>

<style scoped>
#pageView{
  width: 100%;
  height: 100%;
}
</style>