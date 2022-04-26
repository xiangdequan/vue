<template>
<div id="submitOrders">
<!-- 导航栏 -->
  <van-nav-bar
      left-text="确认订单"
      left-arrow
      @click-left="goBack"
  />
<!-- 收货地址栏 -->
  <div class="address">
<!--  定位图标  -->
      <van-icon name="location" color="red" size="30px"/>
<!--  地址内容  -->
      <div>
        <span>{{address.addressDetail}}</span>
        <span>{{address.name}} {{address.tel}}</span>
      </div>
<!--  地址编辑图标  -->
    <van-icon name="edit" size="20px" @click="checkAddress"/>
  </div>
<!-- 结算商品展示区 -->
  <div class="showShops">
    <van-card
        v-for="item in checkedShops"
        :key="item.id"
        :num="item.num"
        :price="item.price"
        :desc="item.promise"
        :title="item.font"
        class="goods-card"
        :thumb="item.img"
    >
      <!--  插槽，卡片标签      -->
      <template #tags>
        <van-tag plain type="danger">{{item.discount}}</van-tag>
      </template>
    </van-card>
  </div>
<!-- 订单提交 -->
  <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="submitOrders" />
<!-- 弹出  支付方式 -->
  <van-action-sheet v-model="show"  close-on-click-action cancel-text="取消" @cancel="cancelPay" :close-on-click-overlay="false">
    <div class="content" @click="payFor"><van-icon name="wechat-pay" color="green" size="19px"/>微信支付</div>
    <div class="content" @click="payFor"><van-icon name="alipay" color="blue" size="19px"/>支付宝支付</div>
    <div class="content" @click="payFor"><van-icon name="shopping-cart" color="red" size="19px"/>闪购钱包支付</div>
  </van-action-sheet>
</div>
</template>

<script>
import {NavBar, AddressList, Icon, Card, Tag, SubmitBar, ActionSheet, Toast} from 'vant'
import axios from "axios";
import {mapState} from 'vuex';

export default {
  name: "submitOrders",
  components:{
    [Tag.name]:Tag,
    [Card.name]:Card,
    [Icon.name]:Icon,
    [NavBar.name]:NavBar,
    [ActionSheet.name]:ActionSheet,
    [SubmitBar.name]:SubmitBar,
    [AddressList.name]:AddressList
  },
  data(){
    return {
      show:false,//控制弹出层显示
      address:{},//收货地址
    }
  },
  computed:{
    ...mapState('buyCar',["checkedShops",'totalPrice']),
  },
  methods:{
    goBack(){
      this.$router.replace({name:'buyCar'});//点击返回购物车
    },
    //选择、编辑收货地址
    checkAddress(){
      //跳转到我的地址页面  传参，用来区分操作
      this.$router.push({name:'myAddress',params:{type:"check"}});
    },
    //提交订单  显示弹窗
    submitOrders(){
      this.show = true
    },
    //支付选项点击事件，通过event对象获取点击项的文本内容
    payFor(event){
      alert(event.target.innerText);
      //发送请求 提交订单
      //发送请求将本次订单列为待支付
    },
    //点击取消按钮处理函数
    cancelPay(){
      //发送请求，将本次结算的所有商品列为待支付，且跳转我的界面(replace)
    }
  },
  mounted() {
    //当路由参数address存在，则赋值给本地address变量，否则发请求获取
    if(this.$route.params.address) return this.address = this.$route.params.address;
    //发送请求获取默认地址
    axios.get(
        'user/myAddress',
        {
          headers:{
            "Authorization": window.localStorage.getItem('token')
          }
        }
    ).then(res=>{
      if (!res.data.code){
        [this.address] = res.data.results.filter(val=>val.isDefault === 1); //返回的数据中默认地址交给address
      }
      Toast(res.data.msg); //失败提示
    }).catch(()=>{Toast('服务器繁忙')})
  }
}
</script>

<style lang="less" scoped>
#submitOrders{
  height: 100%;
  background-color: rgba(249, 249, 255, 0.82);

  //导航栏
  .van-nav-bar{
    height: 6%;
  }

  //地址栏
  .address{
    height: 7%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;

    //地址内容
    div{
      width: 70%;
      margin-left: 3%;

      //地址显示列
      > span{
        width: 80%;
        font-size: 14px;
        display: block;

        //详细地址部分
        &:first-child{
          height: 23px;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }

  //商品区
  .showShops{
    height: 80.4%;
    overflow-y: scroll;
    //隐藏滚动条
    &::-webkit-scrollbar{
      width: 0;
    }
    //商品卡片
    .van-card{
      border-radius: 15px;
      background-color: white;

      &:first-child{
        margin-top: 2%;
      }
    }
  }
  //弹出框  支付方式选项样式
  .content {
    height: 20px;
    text-align: center;
    padding: 16px  0;

    &:last-child{
      margin-bottom: 15px;
    }

    //图标样式
    .van-icon{
      margin-right: 2%;
    }
  }
}
</style>