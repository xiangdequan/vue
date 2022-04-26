<template>
<!-- 商品详情页 -->
<div id="shopInfo">
<!-- 顶部导航 -->
  <div class="barTop">
    <van-icon name="arrow-left" size="22px" :class="{'van-icon-left':true}" @click="back"/>
    <van-icon name="share-o" size="22px"/>
  </div>
<!-- 商品大图 -->
  <img :src="shopInfo.img">
<!-- 商品信息 -->
  <div class="info">
    <span>￥{{shopInfo.price}}<van-tag type="danger">{{shopInfo.discount}}</van-tag></span>
    <span>{{shopInfo.font}}</span>
    <span>{{shopInfo.promise}}  </span>
  </div>
<!-- 商品长图展示 -->
  <div class="longImg">
    <img :src="shopInfo.img">
    <img :src="shopInfo.img">
    <img :src="shopInfo.img">
  </div>
<!-- 底部菜单 -->
  <van-goods-action>
    <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
    <van-goods-action-icon icon="cart-o" text="购物车" :badge="shopsNum | isShowBadge" :to="{name:'buyCar'}"/>
    <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
    <van-goods-action-button type="warning" text="加入购物车" @click="addBuyCar"/>
    <van-goods-action-button type="danger" text="立即购买" @click="buyShop"/>
  </van-goods-action>
</div>
</template>

<script>
import {Icon, Tag, GoodsAction, GoodsActionIcon, GoodsActionButton, Toast} from 'vant'
import axios from "axios";
import isShowBadge from "@/mixin/isShowBadge"; //混合，内置过滤器、计算属性，用于处理购物车角标

export default {
  name: "shopInfo",
  components:{
    [Icon.name]:Icon,
    [Tag.name]:Tag,
    [Toast.name]:Toast,
    [GoodsAction.name]:GoodsAction,
    [GoodsActionIcon.name]:GoodsActionIcon,
    [GoodsActionButton.name]:GoodsActionButton
  },
  data(){
    return {
      shopInfo:{},//用于储存点击项商品信息
    }
  },
  mixins:[isShowBadge],//混合，内置过滤器、计算属性（获取购物车商品条数），当shopsNum购物车为空时，传值''，即不显示角标
  methods:{
    back(){
      //返回上一页
      this.$router.back()
    },
    addBuyCar(){
      this.show = true
      //将当前商品id传给后台
      axios.post(
          'user/addBuyCar',
          {
          num:1,
          discount:this.shopInfo.discount,
          img:this.shopInfo.img,
          font:this.shopInfo.font,
          price:this.shopInfo.price,
          shopId:this.shopInfo.id,
          promise:this.shopInfo.promise
          },
          {
            headers:{
              'Authorization':window.localStorage.getItem('token')
            }
          }
      ).then(res=>{
          this.schema(res.data);//验证请求结果
      }).catch(()=>Toast('服务器繁忙'))
    },
    buyShop(){

    },
    //验证加入购物车请求结果
    schema(data){
      if(!data.code){ //成功情况
        this.$store.dispatch('buyCar/getBuyCarShop');//触发vuex中购物车信息模块数据更新
        Toast('已加入购物车');//成功提示
      } else if(data.code === 2){ //失败情况：token失效
        Toast(data.msg);//失败提示
        this.$router.push('/login');//跳转登录页
      }else{ //失败情况
        Toast(data.msg)//失败提示
      }
    }
  },
  beforeMount() {
    //通过路由传参的id获取商品信息
    axios.post(
        'api/getShopInfo',
        {id:this.$route.params.id},
    ).then(res=>{
      //判断是否成功获取
      if(!res.data.code) return this.shopInfo = res.data.results[0];//将获取的值存到shopInfo
    }).catch(()=>{Toast('服务器繁忙')})
  }
}
</script>

<style lang="less" scoped>
#shopInfo{
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    width: 0;
  }

  .barTop{
    height: 6%;
    width: 100%;
    padding: 0 2%;
    position: fixed;
    top: 0;
    z-index: 2;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .van-icon-left{
      opacity: 0.3;
      color: white;
      padding: 1%;
      border-radius: 50%;
      background-color: black;
    }
  }

  img{
    height: 400px;
    min-height: 50%;
    width: 100%;
  }

  //商品详情
  .info{
    width: 100%;
    height: 18%;
    box-sizing: border-box;

    >span{
      display: block;
      width: 100%;
      padding: 0 1%;
      margin-top: 2%;
      box-sizing: border-box;
    }

    span:first-child{
      color: red;
      font-size: 24px;
      display: flex;
      align-items: center;

      .van-tag{
        width: 15.8%;
        height: 75%;
        margin-left: 4%;
        display: inline-block;
        color: white;
        font-size: 15px;
      }
    }

    span:nth-of-type(2){
      font-size: 16px;
      letter-spacing: 1.5px;
      font-weight: bold;
    }

    span:last-child{
      color: green;
    }
  }
}
</style>