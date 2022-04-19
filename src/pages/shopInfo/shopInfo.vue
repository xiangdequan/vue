<template>
<!-- 商品详情页 -->
<div id="shopInfo">
<img :src="shopInfo.img"/>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "shopInfo",
  components:{

  },
  data(){
    return {
      shopInfo:{},//用于储存点击项商品信息
    }
  },
  methods:{

  },
  beforeMount() {
    //通过路由传参的id获取商品信息
    axios.post(
        'api/getShopInfo',
        {id:this.$route.params.id},
    ).then(res=>{
      //判断是否成功获取
      if(!res.data.code) return this.shopInfo = res.data.results[0];//将获取的值存到shopInfo
    }).catch(()=>{alert('服务器繁忙')})
  }
}
</script>

<style scoped>

</style>