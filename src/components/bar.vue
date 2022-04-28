<template>
  <!--底部导航栏-->
  <van-tabbar v-model="active">
    <van-tabbar-item icon="wap-home-o" to="home" replace>首页</van-tabbar-item>
    <van-tabbar-item icon="bars" to="kind" replace dot>分类</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" :badge="shopsNum | isShowBadge" to="buyCar"  replace>购物车</van-tabbar-item>
    <van-tabbar-item icon="user-circle-o" :badge="mineBadge" to="mine" replace>我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
//引入vant
import {Tabbar,TabbarItem} from "vant";
//引入混合 内置过滤器、计算属性，用于处理购物车角标
import isShowBadge from "@/mixin/isShowBadge";
import {mapState} from "vuex";

export default {
  name: "bar",
  components:{
    [Tabbar.name]:Tabbar,
    [TabbarItem.name]:TabbarItem,
  },
  data(){
    return {
      active:0, //选中项导航栏索引
      routeUrl:this.$route.name //将路由的名称保存在变量，方便监测
    }
  },
  computed:{
    ...mapState('orders',['orders']),//获取所有订单数量
    mineBadge(){ //我的-导航角标
      let num = this.orders.length;
      return num ? num : '';
    }
  },
  mixins:[isShowBadge],//混合，内置过滤器、计算属性（获取购物车商品条数），当shopsNum购物车为空时，传值''，即不显示角标
  //监视route的name属性变化,匹配active值  实现导航栏精准定位
  watch:{
    routerUrl(newVal){
      //每次变化验证当前路由的名字，匹配相应导航栏索引
      this.activeNum(newVal);
    }
  },
  methods:{
    activeNum(name){
      //根据传来的值匹配导航项
      switch (name){
        case 'home':
          this.active = 0;
          break;
        case 'kind':
          this.active = 1;
          break;
        case 'buyCar':
          this.active = 2;
          break;
        case 'mine':
          this.active = 3;
          break;
        default:
          this.active = 0;
      }
    }
  },
  mounted() {
    //组件绑定后进行一次匹配  匹配对应导航
    this.activeNum(this.$route.name);
  }
}
</script>

<style scoped>
/*底部导航栏样式*/
.van-tabbar{
  height: 7%;
  position: fixed;
  top: 93%;
  width: 100%;
}
</style>