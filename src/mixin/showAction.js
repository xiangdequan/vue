//用于控制首页、分类页加载动画，当数据刷新出来后隐藏
import {Toast} from "vant";

export default {
    data(){
        return {
            isToast:'',
        }
    },
    watch:{
        allShops:{
            deep:true,
            handler(newVal){
                if (newVal.length) Toast.clear(this.isToast);
            }
        }
    },
    mounted() {
        if(!this.allShops.length){
            this.isToast = Toast.loading({
                duration: 0, // 持续展示 toast
                message: '加载中...',
                forbidClick: true,
            });
        }
    }
}