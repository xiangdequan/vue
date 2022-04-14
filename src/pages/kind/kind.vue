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
<!-- 轮播     -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item><img src="../../assets/111.jpg"></van-swipe-item>
        <van-swipe-item><img src="../../assets/222.jpg"></van-swipe-item>
        <van-swipe-item><img src="../../assets/333.jpg"></van-swipe-item>
        <van-swipe-item><img src="../../assets/444.jpg"></van-swipe-item>
      </van-swipe>
        <shops width="36%" fontSize="12px" spanSize="12px" aSize="15px" class="shop"/>
    </div>
  </div>

</div>
</template>

<script>
import Search from "../../components/search";
//导入vant
import { Sidebar, SidebarItem,Swipe,SwipeItem} from 'vant';
import Shops from "@/components/shops";

export default {
  name: "kind",
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
      shops:[], //用于存储商品数据
      //定义导航栏标题
      kinds:["推荐","食品","手机","水果","鞋包","男装","百货","女装","电器","医药","电脑","美妆","家纺","运动","车品","玩乐"],
    }
  },
  methods:{
    //导航栏改变后更改对应数据
    updateShop(a){
      //组件自带 默认参数为点击导航栏索引
      //获取点击导航栏的名称
      //发送axios请求获取相关分类数据
      //将的到的数据赋值给shops
      //渲染页面
      let kind = this.kinds[a];
      console.log(kind)
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