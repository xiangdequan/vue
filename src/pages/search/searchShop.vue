<template>
<div id="searchShop">
<!-- 顶部 -->
  <div class="top">
<!--  back  -->
    <van-icon name="arrow-left" size="20px" @click="back"/>
<!--  搜索框  -->
    <van-search
        v-model="value"
        show-action
        shape="round"
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
  <div class="orderBy">
    <!--  排序  -->
    <van-dropdown-menu>
      <van-dropdown-item :title="'全部商品'" :overlay="false"/>
      <van-dropdown-item v-model="orderBy" :options="option2" @change="change"/>
    </van-dropdown-menu>
  </div>
<!-- 商品展示区 -->
  <shops class="shopShow"/>
</div>
</template>

<script>
//导入vant
import { Search,Icon,DropdownMenu, DropdownItem } from 'vant';
import Shops from "@/components/shops";

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
      value:'',//搜素框值
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
  methods:{
    //back返回上一页
    back(){
      this.$router.back(1);
    },
    //搜索商品  默认传参value 搜索的内容
    onSearch(){
      //发送axios请求 获取数据
      //将数据保存本地
      //数据渲染到子组件
    },
    //组件选项自带 获取选中项数据 默认传参value 被选择项val
    change(val,e){
console.log(val,e)
    }
  }
}
</script>

<style lang="less" scoped>
#searchShop{
  height: 100%;

  //顶部内容
  .top{
    height: 6%;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 3;
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
    height: 86%;
    top: 14%;
  }
}
</style>