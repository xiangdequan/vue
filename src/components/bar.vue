<template>
  <!--底部导航栏-->
  <van-tabbar v-model="active">
    <van-tabbar-item icon="wap-home-o" to="/home" replace>首页</van-tabbar-item>
    <van-tabbar-item icon="bars" to="/kind" replace dot>分类</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" badge="5" to="/buy"  replace>购物车</van-tabbar-item>
    <van-tabbar-item icon="user-circle-o" badge="20" to="/mine" replace>我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
//引入vant
import {Tabbar,TabbarItem} from "vant";

export default {
  name: "bar",
  components:{
    [Tabbar.name]:Tabbar,
    [TabbarItem.name]:TabbarItem,
  },
  data(){
    return {
      active:0,
    }
  },
  methods:{

  }
}
</script>

<style scoped>
/*底部导航栏样式*/
.van-tabbar{
  height: 8%;
  position: fixed;
  top: 92%;
  width: 100%;
}
</style>