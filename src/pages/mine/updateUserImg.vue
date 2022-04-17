<template>
  <div id="updateUserImg">
    <van-uploader :after-read="afterRead" max-count="1" v-model="fileList"/>
    <van-button round block type="info" @click="updateUserImg">修改头像</van-button>
  </div>
</template>

<script>
import {Button, Field, Toast,Uploader} from "vant";
import updateInfo from "@/mixin/updateInfo";

export default {
  name: "updateUserImg",
  components:{
    [Field.name]:Field,
    [Button.name]:Button,
    [Uploader.name]:Uploader,
    [Toast.name]:Toast()
  },
  mixins:[updateInfo], //注册混合
  data(){
    return {
      fileList:[], //文件
      file:'', //上传的文件
    }
  },
  methods:{
    //文件上传完成事件，默认参数file已转换了base64格式 通过file.content获取
    afterRead(file){
      //将读取完成的file保存的变量
      this.file = file.content;
    },
    updateUserImg(){
      //判断是否提交新头像
      if (this.file.length === 0) return Toast('请上传新头像');
      //没问题发送请求 混合内封装的方法
      this.postAxios('updateUserImg',{userImg:this.file});
      //成功后清空已选择的图片
      if(this.isOk) this.file = '';
    }
  }
}
</script>

<style scoped>
#updateUserImg{
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.van-uploader{
  margin-bottom: 2%;
}
.van-button{
  margin: 10px 0;
  width: 83%;
}
</style>