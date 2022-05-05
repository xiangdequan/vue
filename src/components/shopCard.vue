<template>
<div id="shopCard">
  <van-card
      :num="shopInfo.num"
      :price="shopInfo.price"
      :desc="shopInfo.promise"
      :title="shopInfo.font"
      class="goods-card"
      :thumb="shopInfo.img"
  >
    <!--  插槽，卡片标签      -->
    <template #tags>
      <van-tag plain type="danger">{{shopInfo.discount}}</van-tag>
    </template>
  </van-card>
</div>
</template>

<script>

export default {
  name: "shopCard",
  props:{
    //商品信息
    shopInfo:{
      type:Object,
      require:true
    }
  }
}
</script>

<style lang="less" scoped>
.van-card{
  border-radius: 15px 15px 0 0;//圆角
  background-color: white;
}
</style>