//导入vuex
import Vuex from "vuex";
//导入vue
import vue from "vue";
//导入商品信息模块
import allShops from "@/store/shops";
/*//导入用户信息模块
import userInfo from "@/store/userInfo";*/
//注册vuex
vue.use(Vuex);


//导出vuex对象   如果有多个模块，添加module项，将模块放入该对象内
export default new Vuex.Store({
    modules:{
        allShops, //商品数据
        // userInfo  //用户信息
    }
})