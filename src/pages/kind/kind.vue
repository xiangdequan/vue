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
<!--  商品展示  //当商品为推荐时，展示所有商品    -->
        <shops
            width="37%"
            fontSize="12px"
            spanSize="12px"
            PromiseSize="11px"
            aSize="15px"
            class="shop"
            :shops="shops"
        />
    </div>
  </div>

</div>
</template>

<script>
//导入vant
import { Sidebar, SidebarItem} from 'vant';
//导入search、shops组件
import Shops from "@/components/shops";
import Search from "../../components/search";
//导入混合
import {mapState} from "vuex";
import showAction from "@/mixin/showAction";

export default {
  name: "kind",
  components:{
    Shops,
    Search,
    [Sidebar.name]:Sidebar,
    [SidebarItem.name]:SidebarItem,
  },
  mixins:[showAction],//混合，用于在商品数据还未加载完成时显示动画
  data(){
    return {
      activeKey:0, //用于存储点击索引
      title:'推荐', //用于储存点击的导航栏标题
      //定义导航栏标题
      kinds:["推荐","食品","手机","水果","鞋包","男装","百货","女装","电器","医药","电脑","美妆","家纺","运动","车品","玩乐"],
    }
  },
  computed:{
    //储存所有商品数据
    ...mapState('allShops',['allShops']),
    shops(){
      if(this.title === '推荐') return this.allShops;
      return this.allShops.filter(val => val.kind === this.title);
    }
  },
  methods:{
    //导航栏点击事件  组件默认传参name:索引,title:文本
    searchByTitle(name) {
      //根据索引匹配标签名，从而筛选对应数据
      this.title = this.kinds[name];
    }
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
#kind{
  height: 100%;

  //定义混合隐藏滚动条
  .scrollHide(){
    overflow-y: scroll;
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
      height: 95%;
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

      //shop样式
      .shop{
        margin-bottom: 11.5%;
      }

    }

  }
}
</style>