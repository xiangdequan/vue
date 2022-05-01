<template>
  <div id="myCollect">
    <van-nav-bar
        title="我的收藏"
        left-text="返回"
        left-arrow
        @click-left="goBack"
    />
  </div>
</template>

<script>
import {NavBar} from 'vant'

export default {
  name: "wallet",
  components:{
    [NavBar.name]:NavBar
  },
  methods:{
    //返回上一个页面
    goBack(){
      this.$router.replace({name:'mine'});
    }
  }
}
</script>

<style scoped>

</style>