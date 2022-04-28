<template>
<div id="myAdress">
  <div  class="topBar">
    <topBar title="查看收货地址"/>
  </div>
  <!--  只有未找到相关结果才显示-->
  <van-empty description="您还没有添加收货地址" v-if="this.list.length <= 0"/>
  <div class="content">
    <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="select"
    />
  </div>
</div>
</template>

<script>
import {AddressList, Toast,Empty} from 'vant'
//导入顶部导航组件
import topBar from "@/pages/userAddress/topBar";
//导入axios配置对象
import axios from '../../uitls/axios';

export default {
  name: "myAdress",
  components:{
    topBar,
    [AddressList.name]:AddressList,
    [Toast.name]:Toast,
    [Empty.name]:Empty
  },
  data() {
    return {
      chosenAddressId: '',
      list: [],//用于保存用户的收货地址
    };
  },
  methods: {
    onAdd() {
      //'新增地址'
      this.$router.push('/addAddress')
    },
    onEdit(item) {
      //'编辑地址:' + index
      this.$router.push({name:'addAddress',params:{addressInfo:item}});
    },
    //组件自带  选中切换事件，默认传参，item:当前选中项的地址对象,index:当前选中项索引
    select(item){
      //切换选中地址触发  更改选中状态  根据路由传参执行操作，如果该值为未定义就不执行
      if(this.$route.params.type){
        //跳转商品结算页面，并将点击的该项地址传过去
        this.$router.replace({name:'submitOrders',params:{address:item}})
      }
    }
  },
  mounted() {
    //将数据库的地址数据保存到list
    axios.get(
        'user/myAddress'
    ).then(res=>{
      if (!res.data.code){
        this.list = res.data.results; //返回的数据交给list
        this.list.map(val=>{
          //遍历每一项，当地址为默认选中时，将isDefault属性改为true
          if(val.isDefault) {
            val.isDefault = true;
          }else{
            val.isDefault = false;
          }
        })
      }else{
        Toast(res.data.msg); //失败提示
      }
    }).catch(()=>{Toast('服务器繁忙')})
  }
}
</script>

<style lang="less" scoped>
#myAdress{
  height: 100%;
  width: 100%;

  .topBar{
    position: fixed;
    top: 0;
    left: 0;
    height: 6%;
    width: 100%;
    z-index: 2;
  }
  .content{
    position: relative;
    left: 0;
    z-index: 1;
    top: 6%;
  }
//空状态样式
  .van-empty{
    position: absolute;
    top: 26%;
    width: 100%;
  }
}

</style>