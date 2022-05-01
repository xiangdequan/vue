<template>
<div id="searchShop">
<!-- 顶部 -->
  <div class="top">
<!--  back  -->
    <van-icon name="arrow-left" size="20px" @click="back"/>
<!--  搜索框  -->
    <van-search
        v-model.trim="value"
        show-action
        shape="round"
        :autofocus="true"
        :clearable="true"
        placeholder="请输入搜索关键词"
        @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
  </div>
<!-- 导航 -->
  <div class="orderBy" v-show="show">
    <!--  排序  -->
    <van-dropdown-menu>
      <van-dropdown-item :title="'全部商品'" :overlay="false"/>
      <van-dropdown-item v-model="orderBy" :options="option2" @change="change"/>
    </van-dropdown-menu>
  </div>
<!-- 商品展示区 -->
  <shops class="shopShow" :shops="shops"/>
</div>
</template>

<script>
//导入vant
import { Search,Icon,DropdownMenu, DropdownItem } from 'vant';
//导入shops组件
import Shops from "@/components/shops";
//导入mapSate
import {mapState} from "vuex";

export default {
  name: "searchShop",
  components: {
    Shops,
    [Search.name]:Search,
    [Icon.name]:Icon,
    [DropdownMenu.name]:DropdownMenu,
    [DropdownItem.name]:DropdownItem
  },
  data(){
    return {
      show:false, //用于控制商品排序栏的显示，只有点击搜索才会显示
      value:'',  //用于储存搜索框内容
      shops:[],  //用于储存符合条件的商品信息
      orderBy: 'a',//用于存储第二个下拉菜单已选中项的value值
      option1: [ //第一个选项下拉框内容
        { text: '全部商品', value: 0 }
      ],
      option2: [ //第二个选项下拉框内容
        { text: '综合排序', value: 'a' },
        { text: '价格降序', value: 'b' },
        { text: '价格升序', value: 'c' },
      ],
    }
  },
  computed:{
    //计算属性vuex中的商品数据
    ...mapState("allShops",['allShops']),
    //筛选符合条件的数据
    // shops(){
    //
  },
  methods:{
    //back返回上一页
    back(){
      this.$router.back(1);
    },
    //搜索商品  默认传参value 搜索的内容
    onSearch(){
      //取反show的值，使商品排序栏显示
      this.show = true;
      //根据搜索框的值匹配相应的商品  通过商品描述、类别搜索符合条件的商品
      this.shops = this.allShops.filter(val => val.font.indexOf(this.value) !== -1  || val.kind.indexOf(this.value) !== -1);
    },
    //组件选项自带 获取选中项数据 默认传参value 被选择项val
    change(val){
      //根据第二个菜单过滤出符合条件的商品  排序 默认按数据库位置排序，可选择升序和降序按价格
      if(val === 'b') this.shops.sort((a,b)=>{ return b.price - a.price});
      if(val === 'c') this.shops.sort((a,b)=> { return a.price - b.price});
    }
    }
  // }
}
</script>

<style lang="less" scoped>
#searchShop{
  height: 100%;
  background-color: #F8F9F9;
  //顶部内容
  .top{
    height: 6%;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;

    //back样式
    .van-icon{
      height: 6%;
      width: 4%;
      line-height: 6%;
      padding-left: 1%;
      box-sizing: border-box;
    }

    //搜索框
    .van-search{
      height: 100%;
      width: 96%;
    }
  }

  //排序导航
  .orderBy{
    height: 48px;
    width: 100%;
    position: fixed;
    top: 6%;
    z-index: 3;
  }

  //商品展示区
  .shopShow{
    position: relative;
    top: 13%;
    overflow-y: scroll;
    &::-webkit-scrollbar{
      width: 0;
      height: 0;
    }
  }
}
</style>