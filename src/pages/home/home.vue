<template>
<div id="home">
<!--顶部搜索栏-->
<search />
<!--  顶部导航栏-->
  <van-tabs title-active-color="red" @click="searchByTitle" swipeable animated>
    <van-tab v-for="(val,index) in kinds" :title="val" :key="index">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功" style="min-height: 100%">
<!--   商品导航     -->
        <van-grid :border="false" :column-num="6">
          <van-grid-item v-for="item in 12" :key="item" class="grid-shops-banr">
            <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
            <span>待开发</span>
          </van-grid-item>
        </van-grid>
<!-- 商品展示区   需要传数据  标签的宽度   -->
        <shops width="34%" fontSize="14px"/>
      </van-pull-refresh>
    </van-tab>
  </van-tabs>
</div>
</template>

<script>
//导入vant组件
import {Toast,PullRefresh,Tab,Tabs,Grid, GridItem,Image} from "vant";
//导入搜索框
import search from "@/components/search";
import shops from "@/components/shops";

export default {
  name: "home",
  components:{
    [Toast.name]:Toast,
    [PullRefresh.name]:PullRefresh,
    [Tab.name]:Tab,
    [Tabs.name]:Tabs,
    [Grid.name]:Grid,
    [GridItem.name]:GridItem,
    [Image.name]:Image,
    search,
    shops
  },
  data() {
    return {
      //记录刷新次数 每刷新一次为1 表示成功 然后重新归0
      count: 0,
      isLoading: false,
      //定义导航栏标题
      kinds:["推荐","食品","手机","水果","鞋包","男装","百货","女装","电器","医药","电脑","美妆","家纺","运动","车品","玩乐"]
    }
  },
  methods:{
    //下拉刷新 axios更新
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    //导航栏点击事件
    searchByTitle(name,title){
      console.log(title)
    },
  }
}
</script>

<style lang="less" scoped>
#home{
  height: 100%;
  background-color: #F8F9F9;

  //顶部导航栏样式
  .van-tabs{
    height: 86%;
    width: 100%;
    position: relative;
    top: 6%;
    overflow-y: scroll;

    //去除滚动条样式
    &::-webkit-scrollbar{
      width: 0;
    }

      //顶部导航栏内容样式
      .van-pull-refresh{
        width: 100%;
      }
  }
  //定义混合用于控制span样式
  .span(){
    display: inline-block;
    margin-top: 2px;
  }
  //商品导航栏样式
  .van-grid{
    margin: 10px 0;
    //项目样式
    .grid-shops-banr{
      height: 65px;

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
    min-height: 100%;
    margin-bottom: 0!important;

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
</style>