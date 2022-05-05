<template>
<div id="orderInfo">
  <van-nav-bar
      :title="orderInfo.orderKind"
      left-text="返回"
      left-arrow
      @click-left="goBack"
  />
<!-- 中间内容区域 -->
  <div class="content">
    <!-- 订单步骤条 -->
    <van-steps :active="active">
      <van-step>待支付</van-step>
      <van-step>待发货</van-step>
      <van-step>待收货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
    <!-- 地址 -->
    <div class="address">
      <!--  定位图标  -->
      <van-icon name="location" color="red" size="30px"/>
      <!--  地址内容  -->
      <div>
        <span>{{orderInfo.name}} {{orderInfo.tel}}</span>
        <span>{{orderInfo.orderAddress}}</span>
      </div>
    </div>

    <div class="order">
      <!-- 商品详情 -->
      <shop-card :shop-info="orderInfo"/>
      <!--  按钮  -->
      <div class="button">
        <re-pay :order="orderInfo" v-if="orderInfo.orderKind === '待支付'"/>
        <refund :order="orderInfo" v-if="orderInfo.orderKind === '待发货' || orderInfo.orderKind === '待收货'"/>
        <judge v-if="orderInfo.orderKind === '待评价'"/>
      </div>
      <!-- 订单信息 -->
      <ul class="info" v-if="isShow">
        <li class="pay" v-if="active===0"><a>待付款</a><a><span>￥</span>{{orderInfo.totalPrice}}</a></li>
        <li class="pay" v-if="active!==0"><a>实付款</a><a><span>￥</span>{{orderInfo.totalPrice}}</a></li>
        <li><a>订单编号</a>{{orderInfo.orderNumber}}</li>
        <li><a>支付方式</a>{{orderInfo.payKind}}</li>
        <li><a>闪购积分</a>获得2点积分</li>
        <li><a @click="checkShow">查看更多  <van-icon name="arrow-down"/></a></li>
      </ul>
      <!--  详细订单信息  -->
      <ul v-if="!isShow">
        <li><a>商品总价</a>商品总价<a><span>￥</span>{{orderInfo.totalPrice}}</a></li>
        <li><a>运费</a>运费(快递)<a><span>￥</span>0.00</a></li>
        <li class="pay"><a>红包</a>红包<a><span>-￥</span>0.00</a></li>
        <!--   当订单为待付款时显示待付款信息，否则显示实付款信息-->
        <li class="pay" v-if="!active"><a>待付款</a><a><span>￥</span>{{orderInfo.totalPrice}}</a></li>
        <li class="pay" v-if="active"><a>实付款</a><a><span>￥</span>{{orderInfo.totalPrice}}</a></li>
        <li><a>订单编号</a>{{orderInfo.orderNumber}}</li>
        <li><a>闪购积分</a>获得2点积分</li>
        <li><a>支付方式</a>{{orderInfo.payKind}}</li>
        <!--   当订单已发货时显示   -->
        <li v-if="active!==0 && active !== 1"><a>物流公司</a>{{orderInfo.express}}</li>
        <li v-if="active!==0 && active !== 1"><a>物流单号</a>{{orderInfo.expressNum}}</li>
        <li><a>创建时间</a>{{payTime}}</li>
        <li v-if="active"><a>支付时间</a>{{payTime}}</li>
        <li v-if="active!==0 && active !== 1"><a>发货时间</a>2022-05-04 03:22:43</li>
        <li><a @click="checkShow">收起  <van-icon name="arrow-up" /></a></li>
      </ul>
    </div>
<!--  同类型商品展示  -->
    <shops :shops="sameKind"/>
  </div>
  <!--  按钮  -->
  <div class="buttomButton">
    <delete-order :id="orderInfo.id" v-if="orderInfo.orderKind !== '待发货' && orderInfo.orderKind !== '待收货'"/>
    <!--    待支付订单操作      -->
    <cancel-order v-if="orderInfo.orderKind === '待支付'" :id="orderInfo.id"/>
    <!--    待发货订单操作      -->
    <push-shipment v-if="orderInfo.orderKind === '待发货'"/>
    <!--    待收货订单操作      -->
    <check-express v-if="orderInfo.orderKind === '待收货'"/>
    <sure-get v-if="orderInfo.orderKind === '待收货'"/>
  </div>
</div>
</template>

<script>
import {Step, Steps} from 'vant'
import ShopCard from "@/components/shopCard";
import Shops from "@/components/shops";
import {mapState} from "vuex";
import DeleteOrder from "@/pages/orders/buttons/deleteOrder";
import RePay from "@/pages/orders/buttons/rePay";
import Refund from "@/pages/orders/buttons/refund";
import PushShipment from "@/pages/orders/buttons/pushShipment";
import CheckExpress from "@/pages/orders/buttons/checkExpress";
import SureGet from "@/pages/orders/buttons/sureGet";
import Judge from "@/pages/orders/buttons/judge";
import CancelOrder from "@/pages/orders/buttons/cancelOrder";

