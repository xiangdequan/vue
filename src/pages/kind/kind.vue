<template>
<div id="kind">
<!-- 搜索框 -->
  <search/>
  <!-- 主体内容 -->
  <div class="content">
    <van-sidebar v-model="activeKey" @change="updateShop">
      <van-sidebar-item v-for="item in kinds" :key="item" :title="item" />
    </van-sidebar>
  <!-- 对应导航栏内容   -->
    <div class="shopBar">
    <!--    子列表项 通过获取到的数据动态渲染src span -->
      <div>
        <img src="../../assets/logo.png"/>
        <span>商品导航</span>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import Search from "../../components/search";
//导入vant
import { Sidebar, SidebarItem } from 'vant';

export default {
  name: "kind",
  components:{
    Search,
    [Sidebar.name]:Sidebar,
    [SidebarItem.name]:SidebarItem
  },
  data(){
    return {
      activeKey:0, //用于存储点击索引
      //定义导航栏标题
      kinds:["推荐","食品","手机","水果","鞋包","男装","百货","女装","电器","医药","电脑","美妆","家纺","运动","车品","玩乐"]
    }
  },
  methods:{
    //导航栏改变后更改对应数据
    updateShop(a){
      //组件自带 默认参数为点击导航栏索引
      //获取点击导航栏的名称
      let kind = this.kinds[a];
      console.log(kind)
    }
  }
}
</script>

<style lang="less" scoped>
#kind{
  height: 100%;

  //主体内容
  .content{
    height: 92%;
    position: relative;
    top: 6%;
    z-index: 1;
  }
}
</style>