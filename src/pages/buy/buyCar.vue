<template>
<div id="buyCar">
<!-- 标题 -->
  <van-nav-bar
      title="购物车"
      left-text="全部"
      right-text="清空"
      @click-right="clearAll"
  />
  <!--  只有未找到相关结果才显示-->
  <van-empty image="search" description="购物车为空" v-if="!buyCarShop.length"/>
<!-- 商品卡片展示区  当没有商品时隐藏-->
  <div class="shopCard" v-if="buyCarShop.length">
  <!--   复选框组，result存储复选框中已选中的商品数据    -->
    <van-checkbox-group v-model="result" ref="checkboxGroup">
      <!--  商品卡片  遍历购物车商品每一项，将对应数据填充-->
      <van-swipe-cell v-for="(item) in buyCarShop" :key="item.id">
        <!--    复选框，name绑定着对应商品的数据    -->
        <van-checkbox :name="item" checked-color="#ee0a24"></van-checkbox>
        <!--    单个商品卡片    -->
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
    </van-checkbox-group>
  </div>
<!--当没有商品时隐藏  -->
  <van-submit-bar :price="totalPrice" button-text="去结算" v-if="buyCarShop.length" @submit="submitOrders">
<!-- 当为选中状态时，文字为取消全选，反之为全选   -->
    <van-checkbox v-model="checked" checked-color="#ee0a24">{{checked ? '取消全选' : '全选'}}</van-checkbox>
  </van-submit-bar>
</div>
</template>

<script>
import {SwipeCell,CheckboxGroup,Empty,SubmitBar,Checkbox,Stepper,Card,Button,Toast,Tag,NavBar,Dialog} from 'vant'
//导入axios配置对象
import axios from '../../uitls/axios';
import {mapState,mapActions} from "vuex";

export default {
  name: "buy",
  components:{
    [Tag.name]:Tag,
    [Empty.name]:Empty,
    [Button.name]:Button,
    [SubmitBar.name]:SubmitBar,
    [Checkbox.name]:Checkbox,
    [Dialog.name]:Dialog,
    [NavBar.name]:NavBar,
    [CheckboxGroup.name]:CheckboxGroup,
    [SwipeCell.name]:SwipeCell,
    [Stepper.name]:Stepper,
    [Toast.name]:Toast,
    [Card.name]:Card
  },
  data(){
    return {
      result:[]
    }
  },
  computed:{
    ...mapState('buyCar',['buyCarShop']),//用于存储购物车商品
    //全选框选中状态
    checked:{
      // 已当选中的商品数量等于购物车所有商品数量时，返回true(即全选)，否则返回false(即取消全选)
      get(){
        return this.result.length === this.buyCarShop.length;
      },
      //当修改的新值为true则选中所有购物车商品，否则全都不选
      set(newVal){
        if(newVal) this.$refs.checkboxGroup.toggleAll(true);
        else this.$refs.checkboxGroup.toggleAll();
      }
    },
    //购物车已选中商品总价
    totalPrice(){
      //遍历每一项，使用reduce方法求出商品总价，因为价格单位为分，所以乘以100将单位转换为分
      return (this.result.reduce((prev,val)=>prev + val.num * val.price,0))*100
    }
  },
  watch:{
    //监视result数据变化  当选中项发送变化时更新vuex购物车模块，选中商品信息
    result:{
      deep:true,//深度监视
      immediate:true,//初始化
      handler(newVal){
        this.$store.commit('buyCar/GetCheckedShops',newVal);//将变化的新值传入，触发vuex更新
      }
    },
    //监视总价变化
    totalPrice(newVal){
      //修改vuex中购物车模块的已选商品总价
      this.$store.commit('buyCar/GetTotalPrice',newVal);
    }
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
          'user/clearAll'
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
      ).then(res=>{
        if (res.data.code) Toast('数量修改失败')
      })
    },
    //跳转商品详情页
    goInfo(shopId){
      this.$router.push(`/shopInfo/${shopId}`)
    },
    //提交订单
    submitOrders(){
      //判断用户是否选中商品
      if(!this.result.length) return Toast('您还没有选择宝贝哦!');
      //跳转订单结算页面
      this.$router.push('/submitOrders')
    }
  },
  mounted() {
    //在绑定时，触发购物车模块方法，获取数据库信息
    this.$store.dispatch('buyCar/getBuyCarShop');
    //当组件绑定时，从vuex中购物车模块获取已选中商品，赋值给result,以达到切换页面，商品选中状态不丢失的效果
    this.result = this.$store.state.buyCar.checkedShops;
  }
}
</script>

<style lang="less" scoped>
#buyCar{
  height: 100%;

  //标题栏
  .van-nav-bar{
    position: fixed;
    height: 6%;
    width: 100%;
  }

  //只有未找到相关结果才显示
  .van-empty{
    height: 100%;
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
      //单个复选框样式
      .van-checkbox{
        width: 5%;
        margin-left: 3.5%;
        transform: translateY(-220%);
        display: inline-block;
      }
      //商品卡片样式
      .van-card{
        width: 91.5%;
        background-color: white;
        display: inline-block;
      }

      //滑块删除样式
      .delete-button {
        height: 100%;
      }
    }
  }
  //结算按钮样式
  .van-submit-bar{
    position: fixed;
    height: 6%;
    top: 87%;
  }
}
</style>