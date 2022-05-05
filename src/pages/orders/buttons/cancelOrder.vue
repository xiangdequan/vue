<!--删除订单按钮-->
<template>
  <van-button plain type="primary" color="red" size="small" hairline round @click="cancelOrder">取消订单</van-button>
</template>

<script>
export default {
  name: "cancelOrder",
  props:{
    id:{ //传参，需要删除的订单id
      type:Number,
      require:true
    }
  },
  methods:{
    //删除订单 传参当前商品的id
    cancelOrder(){
      //弹窗提示  根据id更改订单类型
      this.$toast.loading({
        duration: 2000, // 持续展示 toast
        message: '正在取消...',
        forbidClick: true,
      });
      this.$router.replace({name:'myOrders'})
    },
  }
}
</script>

<style scoped>

</style>