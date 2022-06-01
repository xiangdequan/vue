<template>
<div id="wallet">
  <van-nav-bar
      title="闪购钱包"
      left-text="返回"
      left-arrow
      @click-left="goBack"
  />
  <!-- 余额展示 -->
  <div class="balance">
    <p><van-icon name="balance-o" size="25px"/>账户余额</p>
    <p>￥<span>999.97</span></p>
  </div>
  <ul class="bar">
    <li>
      <span><van-icon name="paid" />账户余额充值</span>
      <van-icon name="arrow" />
    </li>
    <li>
      <span><van-icon name="closed-eye"/>设置支付密码</span>
      <van-icon name="arrow" />
    </li>
    <li>
      <span><van-icon name="edit" />修改支付密码</span>
      <van-icon name="arrow" />
    </li>
    <li>
      <span><van-icon name="description" />近期交易记录</span>
      <van-icon name="arrow" />
    </li>
    <li>
      <span><van-icon name="points" />闪购积分明细</span>
      <van-icon name="arrow" />
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: "wallet",
  data(){
    return {

    }
  },
  methods:{
    //返回上一个页面
    goBack(){
      this.$router.replace({name:'mine'});
    }
  }
}
</script>

<style lang="less" scoped>
#wallet{
  height: 100%;
  background-color: white;

  //导航栏
  .van-nav-bar{
    height: 6%;
  }

  //混合 flex
  .flex(){
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  //钱包余额
  .balance{
    height: 16%;
    width: 96%;
    color: white;
    margin: 5% auto 2%;
    padding: 0 4%;
    box-sizing: border-box;
    background-color: #5656f5;
    border-radius: 20px;
    .flex();


    //字体  账户余额
    p:first-child{
      font-size: 18px;
      .flex();
    }

    //值 账户余额
    p:last-child{

      span{
        font-size: 38px;
      }
    }
  }

  //钱包服务
  .bar{
    width: 96%;
    height: 30%;
    margin: 10% auto 2%;
    box-sizing: border-box;
    padding: 2% 2.5%;
    list-style: none;
    background-color: white;
    border-radius: 20px;

    //li 每一项
    li{
      height: 18%;
      width: 100%;
      font-size: 16px;
      .flex();

      span{
        display: inline-block;

        .van-icon{
          margin-right: 5px;
        }
      }
    }
  }
}
</style>