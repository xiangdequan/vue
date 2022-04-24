<template>
<div id="buyCar">
<!-- 标题 -->
  <van-nav-bar
      title="购物车"
      left-text="全选"
      right-text="清空"
      @click-right="clearAll"
  />
<!-- 商品卡片展示区 -->
  <div class="shopCard">
<!--  商品卡片  遍历每一项，将对应数据填充-->
    <van-swipe-cell v-for="(item) in buyCarShop" :key="item.id">
      <van-card
          :num="item.num"
          :price="item.price"
          :desc="item.promise"
          :title="item.font"
          class="goods-card"
          :thumb="item.img"
          @click-thumb="goInfo(item.shopId)"
      >
<!--  插槽，卡片标签      -->
        <template #tags>
          <van-tag plain type="danger">{{item.discount}}</van-tag>
        </template>
<!--   插槽，卡片按钮   点击事件传参获取当前商品id、数量 //当数量大于5时禁止增加，当商品小于1时禁止减少 -->
        <template #footer>
          <van-stepper v-model="item.num" min="1" max="5" @change="updateNum(item.num,item.shopId)" integer button-size="25px"/>
        </template>
      </van-card>
<!--  滑动删除商品   事件传参:商品的id    -->
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" @click="deleteShop(item.shopId)"/>
      </template>
    </van-swipe-cell>
  </div>
  <van-submit-bar :price="3050" button-text="提交订单" >
    <van-checkbox v-model="checked">全选</van-checkbox>
  </van-submit-bar>
</div>
</template>

<script>
import {SwipeCell,SubmitBar,Checkbox,Stepper,Card,Button,Toast,Tag,NavBar,Dialog} from 'vant'
import axios from "axios";
import {mapState,mapActions} from "vuex";

export default {
  name: "buy",
  components:{
    [Tag.name]:Tag,
    [Button.name]:Button,
    [SubmitBar.name]:SubmitBar,
    [Checkbox.name]:Checkbox,
    [Dialog.name]:Dialog,
    [NavBar.name]:NavBar,
    [SwipeCell.name]:SwipeCell,
    [Stepper.name]:Stepper,
    [Toast.name]:Toast,
    [Card.name]:Card
  },
  data(){
    return {
        checked:true
    }
  },
  computed:{
    ...mapState('buyCar',['buyCarShop'])//用于存储购物车商品
  },
  methods:{
    ...mapActions('buyCar',['getBuyCarShop']),
    //清空购物车，全部删除
    clearAll(){
      //判断当前是否有商品，如果没有商品则无需清空
      if(!this.buyCarShop.length){
        Toast('当前购物车无商品，无需清空!');
      }else{
        //弹出框
        Dialog.confirm({
          title: '警告',
          message: '此操作将清空购物车数据,无法恢复,是否继续?',
        })
            .then(() => {
              this.axiosForClear();//发送请求删除所有购物车数据
            })
            .catch(() => {
              // on cancel
            });
      }
    },
    //清空购物车请求函数
    axiosForClear(){
      //发送请求清空购物车
      axios.delete(
          'user/clearAll',
          {
            headers:{
              'Authorization':window.localStorage.getItem('token')
            }
          }
      ).then(res=>{
        if (!res.data.code){
          this.getBuyCarShop();//触发vuex中购物车模块数据更新
          Toast(res.data.msg);//成功提示
        }else{
          Toast('清空购物车失败');
        }
      }).catch(()=>{Toast('服务器繁忙')})
    },
    //删除商品  事件传参，该列商品id
    deleteShop(shopId){
      //发请求
      axios.post(
          'user/deleteShop',
          {shopId},
          {
            headers:{
              'Authorization':window.localStorage.getItem('token')
            }
          }
      ).then(res=>{
        if(!res.data.code){
          Toast('已删除');//成功删除提示
          this.getBuyCarShop();//触发vuex中购物车信息模块数据更新
        } else{
          Toast('删除失败');//删除失败提示
        }
      }).catch(()=>{Toast('服务器繁忙')})
    },
    //商品数量加减  传参商品数量、id
    updateNum(num,shopId){
      //当用户未输入时，不发送请求
      if(num==='') return;
      //发送请求·
      axios.post(
          'user/updateNum',
          {shopId,num},
          {
            headers:{
              'Authorization':window.localStorage.getItem('token')
            }
          }
      ).then(res=>{
        if (res.data.code) Toast('数量修改失败')
      })
    },
    //跳转商品详情页
    goInfo(shopId){
      this.$router.push(`/shopInfo/${shopId}`)
    }
  }
}
</script>

<style lang="less" scoped>
#buyCar{
  height: 100%;
  &::-webkit-scrollbar{
    width: 0;
    height: 0;
  }

  //标题栏
  .van-nav-bar{
    position: fixed;
    height: 6%;
    width: 100%;
  }

  //所有卡片样式
  .shopCard{
    height: 81%;
    position: relative;
    top: 6%;
    overflow-y: scroll;
    &::-webkit-scrollbar{
      width: 0;
    }

    //单个商品卡片
    .van-swipe-cell{
      //最后一个卡片样式
      &:first-child{
        margin-top: 3%;
      }

      //商品卡片样式
      .goods-card {
        margin: 0;
        background-color: white;
      }

      .delete-button {
        height: 100%;
      }
    }
  }

  .van-submit-bar{
    position: fixed;
    height: 6%;
    top: 87%;
  }
}
</style>