export default {
  name: "orderInfo",
  components:{
    CancelOrder,
    Judge,
    SureGet,
    CheckExpress,
    PushShipment,
    Refund,
    RePay,
    DeleteOrder,
    Shops,
    ShopCard,
    [Step.name]:Step,
    [Steps.name]:Steps,
  },
  data(){
    return {
      isShow:true,//用于控制订单详细信息显示
    }
  },
  computed:{
    //用于控制进度
    active(){
      let active = 0;//初始值
      //通过switch匹配当前的订单种类，从而更新相应进度
      switch (this.orderInfo.orderKind){
        case '待支付':
          break;
        case '待发货':
          active = 1;
          break;
        case '待收货':
          active = 2;
          break;
        default:
          active = 3;
      }
      return active
    },
    //获取点击项订单信息
    ...mapState('orders',['orderInfo']),
    //获取所有商品数据
    ...mapState('allShops',['allShops']),
    //过滤出符合当前订单商品类型的商品
    sameKind(){
      // if(!this.allShops.length) return []
      return this.allShops.filter(val=>val.kind === this.orderInfo.kind);
    },
    //获取支付时间
    payTime(){
      return this.getDate(this.orderInfo.orderTime);
    }
  },
  methods:{
    //返回上一个页面 传参进入该页面时导航栏的状态 index
    goBack(){
      this.$router.replace({name:'myOrders'});
    },
    //控制订单信息详细显示
    checkShow(){
      this.isShow = !this.isShow;
    },
    getDate(val){
      //实例化Date对象，并传入当前订单支付的时间戳
      let date = new Date(Number(val));
      //获取年、月、日，并用'-'拼接起来
      let day = date.getFullYear()+'-'+this.niceTime(date.getMonth()+1)+'-'+this.niceTime(date.getDay()+1);
      //获取时、分、秒，并用':'拼接起来
      let time = this.niceTime(date.getHours())+':'+this.niceTime(date.getMinutes())+':'+this.niceTime(date.getSeconds());
      //返回拼接后的值
      return day +' '+time;
    },
    //用于优化时间细节
    niceTime(val){
      //当传入的参数小于10，将在前面补零
      return val >= 10 ? val : '0'+val;
    }
  },
  mounted() {
    this.getDate()
  },
  //路由生命周期钩子  离开当前路由时，携带参数index,为了达到匹配进入页面前的分类
  beforeRouteLeave(to,from,next){
    to.params.index = this.$route.params.index;
    next();
  }
}

</script>

<style lang="less" scoped>
#orderInfo{
  height: 100%;
  //overflow-x: hidden;
  background-color: #f8f7f7;

  //标题导航栏
  .van-nav-bar{
    height: 6%;
    width: 100%;
    top:0;
    position: fixed;
    z-index: 3;
  }

  //定义混合  用于控制按钮样式
  .button(){
    padding-right: 5%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;

    .van-button{
      margin-left: 3%;
      height: 55%;
    }
  }

  //内容区域
  .content{
    height: 88%;
    top: 6%;
    position: relative;
    //padding-bottom: 1%;
    //box-sizing: border-box;
    overflow-y: scroll;
    //清除滚动条
    &::-webkit-scrollbar{
      width: 0;
    }

    //步骤条
    .van-steps{
      //padding: 2% 4%;
      width: 92%;
      border-radius: 15px;
      margin: 1% auto 0;
    }

    //地址栏
    .address{
      height: 8%;
      width: 97%;
      display: flex;
      border-radius: 15px;
      margin: 2% auto;
      justify-content: center;
      align-items: center;
      background-color: white;

      //地址内容
      div{
        width: 82%;
        margin-left: 3%;

        //地址显示列
        > span{
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

    //order
    .order{
      //height: ;
      width: 97%;
      margin: 8px auto 0;
      border-radius: 15px;
      background-color: white;

      //按钮
      .button{
        height: 50px;
        margin-bottom: 2%;
        .button()//按钮混合
      }

      //订单详细信息
      ul{
        list-style: none;
        margin-bottom: 2%;

        li{
          font-size: 14px;
          height: 35px;
          line-height: 35px;
          padding: 0 3%;
          color: #727272;
          text-align: right;
          box-sizing: border-box;

          //第一个a标题，为名称项
          a:first-child{
            color: black;
            float: left;
          }

          //第二个a标签
          a:nth-of-type(2){
            display: inline-block;
            margin-left: 2%;
            font-weight: bold;
            box-sizing: border-box;

            span{
              font-size: 12px;
            }
          }
        }

        //最后一个li
        li:last-child{
          display: flex;
          height: 40px;
          line-height: 40px;
          justify-content: center;

          a{
            font-size: 14px;
            color: #727272;
          }
        }

        //实付款、红包颜色
        .pay{
          a:last-child{
            color: red;
          }
        }
      }
    }
  }

  //底部按钮
  .buttomButton{
    height: 6%;
    width: 100%;
    background-color: white;
    position: fixed;
    top: 94%;
    .button();

    //按钮样式覆盖
    .van-button{
      height: 65%;
      width: 20%;
    }
  }
}
</style>