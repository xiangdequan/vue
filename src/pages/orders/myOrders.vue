<template>
<div id="myOrders">
<!-- 顶部导航 -->
  <van-nav-bar
      title="我的订单"
      left-text="返回"
      @click-left="goBack"
      @click-right="searchOrder"
      left-arrow
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
<!-- 菜单导航 -->
  <van-tabs class="bar" v-model="active" @change="getRightOrders" animated swipeable sticky offset-top="9vw">
    <van-tab class="barContent" v-for="barName in barName" :key="barName" :title="barName" :swipeable="true">
<!--   空状态   -->
      <van-empty description="还没有订单呢！" v-if="!fliterOrders"/>
<!--  商品订单详情    -->
      <div class="order">
      <!--    单个订单    -->
        <div class="oneByOrder" v-for="item in fliterOrders" :key="item.id">
          <!--    详情展示    -->
          <van-card
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
          <!--    操作    -->
          <div class="control">
            <!--     商品总价     -->
            <div class="totalPrice">实付：<a>￥</a><span>{{item.totalPrice}} </span>(免运费)</div>
            <!--    待支付订单操作      -->
            <div v-show="item.orderKind === '待支付'">
              <van-button plain type="primary" color="red" size="small" hairline round>删除订单</van-button>
              <van-button type="primary"  size="small" color="linear-gradient(to right, #ff6034, #ee0a24)" hairline round>立即支付</van-button>
            </div>
            <!--    待发货订单操作      -->
            <div v-show="item.orderKind === '待发货'">
              <van-button plain type="primary" color="black" size="small" hairline round>申请退款</van-button>
              <van-button plain type="primary" color="red" size="small" hairline round>催促发货</van-button>
            </div>
            <!--    待收货订单操作      -->
            <div v-show="item.orderKind === '待收货'">
              <van-button plain type="primary" color="black" size="small" hairline round>删除订单</van-button>
              <van-button plain type="primary" color="black" size="small" hairline round>申请退款</van-button>
              <van-button plain type="primary" color="black" size="small" hairline round>查看物流</van-button>
              <van-button type="primary"  size="small" color="linear-gradient(to right, #ff6034, #ee0a24)" hairline round>确认收货</van-button>
            </div>
          </div>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</div>
</template>

<script>
import {NavBar,Tab, Icon, Tabs,Card,Tag,Button,Empty} from 'vant'
import {mapState} from "vuex";

export default {
  name: "myOrders",
  components:{
    [NavBar.name]:NavBar,
    [Icon.name]:Icon,
    [Tabs.name]:Tabs,
    [Tab.name]:Tab,
    [Tag.name]:Tag,
    [Card.name]:Card,
    [Empty.name]:Empty,
    [Button.name]:Button
  },
  data(){
    return {
      active:0,//用于绑定点击导航栏的索引
      barName:['全部','待支付','待发货','待收货','待评价'],//用于保存导航栏标题
      fliterOrders:[],//用于储存商品
    }
  },
  computed:{
    ...mapState('orders',['orders']),//获取vuex中所有订单信息
  },
  methods:{
    //点击后退页面
    goBack(){
      //后退
      this.$router.replace({name:'mine'});
    },
    //搜索订单
    searchOrder(){
      alert('待开发')
    },
    //根据点击的标题获取订单信息 默认传参 name:索引 title:标题,
    getRightOrders(name,title){
      //过滤数据
      if(!name) return this.fliterOrders = this.orders;//当切换到全部时将计算属性所有订单的值赋给orders
      this.fliterOrders = this.orders.filter(val => val.orderKind === title);//当切换到全部时将过滤出计算属性对应值赋给orders
    }
  },
  mounted() {
    //当组件挂载时 根据用户在个人中心点击后的路由传参过滤相应的订单数据，
    if(this.$route.params.type){
        this.active = this.$route.params.index;
        //当点击全部进入时，显示全部订单
        if(this.$route.params.type === '全部') return this.fliterOrders = this.orders;
        this.fliterOrders = this.orders.filter(val => val.orderKind === this.$route.params.type);
    }
  }
}
</script>

<style lang="less" scoped>
#myOrders{
  height: 100%;
  background-color: #fafafa;

  //顶部导航
  .van-nav-bar{
    height: 6%;
    position: fixed;
    z-index: 3;
    width: 100%;
  }

  //导航
  .bar{
    min-height: 94%;
    position: relative;
    top: 6%;

    //内容
    .barContent{
      height: 100%;

      //订单中心
      .order{
        height: 100%;

        //单个订单
        .oneByOrder{
          background-color: white;
          margin-bottom: 6px;

          //第一个订单
          &:first-child{
            margin-top: 6px;
          }

          //卡片
          .van-card{
            background-color: white;
          }

          //控制中心
          .control {
            box-sizing: border-box;
            //border: 1px solid red;

            //商品总价
            .totalPrice {
              height: 30px;
              line-height: 30px;
              text-align: right;
              padding-right: 13px;
              font-size: 13px;
              color: #727272;
              border: 1px solid #f6f6f6;

              //人民币标识
              a {
                color: red;
                font-size: 10px;
              }

              //价格
              span {
                color: red;
                font-size: 16px;
              }
            }

            //操作按钮
            > div:not(.totalPrice) {
              height: 38px;
              display: flex;
              align-items: center;
              box-sizing: border-box;
              justify-content: flex-end;

              //按钮样式
              .van-button {
                height: 25px;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>