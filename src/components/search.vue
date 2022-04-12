<template>
  <van-search v-model="value" placeholder="请输入搜索关键词" @focus="search" shape="round" @search="service"/>
</template>

<script>
//引入vant
import {Search} from "vant"

export default {
  name: "search",
  components:{
    [Search.name]:Search,
  },
  data(){
    return {
      value:''
    }
  },
  methods:{
    //搜索跳转
    search(){
      this.$router.push('/search');
    },
    //搜索
    service(){
      alert(111)
    }

  }
}
</script>

<style scoped>
/*搜索框样式*/
.van-search{
  top: 0;
  left: 0;
  height: 6%;
  width: 100%;
  position: fixed;
}
</style>