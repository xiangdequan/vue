
//全部商品数据
import axios from "../uitls/axios";
import {Toast} from "vant";
//导出商品信息模块
export default {
    namespaced: true,
    actions:{
        //获取所有商品数据
        getAllShops(context){
            axios.get('api/getShops')
                .then(res=>{
                    context.commit('updataShops',res.data.results);
                })
                .catch(()=>{Toast('请求超时')});
        }
    },
    mutations:{
        updataShops(state,val){
            state.allShops = val;
        }
    },
    state:{
        allShops:[]//储存所有商品数据
    }
}