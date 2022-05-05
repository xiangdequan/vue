//购物车数据
//导入axios配置对象
import axios from '../uitls/axios';
import {Toast} from "vant";
export default {
    namespaced:true,
    actions:{
        //获取购物车数据
        getBuyCarShop(context){
            //获取购物车商品
            axios.get(
                'user/selectShops',
            ).then(res=>{
                if(!res.data.code) return context.commit('GetBuyCarShop',res.data.results); //请求成功后，将返回的数据存在本地变量
                if(res.data.code){
                    context.commit('GetBuyCarShop',[]);//失败了就提示 并初始化数据
                }
            }).catch(()=>{Toast('请求超时')});
        }
    },
    mutations:{
        GetBuyCarShop(state,val){
            state.buyCarShop = val; //修改购物车商品数据
            state.shopsNum = val.length;//修改购物车商品数据条数
        },
        //获取已经选中的购物车商品
        GetCheckedShops(state,val){
            //修改数据
            state.checkedShops = val;
        },
        //获取已选中商品总价
        GetTotalPrice(state,val){
            //修改数据
            state.totalPrice = val;
        },
        //修改商品详情页点击结算时的商品数据
        GetBuyShopInfo(state,val){
            //修改数据  当结算成功或者退出结算时，将该数据改成空数组，当点击了某一个商品进行结算时，改变量保存该商品数据
            state.buyShop = val;
        }
    },
    state:{
        buyCarShop:[],//用于保存所有购物车数据
        shopsNum:0, //用于保存购物车数据条数
        checkedShops:[],//用于保存已选中的购物车商品
        buyShop:[],//保商品详情页点击结算时的商品数据
        totalPrice:0,//用于保存已选中商品总价
    }
}
