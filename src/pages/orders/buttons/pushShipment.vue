<!--催促发货按钮-->
<template>
  <van-button plain type="primary" color="red" size="small" hairline round @click="pushShipment">催促发货</van-button>
</template>

<script>
export default {
  name: "pushShipment",
  data(){
    return {
      times:0,//用于记录点击次数
    }
  },
  methods: {
    //催促发货成功提示
    pushShipment() {
      if(!this.times) this.$toast.success('商家已收到您的催促');
      else this.$toast('您已经催促过了');
      this.times += 1;
    }
  }
}
</script>

<style scoped>

</style>