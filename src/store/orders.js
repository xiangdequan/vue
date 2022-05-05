//订单中心
import axios from "@/uitls/axios";
import {Toast} from "vant";
export default {
    namespaced:true,//开启命名空间
    actions:{
        getOrders(context){
            axios
                .get('user/getOrders')
                .then(res=>{
                    //请求到数据后，触发GetOrders方法修改vuex数据
                    if(!res.data.code) return context.commit('GetOrders',res.data.results);
                    //失败后将数据初始化不做操作
                    if(res.data.code){
                        context.commit('GetOrders',[]);
                    }
                }).catch(()=>{Toast('请求超时')});
        }
    },
    mutations:{
        //获取所有订单
        GetOrders(state,val){
            //修改vuex中订单数据，orders
            state.orders = val;
        },
        //重新支付的订单数据
        rePayOrder(state,val){
            state.rePayOrder = val;//将传递的值储存下来
        },
        //点击的订单信息
        orderInfo(state,val){
            state.orderInfo = val; //将传递的数据保存
        }
    },
    state:{
        orders:[],//保存所有订单
        rePayOrder:{},//用于保存重新支付的订单数据
        orderInfo:{},//用于保存点击项的订单信息
    }
}