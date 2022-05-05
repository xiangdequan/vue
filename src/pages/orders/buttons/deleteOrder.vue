<!--删除订单按钮-->
<template>
  <van-button plain type="primary" color="red" size="small" hairline round @click="deleteOrder">删除订单</van-button>
</template>

<script>
export default {
  name: "deleteOrder",
  props:{
    id:{ //传参，需要删除的订单id
      type:Number,
      require:true
    }
  },
  methods:{
    //删除订单 传参当前商品的id
    deleteOrder(){
      //弹窗提示
      this.$dialog.confirm({
        title: '删除订单',
        message: '是否删除当前订单信息?此操作无法恢复',
      })
          .then(() => {
            // on confirm
            this.$axios.post(
                'user/deleteOrder',
                {id:this.id}
            ).then(res=>{
              if(!res.data.code){
                this.$store.dispatch('orders/getOrders');//触发vuex订单模块数据更新
                this.$toast.success(res.data.msg);//成功提醒
                //跳转
                if(this.$route.name === 'orderInfo') this.$router.replace({name:'myOrders'})
              }else{
                this.$toast.fail(res.data.msg);//失败提醒
              }
            }).catch(()=>this.$toast('服务器繁忙'));
          })
          .catch(() => {
            // on cancel
          });
    },
  },
}
</script>

<style scoped>

</style>