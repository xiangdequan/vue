<!--商品展示组件-->
<template>
<!-- 商品展示组件 -->
<div id="shops">
  <!-- 商品项 根据父组件传过来的数据动态渲染 商品图片、商品描述 通过id获取商品的详情页-->
  <div class="shops-item" v-for="item in shops" :key="item.id" @click="getMore(item.id)">
    <!--  :src="item.url" 374px -->
    <img src="../assets/oppo.jpg"/>
    <span>OPPO K9 Pro 5G智能手机游戏手机拍照手机轻薄机身</span>
    <span>分期付款  正品保证  假一赔十</span>
    <span>
      <van-tag type="danger" :style="{width:width,fontSize:fontSize}">百亿补贴</van-tag>
      <a>￥999.99</a>
    </span>
  </div>
</div>
</template>

<script>
//引入vant
import {Tag} from 'vant';

export default {
  name: "shops",
  //父元素传递商品数据
 /* props:{
    shops:{
      type:Array
    }
  },*/
  props:["width","fontSize"],//标签宽度 字体大小
  components:{
    [Tag.name]:Tag
  },
  data(){
    return {
      shops:[
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
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
    height: 30%;
    width: 47.75%;
    margin: 0 1.5% 1.6%;
    box-sizing: border-box;
    background-color: white;
    border-radius: 8px;

    //偶数项外边距
    &:nth-of-type(even){
      margin-left: 0;
    }

    //img商品详情
    img{
      height: 187px; //187px 2x 374px
      width: 100%;
      border-radius: 8px 8px 0 0;
    }

    //商品介绍
    span{
      height: 18px;
      line-height: 18px;
      width: 97%;
      padding-left: 3%;
      //background: blue;
      display: block;
      overflow: hidden;
      font-size: 14px;
    }
    span:last-child{
      margin-top: 3px;
      padding-right: 5%;
      height: 21px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      a{
        font-size: 19px;
        color: red;
      }
    }
  }
}
</style>