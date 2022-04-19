<template>
<div id="mine">
<!-- 用户信息展示区 -->
  <div class="userInfo">
    <!--  用户头像  -->
    <img :src="userInfo.userImg"/>
    <!--  用户信息  -->
    <ul>
      <li>昵称: <span>{{userInfo.info}}</span></li>
      <li>账号: <span>{{userInfo.userName}}</span></li>
    </ul>
    <!--  设置图标  -->
    <van-icon name="setting-o" size="28px" @click="updataInfo"/>
  </div>
<!-- 订单管理选项 :border="false"-->
  <div class="orders">
    <p>订单管理<span>查看全部 ></span></p>
    <van-grid :column-num="4" >
      <van-grid-item icon="pending-payment" text="待付款" badge="2" to=""/>
      <van-grid-item icon="clock-o" text="待发货" badge="0" to=""/>
      <van-grid-item icon="logistics" text="待收货" badge="5" to=""/>
      <van-grid-item icon="good-job-o" text="待评价" badge="12" to=""/>
    </van-grid>
  </div>
<!-- 闪购钱包 -->
  <div class="pcoket">
    <van-icon name="paid" />闪购钱包<van-icon name="arrow" />
  </div>
<!--其他设置  -->
  <van-collapse v-model="activeName" accordion>
    <!--  地址管理  -->
    <van-collapse-item title="地址管理" icon="location-o" name="1" size="large">
      <span @click="goAddress" >
        <van-icon name="browsing-history-o"/>查看收货地址
      </span>
      <span @click="goAddress">
        <van-icon name="add-o" />添加收货地址
      </span>
    </van-collapse-item>
    <!--  收藏管理  -->
    <van-collapse-item title="收藏管理" icon="goods-collect-o" name="2" size="large">
      <span @click="goAddress">
        <van-icon name="eye-o" />查看收藏
      </span>
    </van-collapse-item>
  <!--  联系我们  -->
    <van-collapse-item icon="service-o" title="客户服务" name="3" size="large">
      <span @click="goAddress">
        <van-icon name="phone-o" />官方热线
      </span>
      <span @click="goAddress">
        <van-icon name="comment-circle-o" />在线客服
      </span>
    </van-collapse-item>
  </van-collapse>
</div>
</template>

<script>
//导入cant
import { Icon,Grid,GridItem,Collapse, CollapseItem } from 'vant';
import axios from "axios";

export default {
  name: "mine",
  components:{
    [Icon.name]:Icon,
    [Grid.name]:Grid,
    [GridItem.name]:GridItem,
    [Collapse.name]:Collapse,
    [CollapseItem.name]:CollapseItem
  },
  data(){
    return {
      activeName:'0',//点击的标题名称
      badge:0, //右上角徽标
      userInfo:{}//用户信息
    }
  },
  methods:{
    //点击跳转页面
    goAddress(e){
      //保存点击项文本内容
      let title = e.target.innerText;
      //保存路由对象
      let router = this.$router;
      //根据title匹配相应跳转
      switch (title){
        case '添加收货地址' :
          router.push('/addAddress');
          break;
        case '查看收货地址':
          router.push('/myAddress');
          break;
        case "查看收藏" :
          router.push('/myCollect');
          break;
        case '官方热线':
          alert("客服电话:111111");
          break;
        case "在线客服" :
          alert("开发中");
          break;
        default: alert('错误!');
      }
    },
    //点击设置跳转修改用户信息页面
    updataInfo(){
      //跳转页面
      this.$router.push(`/userInfo`);
    }
  },
  //绑定前获取用户信息
  beforeMount() {
    //获取本地储存中的token
    let token = window.localStorage.getItem('token');
    //发送请求验证token
    axios.get(
        'user/info',
        {
          //配置请求头Authorization字段，验证token
          headers:{
            'Authorization':token
          }
        }).then(res=>{
      if(!res.data.code){
        //验证成功后，返回的code值为0
        //存储服务器查询后的最新信息到userInfo
       this.userInfo = res.data.msg;
      }
    }).catch(err=>console.log(err.message));
  }
}
</script>

<style lang="less" scoped>
#mine{
  height: 100%;
  overflow: hidden;

  //用户信息展示区
  .userInfo{
    height: 15%;
    width: 96%;
    margin: 1% auto;
    padding: 0 3% 0 1%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #F8F9FA;

    //头像
    img{
      //border: 1px solid blue;
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    //用户信息
    ul{
      width: 60%;
      height: 60%;
      //border: 1px solid green;

      li{
        width: 100%;
        height: 45%;
        line-height: 33px;
        letter-spacing: 2px;
        font-size: 17px;

        //border: 1px solid black;
        span{
          display: inline-block;
          margin-left: 2%;
        }
      }

      //设置图标

    }
  }

  //订单管理区
  .orders{
    width: 96%;
    margin: 4% auto 0;
    height: 19%;

    //订单管理标题
    p{
      height: 10%;
      padding: 1.5% 1.2%;
      display: flex;
      font-size: 15px;
      box-sizing: border-box;
      justify-content: space-between;

      //查看全部
      span{
        font-size: 13px;
        display: inline-block;
      }
    }
  }

  //闪购钱包
  .pcoket{
    width: 98%;
    height: 6%;
    margin-bottom: 6%;
    padding-left: 4%;
    display: flex;
    align-items: center;
    border: 1px solid #F5F6F7;

    //第一个图标
    .van-icon:first-child{
      font-size: 17px;
      margin-right: 2%;
    }

    //第二个图标
    .van-icon:last-child{
      margin-left: 67%;
      font-size: 18px;
      color: #969799;
    }
  }

  //其他设置
  .van-collapse-item{
    letter-spacing: 4px;

    span{
      height: 30px;
      padding-left: 10%;
      padding-top: 6px;
      box-sizing: border-box;
      color: black;
      display: block;

      //图标
      .van-icon{
        font-size: 15px;
      }
    }
  }
}
</style>