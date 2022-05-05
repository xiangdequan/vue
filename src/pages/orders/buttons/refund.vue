<template>
  <van-button plain type="primary" color="black" size="small" hairline round @click="refund">申请退款</van-button>
</template>

<script>
export default {
  name: "refund",
  //传参，当前订单信息
  props:{
    order:{
      type:Object,
      require:true
    }
  },
  methods:{
    //申请退款
    refund(){
      //发送axios请求，根据id将订单类型改为已退款，并修改闪购钱包的余额(加上当前订单总价)
      this.$toast.loading({
        duration: 2000, // 持续展示 toast
        message: '正在退款...',
        forbidClick: true,
      });
      this.$router.replace({name:'myOrders'})
    }
  }
}
</script>

<style scoped>

</style>