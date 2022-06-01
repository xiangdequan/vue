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
      <div v-if="Object.keys(address).length">
        <span>{{address.addressDetail}}</span>
        <span>{{address.name}} {{address.tel}}</span>
      </div>
    <!--  当用户没有收货地址时显示 并阻止提交订单 -->
      <div v-if="!Object.keys(address).length" @click="checkAddress">添加收货地址</div>
<!--  地址编辑图标  -->
    <van-icon name="edit" size="20px" @click="checkAddress"/>
  </div>
<!-- 结算商品展示区 -->
  <div class="showShops">
    <shop-card v-for="item in shops" :key="item.id" :shop-info="item"/>
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
  <van-popup v-model="passwordShow" position="bottom" style="height: 340px" @click-overlay="cancelPay">
    <div>
      <!-- 密码输入框 -->
      <van-password-input
          info="请输入支付密码"
          :error-info="errorInfo"
          :value="payword"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
          v-model="payword"
          :show="showKeyboard"
          maxlength="6"
          @blur="showKeyboard = false"
          random-key-order
      />
    </div>
  </van-popup>
</div>
</template>

<script>
import {PasswordInput, NumberKeyboard,Popup} from 'vant'
import {mapState} from 'vuex';
import ShopCard from "@/components/shopCard";

