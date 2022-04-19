<!--商品展示组件
prop样式: width:标签宽度(默认34%)
fontSize:标签字体大小(默认14px)
spanSize:span标签字体大小(默认14px)
aSize:a标签字体大小(默认18px)
shops:展示的商品(数组)
-->
<template>
<!-- 商品展示组件 -->
<div id="shops">
<!--  只有未找到相关结果才显示-->
  <van-empty image="search" description="未找到相关商品" v-if="shops.length <= 0"/>
  <!-- 商品项 根据父组件传过来的数据动态渲染 商品图片、商品描述 通过id获取商品的详情页-->
  <div class="shops-item" v-for="item in shops" :key="item.id" @click="getMore(item.id)">
    <!--  :src="item.url" 374px -->
    <img :src="item.img"/>
    <span :style="{fontSize:spanSize}">{{item.font}}</span>
    <span :style="{fontSize:spanSize}">{{item.promise}}</span>
    <span>
      <van-tag type="danger" :style="{width:width,fontSize:fontSize}">{{item.discount}}</van-tag>
      <a :style="{fontSize:aSize}">￥{{item.price}}</a>
    </span>
  </div>
</div>
</template>

<script>
//引入vant
import {Tag,Empty} from 'vant';

export default {
  name: "shops",
  //父元素传递商品数据
  props:{
    shops:{
      type:Array //商品信息
    },
    width:{  //标签宽度
      type:String
    },
    fontSize:{  //标签字体大小
      type:String
    },
    spanSize:{  // span字体大小
      type:String
    },
    aSize:{ //a标签字体大小，价格
      type: String
    }
  },
  components:{
    [Tag.name]:Tag,
    [Empty.name]:Empty
  },
  data(){
    return {

    }
  },
  methods:{
    //点击跳转  传参相应商品id
    getMore(id){
      //跳转携带参数---当前商品项id
      this.$router.push(`/shopInfo/${id}`);
    },
  }
}
</script>

<style lang="less" scoped>
//展示区
#shops{
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  //只有未找到相关结果才显示
  .van-empty{
    height: 100%;
    width: 100%;
  }
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
      height: 70%;
      //height: 187px; //187px 2x 374px
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

    span:nth-of-type(2){
      color: green;
      letter-spacing: 0.5px;
    }

    span:last-child{
      margin-top: 3px;
      padding-right: 5%;
      height: 21px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      // 标签宽度默认
      .van-tag{
        width: 34%;
        font-size: 14px;
      }
      a{
        font-size: 19px;
        color: red;
      }
    }
  }
}
</style>