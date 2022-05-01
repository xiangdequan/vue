//用户信息修改混合

//导入axios配置对象
import axios from '../uitls/axios';
import {Toast} from "vant";

const updateInfo = {
    methods:{
        //清空data中的数据
        clearData(){
            //循环遍历data每一项
            for(let key in this.$data){
                //判断key的数据类型是否为数组或者字符串，按照不同情况进行处理
                if((typeof this.$data[key]) == 'object'){
                    //因为类型检测中，数组和对象都会被判断为object,但是在这几个组件中我们所用到的数据没有对象类型
                    //蓑衣当类型检测为object时，我们赋值为空数组
                    this.$data[key] = [];
                }else{
                    //这里不需要判断了，因为在这几个组件中我们只用到了字符串类型和数组类型数据格式
                    this.$data[key] = '';
                }
            }
        },
        //修改信息
        postAxios(url,data){
            //发送axios
            axios.post(
                'user/'+url,
                data
            )
                .then(res=>{
                    this.clearData();
                    //判断是否成功
                    if(!res.data.code) {
                        //根据oldPassword值判断哪些操作需要跳转
                        if(this.oldPassword !== undefined) this.$router.replace('/login');
                        //提示
                        Toast(res.data.msg);
                        //判断是否是token问题导致失败
                    }else if(res.data.code === 2){
                        //提示
                        Toast('登陆过期,请重新登录!');
                        //跳转登录
                        this.$router.replace('/login');
                    }else{
                        //表示操作失败
                        this.isOk = false;
                        //不是失败token问题导致
                        Toast(res.data.msg);
                    }
                }).catch(()=>Toast('服务器繁忙！'))
        }
    }
}

export default updateInfo;