<template>
<div id="home">
<!--顶部搜索栏-->
  <search />
  <div class="content">
    <!-- 轮播     -->
    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white" :show-indicators="false" v-if="allShops.length">
      <van-swipe-item v-for="item in allShops" :key="item.id" @click="goShopInfo(item.id)">
        <img :src="item.img"/>
      </van-swipe-item>
    </van-swipe>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <!--   商品导航     -->
      <van-grid :border="false" :column-num="6">
        <van-grid-item v-for="item in 12" :key="item" class="grid-shops-banr">
          <img src="../../assets/logo.png" />
          <span>待开发</span>
        </van-grid-item>
      </van-grid>
      <!-- 商品展示区   需要传数据  标签的宽度   //当商品为推荐时，展示所有商品-->
      <shops :shops="allShops"/>
    </van-pull-refresh>
  </div>
</div>
</template>

<script>
//导入vant组件
import {PullRefresh,Swipe,SwipeItem} from "vant";
//导入搜索框
import search from "@/components/search";
import shops from "@/components/shops";
import showAction from "@/mixin/showAction";
import {mapState} from "vuex";

export default {
  name: "home",
  components:{
    [PullRefresh.name]:PullRefresh,
    [Swipe.name]:Swipe,
    [SwipeItem.name]:SwipeItem,
    search,
    shops
  },
  mixins:[showAction],//混合，用于在商品数据还未加载完成时显示动画
  data() {
    return {
      //记录刷新次数 每刷新一次为1 表示成功 然后重新归0
      count: 0,
      isLoading: false,
    }
  },
  computed:{
    ...mapState('allShops',['allShops'])
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
  beforeMount() {
    //通过实例方法$watch方法开启监听，回调函数、配置为混合中的，当监听的属性变化时显示加载动画
    this.$watch('allShops',this.watchCallback,this.isDeep)
  },
  mounted() {
    this.showToast(this.allShops.length);//调用混合中定义的方法，用于判断是否需要加载动画
  }
}
</script>

<style lang="less" scoped>
#home{
  height: 100%;
  background-color: #F8F9F9;

  .content{
    position: relative;
    top: 6%;
    height: 88%;
    overflow-y: scroll;
    //去除滚动条样式
    &::-webkit-scrollbar {
      width: 0;
    }

    //轮播
    .my-swipe{
      height: 43%;

      .van-swipe-item{
        color: #fff;

        img{
          height: 100%;
          width: 100%;
          border-radius: 10px;
        }
      }
    }
      //定义混合用于控制span样式
      .span() {
        display: inline-block;
        margin-top: 2px;
      }

      //商品导航栏样式
      .van-grid {
        margin: 5px 0 10px;
        //项目样式
        .grid-shops-banr {
          height: 65px;

          //图片样式
          img {
            height: 30px;
            width: 30px;
          }

          span {
            height: 12px;
            font-size: 12px;
            //调用混合
            .span();
          }
        }
      }

      //商品展示区
      .grid-shops {

        .van-grid-item {
          padding-top: 0 !important;
        }

        //项目样式
        .grid-shops-show {
          height: 240px !important;
          border: 1px solid red;
          //图片样式
          .van-image {
            height: 86%;
          }

          span {
            .span();
          }
        }
    }
  }
}
</style>