//订单中心
import axios from "@/uitls/axios";

export default {
    namespaced:true,//开启命名空间
    actions:{
        getOrders(context){
            axios
                .get('user/getOrders')
                .then(res=>{
                    //请求到数据后，触发GetOrders方法修改vuex数据
                    if(!res.data.code) return context.commit('GetOrders',res.data.results);
                    //未获取到数据不做操作
                })
        }
    },
    mutations:{
        //获取所有订单
        GetOrders(state,val){
            //修改vuex中订单数据，orders
            state.orders = val;
        }
    },
    state:{
        orders:[],//保存所有订单
    }
}