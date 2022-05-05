<!--重新支付按钮-->
<template>
  <van-button
      type="primary"
      size="small"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      hairline
      round
      @click="payFor"
  >
    立即支付
  </van-button>
</template>

<script>
export default {
  name: "rePay",
  //传参，需要支付的订单信息
  props:{
    order:{
      type:Object,
      require:true
    }
  },
  methods:{
    //支付  触发vuex订单模块重新支付订单数据  传参item,当前点击项
    payFor(){
      this.$store.commit('orders/rePayOrder',this.order)
      //跳转结算页面
      this.$router.push('/submitOrders');
    },
  }
}
</script>

<style scoped>

</style>