export default {
  name: "submitOrders",
  components:{
    ShopCard,
    [Popup.name]:Popup,
    [PasswordInput.name]:PasswordInput,
    [NumberKeyboard.name]:NumberKeyboard,
  },
  data(){
    return {
      show:false,//控制弹出层显示
      passwordShow:false,//控制密码输入框
      address:{},//收货地址
      shops:[],//保存结算商品信息
      payKind:'',//支付方式
      payword: '',//支付密码
      errorInfo:'',//密码错误提示
      showKeyboard: true,//是否显示密码弹出层
      shopsTotalPrice:0.00,//保存待结算商品所有价格
    }
  },
  computed:{
    ...mapState('buyCar',["checkedShops",'totalPrice','buyShop']),//获取结算订单数据
    ...mapState('orders',['rePayOrder']),//获取从订单展示页重新支付的订单数据
    length(){
      return Object.keys(this.rePayOrder).length;//用于保存vuex中重新支付订单数据key的长度，用于判断是否存在数据
    }
  },
  watch:{
    //监视密码输入框value值变化，当value值长度为6时发送请求验证密码
    payword(newVal){
      this.errorInfo = '';//当输入框值变化时清空错误提示
      if(newVal.length === 6){
        //发送请求验证支付密码
        this.checkPayword();
      }
    }
  },
  methods:{
    goBack(){
      //当从商品详情页进入本页面时，点击导航栏时跳转回商品详情页，并携带当前商品的id
      if(this.buyShop.length !== 0)  this.$router.replace(`/shopInfo/${this.shops[0].shopId}`);
      //当从购物车进入本页面时，点击导航栏时跳转到购物车
      else if(this.checkedShops.length !== 0) this.$router.replace({name:'buyCar'});//点击返回购物车
      //当从订单待支付页面进入本页面，点击返回订单待支付页面,携带参数index,待支付的索引
      else  this.$router.replace({name:'myOrders',params:{index:1}});//点击返回待支付页面
    },

    //选择、编辑收货地址
    checkAddress(){
      //跳转到我的地址页面  传参，用来区分操作
      this.$router.push({name:'myAddress',params:{type:"check"}});
    },

    //提交订单  显示弹窗
    submitOrders(){
      //判断当前用户是否有收货地址，如果没有就不弹出密码框，并提示先添加收货地址
      if(!Object.keys(this.address).length) return this.$toast.fail('请先添加收货地址');
      this.show = true
    },

    //验证支付密码
    checkPayword(){

      this.$axios.post(
          'user/checkPayword',
          {payword:this.payword}
      ).then(res=>{
        if (!res.data.code){
          //密码正确  隐藏密码输入框
          this.passwordShow = false;
          this.payword = '';//清空输入框
          //支付动画  payToast为当前Toast实例 后续通过Toast的clear方法清除该实例，达到停止动画效果
          let payToast = this.$toast.loading({
            duration: 0, // 持续展示 toast
            message: '支付中...',
            forbidClick: true,
          });
          //发送请求提交订单数据
          this.axiosForOrders('待发货',this.payKind,'支付成功',payToast);
        }else{
          this.$toast('支付密码错误')
          this.errorInfo = res.data.msg;
        }
      })
    },

    //整合传递到后台的数据  传参订单种类、支付方式
    expressData(orderKind,payKind){
      //获取结算页的商品数据
      let shops = this.shops;
      //收货人姓名
      let name = this.address.name;
      //收货人详细地址
      let orderAddress = this.address.address;
      //详细地址
      let addressDetail = this.address.addressDetail;
      //收货人电话
      let tel = this.address.tel;
      //下单时间  时间戳
      let orderTime = +new Date();
      //订单基本数据整合
      let beginData = {name,orderAddress,addressDetail,tel,orderKind,orderTime,payKind}
      //订单所有数据整合 通过遍历提交的每一项商品，将订单基本信息合并在其中,并将处理结果返回出去
      return  shops.map(val => {
        if(!val.userName) val = {userName:this.address.userName,...val};
        delete val['id']; //删除不需要的属性id
        //这里将beginData放在最后合并，是为了覆盖前面shops中重复的值（只有重新支付时才会产生重复值)
        return {orderNumber:orderTime+val.shopId,totalPrice:(val.price*val.num).toFixed(2),...val,...beginData}
      })
    },

    //提交订单axios封装函数  异步处理,只有当重新支付时才需要先删除原订单，再提交订单
    //toast是传过来的Toast实例
   async axiosForOrders(orderKind,payKind,msg,toast){
      //保存结果，初始值为真，
      let result = true;
      //判断当前是否为重新支付，因为重新支付需要先删除原订单数据，根据promise返回的结果对result进行赋值
     if(this.length) result = await this.deleteOrder();
      //只有为真时才能提交订单，默认result为真，只有重新支付时才看订单删除返回的结果
      if(result){
        //发送请求 提交订单
        this.$axios.post(
            '/user/submitOrders',
            this.expressData(orderKind,payKind)
        ).then(res=>{
          //判断是否支付成功
          if(res.data.code){
            this.$toast.fail(res.data.msg);//提交失败提示
          }else{
            // //定时器  延缓动画结束效果
            let timeout = setTimeout(()=>{
              this.$toast.clear(toast);//成功后清除传过来的Toast实例,这样就不会展示加载中动画
              this.$toast.success(msg);//提交成功提示
              this.goBack();//跳转相应页面
              this.$store.dispatch('orders/getOrders');//触发vuex更新订单数据
              // this.$router.replace({name:'buyCar'});//跳转购物车页面
              clearTimeout(timeout); //清除定时器
            },1000)
          }
        }).catch(()=>{this.$toast.fail('服务器繁忙')})
      }else{
        this.$toast('支付失败!原订单已删除！')
      }
    },

    //删除订单  在重新支付的时候需要先删除订单再提交订单
    deleteOrder(){
    return this.$axios.post(
          'user/deleteOrder',
          {id:this.shops[0].id}
      ).then(res=>{
        if(!res.data.code){
          this.clearRePayInfo();//清空vuex重新支付订单信息
          return true;//成功返回true
        }else{
          return false;//失败返回false
        }
      }).catch(()=>this.$toast('服务器繁忙'));
    },

    //支付选项点击事件，通过event对象获取点击项的文本内容
    payFor(event){
      this.show = false;//隐藏支付方式框
      this.passwordShow = true;//显示密码输入框
      this.payKind = event.target.innerText;//将点击的支付方式保存到变量
    },

    //点击密码框遮罩层取消支付处理函数
    cancelPay(){
      //发送请求，将本次结算的所有商品列为待支付，且跳转我的界面(replace)
      let cancalPay = this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '正在取消支付...',
        forbidClick: true,
      });
      //判断当前是否为订单重新支付清况，如果是则清空vuex重新支付订单数据，不发送请求
      if(this.length){
        let time = setTimeout(()=>{
          this.goBack();//跳转页面
          this.clearRePayInfo(cancalPay);//结束动画、清除vuex重新支付订单数据
          clearTimeout(time);//清除定时器
        },1000)

        return //结束
      }
      //提交待支付订单信息
      this.axiosForOrders('待支付','未支付','已取消支付',cancalPay);
    },

    //清空vuex中重新支付订单数据
    clearRePayInfo(cancalPay){
      this.$toast.clear(cancalPay);//清除动画
    },

    //获取正确商品数据
    getRightInfo(){
      //判断vuex单个商品结算模块是否有数据，判断路由是否传参,若没有就使用计算属性内购物车已选中商品数据
      if(this.buyShop.length){
        this.shops = this.buyShop;
        this.shopsTotalPrice = (this.shops[0].price)*100;
      } else{
        this.shops = this.checkedShops;
        this.shopsTotalPrice = this.totalPrice;
      }
    },

    //获取合适地址
    getRightAddres(){
      //当路由参数address存在，则赋值给本地address变量，否则发请求获取
      if(this.$route.params.address) return this.address = this.$route.params.address;
      //发送请求获取默认地址
      this.$axios.get(
          'user/myAddress',
      ).then(res=>{
        if (!res.data.code){
          //将服务器返回的地址数据保存  解构赋值
          return [this.address] = res.data.results.filter(val=>val.isDefault === 1); //返回的数据中默认地址交给address
        }
        this.$toast(res.data.msg); //失败提示
      }).catch(()=>{this.$toast('服务器繁忙')});
    }
  },

  //路由生命周期
  beforeRouteLeave(to,from,next){
    //假如是从商品结算页进入本页面时，无论是否支付，离开当前页面返回商品详情页，都清空vuex中单个商品结算的商品数据
    if (to.name === 'shopInfo')  this.$store.commit('buyCar/GetBuyShopInfo',[]);
    //假如是从我的订单页面进入本页面时，无论是否支付，离开当前页面返回订单详情页，都清空vuex中重新支付的商品数据
    if(to.name === 'myOrders' || to.name === 'orderInfo')   this.$store.commit('orders/rePayOrder',{});
    next();
  },

  mounted() {
    //用户可以从商品详情页、购物车页面、订单详情页进入该页面，所以要对数据进行三层验证，判断用户从哪个页面进入
    //判断vuex订单模块重新支付订单是否有数据，如果有数据表明是重新支付的订单，将使用其数据,否则进行下一阶段判断
    let rePayOrder = this.rePayOrder;  //将重新支付订单信息保存到变量
    if(this.length){
      this.shops = [rePayOrder]; //将订单信息保存到本地
      this.shopsTotalPrice = rePayOrder.totalPrice*100; //将总价保存到本地
      //当路由参数address存在，则赋值给本地address变量，否则使用vuex中重新支付模块的地址数据
      //如果当路由传参中的adress没数据时，表明用户没有去编辑地址，所以任然使用原地址
      if(this.$route.params.address) return this.address = this.$route.params.address;
      //将需要用到的属性赋值给address
      this.address = {tel:rePayOrder.tel,name:rePayOrder.name,addressDetail:rePayOrder.addressDetail,address:rePayOrder.orderAddress};
    }else{
      this.getRightInfo();//判断vuex单个商品结算模块是否有数据，判断路由是否传参,若没有就使用计算属性内购物车已选中商品数据
      this.getRightAddres();//当路由参数address存在，则赋值给本地address变量，否则发请求获取
    }

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