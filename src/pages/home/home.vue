<template>
<div id="home">
<!--顶部搜索栏-->
<search />
<!--  顶部导航栏-->
<!--  <van-tabs title-active-color="red" @change="searchByTitle" swipeable animated>-->
<!--    <van-tab v-for="(val,index) in kinds" :title="val" :key="index">-->
<!--    </van-tab>-->
<!--  </van-tabs>-->
  <!-- 轮播     -->
  <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white" >
    <van-swipe-item v-for="item in shops" :key="item.id" @click="goShopInfo(item.id)"><img :src="item.img" ></van-swipe-item>
  </van-swipe>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
    <!--   商品导航     -->
    <van-grid :border="false" :column-num="6">
      <van-grid-item v-for="item in 12" :key="item" class="grid-shops-banr">
        <img src="../../assets/th.jpg" />
        <span>待开发</span>
      </van-grid-item>
    </van-grid>
    <!-- 商品展示区   需要传数据  标签的宽度   //当商品为推荐时，展示所有商品-->
    <shops :shops="shops"/>
  </van-pull-refresh>
</div>
</template>

<script>
//导入vant组件
import {Toast,PullRefresh,Tab,Tabs,Grid, GridItem,Swipe,SwipeItem} from "vant";
//导入搜索框
import search from "@/components/search";
import shops from "@/components/shops";
//导入混合
import mixin from "@/mixin/mixin";

export default {
  name: "home",
  mixins:[mixin], //注册混合用于处理商品信息分类展示
  components:{
    [Toast.name]:Toast,
    [PullRefresh.name]:PullRefresh,
    [Tab.name]:Tab,
    [Tabs.name]:Tabs,
    [Grid.name]:Grid,
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem,
    [GridItem.name]:GridItem,
    search,
    shops
  },
  data() {
    return {
      //记录刷新次数 每刷新一次为1 表示成功 然后重新归0
      count: 0,
      isLoading: false,
    }
  },
  methods:{
    //下拉刷新 axios更新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    goShopInfo(id){
      this.$router.push({name:'shopInfo',params:{id}})
    },
  },
}
</script>

<style lang="less" scoped>
#home{
  height: 100%;
  background-color: #F8F9F9;

  //轮播
  .my-swipe .van-swipe-item {
    height: 30%;
    position: relative;
    top: 6%;
    color: #fff;

    img{
      height: 50%;
      width: 100%;
      border-radius: 10px;
    }
  }
  //顶部导航栏内容样式
  .van-pull-refresh{
    width: 100%;
    overflow-y: scroll;

    //去除滚动条样式
    &::-webkit-scrollbar{
      width: 0;
    }

    //定义混合用于控制span样式
    .span(){
      display: inline-block;
      margin-top: 2px;
    }

    //商品导航栏样式
    .van-grid{
      margin: 5px 0 10px;
      //项目样式
      .grid-shops-banr{
        height: 65px;

        //图片样式
        img{
          height: 30px;
          width: 30px;
        }

        span{
          height: 12px;
          font-size: 12px;
          //调用混合
          .span();
        }
      }
    }
    //商品展示区
    .grid-shops{

      .van-grid-item{
        padding-top: 0 !important;
      }
      //项目样式
      .grid-shops-show{
        height: 240px !important;
        border: 1px solid red;
        //图片样式
        .van-image{
          height: 86%;
        }
        span{
          .span();
        }
      }
    }


  }
}
</style>