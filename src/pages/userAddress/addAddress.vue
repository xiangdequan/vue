<template>
<div id="addAdress">
  <topBar :title="title"/>
<!-- address-info收货人信息默认值 -->
  <van-address-edit
      :address-info="addressInfo"
      :area-list="areaList"
      show-postal
      show-set-default
      :show-delete="isShowDelete"
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="deleteAddress"
      @change-default="changeDefault"
  />
</div>
</template>

<script>
import {AddressEdit, Toast} from 'vant';
import { areaList } from '@vant/area-data';
//导入顶部导航组件
import topBar from "@/pages/userAddress/topBar";
import axios from "axios";

export default {
  name: "addAdress",
  components:{
    topBar,
    [Toast.name]:Toast,
    [AddressEdit.name]:AddressEdit
  },
  data(){
    return {
      areaList, //省市地址
      title:'', // 标题
      times:0, //用于保存点击次数，每次点击设置默认收货地址次数都加一
      addressInfo: {},//表单默认值,用于编辑时填充
      isDefault:false, //用于判断是否设为默认地址
      isShowDelete: false,//用于判断是否显示delete按钮
    }
  },
  methods:{
    //是否选中为默认地址  默认传参val值为boolean类型
    changeDefault(val){
      this.isDefault = val; //将设置的布尔结果赋值给this,isDefault
      this.times += 1; //次数自增
    },

    //异步提交  先设为默认地址，再
    onSave(content) {
        //当状态为修改、并且没有使用过设置默认地址滑块时，将初始数据的isDefault值赋给this.isDefault
        if(this.times === 0 && this.isShowDelete) this.isDefault = this.addressInfo.isDefault;
        //获取本地存储token
        let token = window.localStorage.getItem('token');
        //添加/修改数据
        this.addAddress(content,token);
    },

    addAddress(content,token){
      //保存请求地址  默认为新增收货地址请求路径
      let questUrl = 'addAddress';
      //当this.isShoeDelete为true时，表示当前是修改状态，将请求路径改为修改状态
      if(this.isShowDelete) questUrl = 'updateAddress';
      //添加地址 直接新增
      // if(this.isDefault) this.isDefault = 1;
      let name = content.name; //收货人姓名
      let tel = content.tel; //手机号码
      let areaCode = content.areaCode; //地区编码
      let addressDetail = content.addressDetail; //详细地址部分(不含省市区)
      let address = content.province + content.city + content.county + content.addressDetail;//详细地址  全部
      let postalCode = content.postalCode; //邮政编码
      let isDefault = this.isDefault;  //是否默认选中为默认地址
      //定义data保存提交的数据，默认为添加收货地址数据
      let data = {name,tel,areaCode,addressDetail,address,postalCode,isDefault};
      //当当前状态为修改时，新增id属性，从传递的该项数据中的id属性匹配数据库中的数据，以做到精准修改
      if(this.isShowDelete) data = {id: this.addressInfo.id,...data};
      //axios
      axios.post(
          'user/'+questUrl,
          data,
          {
            headers:{
              'Authorization':token
            }
          }
      ).then(res=>{
        if (!res.data.code){
          Toast(res.data.msg)//成功提示
        }else{
          Toast(res.data.msg)
        }
      })
    },

    deleteAddress(){
      //删除收货地址  因为删除按钮只出现在修改状态下，所以可以通过修改项的id属性匹配相应的数据，然后删除
      axios.post(
          'user/deleteAddress',
          {id:this.addressInfo.id},
          {
            headers:{
              'Authorization':window.localStorage.getItem('token')
            }
          }
      ).then(res=>{
        if(!res.data.code){
          this.$router.replace('/myAddress')
          return Toast(res.data.msg);//成功提示
        }
        Toast(res.data.msg); //失败提示
      }).catch(err=>{console.log(err.message)});
    }
  },
  mounted() {
    //如果addressInfo的值不为undefined，就将值赋给this.addressInfo,表示修改,为undefined表示新增
    let addressInfo = this.$route.query.addressInfo;
    this.addressInfo = addressInfo;
    //根据默认填充的addressInfo值判断当前是修改收货地址还是添加收货地址
    //添加收货地址: 隐藏修改按钮，修改标题
    //修改收货地址: 显示收货地址 修改标题
    if(addressInfo === undefined){
      this.title = '添加收货地址';
      this.isShowDelete = false;
    }else{
      this.title = '修改收货地址';
      this.isShowDelete = true;
    }
  }
}
</script>

<style scoped>

</style>