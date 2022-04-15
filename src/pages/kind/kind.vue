<template>
<div id="kind">
<!-- 搜索框 -->
  <search/>
  <!-- 主体内容 -->
  <div class="content">
    <van-sidebar v-model="activeKey" @change="searchByTitle">
      <van-sidebar-item v-for="item in kinds" :key="item" :title="item" />
    </van-sidebar>
  <!-- 对应导航栏内容   -->
    <div class="shopBar">
<!-- 轮播     -->
      <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
        <van-swipe-item v-for="item in shops" :key="item.id"><img :src="item.img"></van-swipe-item>
      </van-swipe>
<!--  商品展示  //当商品为推荐时，展示所有商品    -->
        <shops
            width="36%"
            fontSize="12px"
            spanSize="12px"
            aSize="15px"
            class="shop"
            :shops="title === '推荐' ? allShops : shops"
        />
    </div>
  </div>

</div>
</template>

<script>
//导入vant
import { Sidebar, SidebarItem,Swipe,SwipeItem} from 'vant';
//导入search、shops组件
import Shops from "@/components/shops";
import Search from "../../components/search";
//导入混合
import mixin from "@/mixin/mixin";

export default {
  name: "kind",
  mixins:[mixin], //注册混合用于处理商品信息分类展示
  components:{
    Shops,
    Search,
    [Sidebar.name]:Sidebar,
    [SidebarItem.name]:SidebarItem,
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem
  },
  data(){
    return {
      activeKey:0, //用于存储点击索引
    }
  }
}
</script>

<style lang="less" scoped>
#kind{
  height: 100%;

  //定义混合隐藏滚动条
  .scrollHide(){
    //隐藏滚动条
    &::-webkit-scrollbar{
      width: 0;
    }
  }

  //主体内容
  .content{
    height: 92%;
    position: relative;
    top: 6%;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    overflow-y: scroll;
    .scrollHide(); //混合，隐藏滚动条

    //侧边导航
    .van-sidebar{
      .scrollHide(); //混合，隐藏滚动条
    }

    //二级导航
    .shopBar{
      width: 79%;
      height: 100%;
      background-color: #F8F9F9;
      overflow-y: scroll;

      &::-webkit-scrollbar{
        width: 0;
      }
      //轮播
      .my-swipe .van-swipe-item {
        color: #fff;

        img{
          width: 100%;
        }
      }

      //shop样式
      .shop{
        margin-bottom: 14%;
      }

    }

  }
}
</style>