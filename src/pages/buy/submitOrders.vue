<template>
<div id="submitOrders">
<!-- 导航栏 -->
  <van-nav-bar
      left-text="返回"
      title="确认订单"
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
        v-for="item in shops"
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
  <van-submit-bar :price="shopsTotalPrice" button-text="提交订单" @submit="submitOrders" />
<!-- 弹出  支付方式 -->
  <van-action-sheet v-model="show"  :close-on-click-action="true">
    <div class="content" @click="payFor"><van-icon name="wechat-pay" color="green" size="19px"/>微信支付</div>
    <div class="content" @click="payFor"><van-icon name="alipay" color="blue" size="19px"/>支付宝支付</div>
    <div class="content" @click="payFor"><van-icon name="shopping-cart" color="red" size="19px"/>闪购钱包支付</div>
  </van-action-sheet>
<!-- 弹出支付密码输入框 -->
  <van-popup v-model="passwordShow" position="bottom" style="height: 300px" @click-overlay="cancelPay">
    <div>
      <!-- 密码输入框 -->
      <van-password-input
          :error-info="errorInfo"
          :value="payPassword"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
          v-model="payPassword"
          :show="showKeyboard"
          @blur="showKeyboard = false"
          random-key-order
      />
    </div>
  </van-popup>
</div>
</template>

<script>
import {
  NavBar,
  AddressList,
  Icon,
  Card,
  Tag,
  SubmitBar,
  ActionSheet,
  Toast,
  Popup,
  PasswordInput,
  NumberKeyboard
} from 'vant'
//导入axios配置对象
import axios from '../../uitls/axios';
import {mapState} from 'vuex';

export default {
  name: "submitOrders",
  components:{
    [Tag.name]:Tag,
    [Card.name]:Card,
    [Icon.name]:Icon,
    [Toast.name]:Toast,
    [NavBar.name]:NavBar,
    [Popup.name]:Popup,
    [PasswordInput.name]:PasswordInput,
    [NumberKeyboard.name]:NumberKeyboard,
    [ActionSheet.name]:ActionSheet,
    [SubmitBar.name]:SubmitBar,
    [AddressList.name]:AddressList
  },
  data(){
    return {
      show:false,//控制弹出层显示
      passwordShow:false,//控制密码输入框
      address:{},//收货地址
      shops:[],//保存结算商品信息
      payKind:'',//支付方式
      payPassword: '',//支付密码
      errorInfo:'',//密码错误提示
      showKeyboard: true,//是否显示密码弹出层
      shopsTotalPrice:0.00,//保存待结算商品所有价格
    }
  },
  computed:{
    ...mapState('buyCar',["checkedShops",'totalPrice','buyShop']),
  },
  watch:{
    //监视密码输入框value值变化，当value值长度为6时发送请求验证密码
    payPassword(newVal){
      if(newVal.length === 6){
        //密码正确  隐藏密码输入框
        this.passwordShow = false;
        this.payPassword = '';//清空输入框
        //支付动画
        Toast.loading({
          message: '支付中...',
          forbidClick: true,
        });
        //发送请求验证支付密码
        this.axiosForOrders('待发货',this.payKind,'支付成功');
      }
    }
  },
  methods:{
    goBack(){
      //当从商品详情页进入本页面时，点击导航栏时跳转回商品详情页，并携带当前商品的id
      if(this.buyShop.length !== 0){
        this.$router.replace(`/shopInfo/${this.shops[0].shopId}`);
      }else{
        //当从购物车进入本页面时，点击导航栏时跳转到购物车
        this.$router.replace({name:'buyCar'});//点击返回购物车
      }
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
    //整合传递到后台的数据  传参订单种类、支付方式
    expressData(orderKind,payKind){
      //获取结算页的商品数据
      let shops = this.shops;
      //收货人姓名
      let name = this.address.name;
      //收货人详细地址
      let orderAddress = this.address.address;
      //收货人电话
      let tel = this.address.tel;
      //下单时间  时间戳
      let orderTime = +new Date();
      //订单基本数据整合
      let beginData = {name,orderAddress,tel,orderKind,orderTime,payKind}
      //订单所有数据整合 通过遍历提交的每一项商品，将订单基本信息合并在其中,并将处理结果返回出去
      return  shops.map(val => {
        if(!val.userName) val = {userName:this.address.userName,...val};
        delete val['id'];
        return {orderNumber:orderTime+val.shopId,totalPrice:(val.price*val.num).toFixed(2),...beginData,...val}
      })
    },
    //提交订单axios封装函数
    axiosForOrders(orderKind,payKind,msg){
      //发送请求 提交订单
      axios.post(
          '/user/submitOrders',
          this.expressData(orderKind,payKind)
      ).then(res=>{
        //判断是否支付成功
        if(res.data.code){
          Toast.fail(res.data.msg);//提交失败提示
        }else{
          //定时器  延缓动画结束效果
         let timeout = setTimeout(()=>{
            Toast.success(msg);//提交成功提示
            this.$store.dispatch('orders/getOrders');//触发vuex更新订单数据
            this.$router.replace({name:'buyCar'});//跳转购物车页面
           clearTimeout(timeout); //清除定时器
          },1000)
        }
      }).catch(()=>{Toast.fail('服务器繁忙')})
    },
    //支付选项点击事件，通过event对象获取点击项的文本内容
    payFor(event){
      this.show = false;//隐藏支付方式框
      this.passwordShow = true;//显示密码输入框
      this.payKind = event.target.innerText;//将点击的支付方式保存到变量
    },
    //点击取消按钮处理函数
    cancelPay(){
      //发送请求，将本次结算的所有商品列为待支付，且跳转我的界面(replace)
      Toast.loading({
        message: '正在取消支付...',
        forbidClick: true,
      });
      this.axiosForOrders('待支付','未支付','已取消支付');
    }
  },
  //路由生命周期
  beforeRouteLeave(to,from,next){
    if (to.name === 'shopInfo'){
      //假如是从商品结算页进入本页面时，无论是否支付，都清空vuex中单个商品结算的商品数据
      this.$store.commit('buyCar/GetBuyShopInfo',[]);
    }
    next();
  },
  mounted() {
    //判断vuex单个商品结算模块是否有数据，若没有就使用计算属性内购物车已选中商品数据
    if(this.buyShop.length){
      this.shops = this.buyShop;
      this.shopsTotalPrice = (this.shops[0].price)*100;
    } else{
      this.shops = this.checkedShops;
      this.shopsTotalPrice = this.totalPrice;
    }

    //当路由参数address存在，则赋值给本地address变量，否则发请求获取
    if(this.$route.params.address) return this.address = this.$route.params.address;
    //发送请求获取默认地址
    axios.get(
        'user/myAddress',
    ).then(res=>{
      if (!res.data.code){
        //将服务器返回的地址数据保存  解构赋值
       return [this.address] = res.data.results.filter(val=>val.isDefault === 1); //返回的数据中默认地址交给address
      }
      Toast(res.data.msg); //失败提示
    }).catch(()=>{Toast('服务器繁忙')});
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