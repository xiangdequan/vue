
//全部商品数据
import axios from "axios";

const allShops = {
    namespaced: true,
    actions:{
        getAllShops(context){
            axios.get('/api/getShops')
                .then(res=>{
                    context.commit('updataShops',res.data.results);
                })
                .catch(err=>{
                    console.log(err.message);
                })
        }
    },
    mutations:{
        updataShops(state,val){
            state.allShops = val;
        }
    },
    state:{
        allShops:[]
    }
}

//导出商品信息模块
export default allShops;
