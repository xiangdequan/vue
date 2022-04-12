<template>
<div id="kind">
<!-- 搜索框 -->
  <search/>
</div>
</template>

<script>
//引入vant
import {TreeSelect} from "vant";
import Search from "../../components/search";

export default {
  name: "kind",
  components:{
    Search,
    [TreeSelect.name]:TreeSelect
  }
}
</script>

<style lang="less" scoped>
#kind{
  height: 100%;
}
</style>