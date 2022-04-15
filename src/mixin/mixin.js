//混合 用于处理商品分类
//导入mapState
import {mapState} from "vuex";

const mixin = {
    data(){
       return {
           shops:[], //用于储存符合条件的商品信息
           title:'推荐', //用于储存点击的导航栏标题
           //定义导航栏标题
           kinds:["推荐","食品","手机","水果","鞋包","男装","百货","女装","电器","医药","电脑","美妆","家纺","运动","车品","玩乐"],
       }
    },
    computed:{
        //储存所有商品数据
        ...mapState('allShops',['allShops'])
    },
    //监听title变化,每次变化都匹配相应数据
    watch:{
        title(newValue){
            //当商品为推荐时，展示所有商品
            // if(newValue === '推荐') return this.shops = this.allShops;
            //根据title值匹配商品数据
            this.shops = this.allShops.filter(val => val.kind === newValue);
        }
    },
    methods:{
        //导航栏点击事件  组件默认传参name:索引,title:文本
        searchByTitle(name) {
            //根据索引匹配标签名，从而筛选对应数据
            this.title = this.kinds[name];
        }
    },
    beforeMount() {
        //组件绑定前vuex中shps数据保存到本地shops变量中  初始化
        this.shops = this.$store.state.allShops.allShops;
    }
}

//导出混合
export default mixin;