<!--商品展示组件-->
<template>
<!-- 商品展示组件 -->
<div id="shops">
  <!-- 商品项 根据父组件传过来的数据动态渲染 商品图片、商品描述 通过id获取商品的详情页-->
  <div class="shops-item" v-for="item in shops" :key="item.id" @click="getMore(item.id)">
    <!--  :src="item.url" 374px -->
    <img src="../assets/oppo.jpg"/>
    <span>hhhhhfff</span>
    <span>分期付款  正品保证</span>
    <span>￥999.99</span>
  </div>
</div>
</template>

<script>
export default {
  name: "shops",
  //父元素传递商品数据
 /* props:{
    shops:{
      type:Array
    }
  },*/
  data(){
    return {
      shops:[
        {},{},{},{},{},{},{},{},{},{}
      ]
    }
  },
  methods:{
    //点击跳转  传参相应商品id
    getMore(id){
      console.log(id);
      //路由跳转携带参数  id
    }
  }
}
</script>

<style lang="less" scoped>
//展示区
#shops{
  display: flex;
  flex-wrap: wrap;
  align-items: center;


  //商品项
  .shops-item{
    height: 254px;
    width: 48.5%;
    margin: 1% 1% 0;
    box-sizing: border-box;
    border: 1px solid red;

    //偶数项外边距
    &:nth-of-type(even){
      margin-left: 0;
    }

    //img商品详情
    img{
      height: 187px; //187px 2x 374px
      width: 100%;
      background: yellow;
    }

    //商品介绍
    span{
      height: 20px;
      line-height: 20px;
      width: 98%;
      padding-left: 2%;
      background: blue;
      display: block;
    }
  }
}
</style>