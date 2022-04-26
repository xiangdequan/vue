//购物车角标专用混合
//导入mapState
import {mapState} from "vuex";

export default {
    computed:{
        ...mapState('buyCar',['shopsNum'])//用于获取购物车商品条数，从而更新角标
    },
    filters:{
        //过滤器，当shopsNum购物车为空时，传值''，即不显示角标
        isShowBadge(shopsNum){
            return shopsNum === 0 ? '' : shopsNum;
        }
    }
}