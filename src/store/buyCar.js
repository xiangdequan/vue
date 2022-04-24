//购物车数据
import axios from "axios";
import {Toast} from "vant";

export default {
    namespaced:true,
    actions:{
        //获取购物车数据
        getBuyCarShop(context){
            //获取购物车商品
            axios.get(
                'user/selectShops',
                {
                    headers:{
                        'Authorization':window.localStorage.getItem('token')
                    }
                }
            ).then(res=>{
                if(!res.data.code) return context.commit('GetBuyCarShop',res.data.results); //请求成功后，将返回的数据存在本地变量
                Toast(res.data.msg); //失败了就提示
            })
        }
    },
    mutations:{
        GetBuyCarShop(state,val){
            state.buyCarShop = val; //修改购物车商品数据
            state.shopsNum = val.length;//修改购物车商品数据条数
        }
    },
    state:{
        buyCarShop:[],//用于保存所有购物车数据
        shopsNum:0 //用于保存购物车数据条数
    }
}
