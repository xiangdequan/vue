//用于控制首页、分类页加载动画，当数据刷新出来后隐藏

export default {
    data() {
        return {
            isToast: '',//用于存储Toast实例对象
            isDeep:{deep:true},//
        }
    },
    methods:{
        //用于判断是否要展示加载动画,传参val为需要判断的值的长度
        showToast(val){
            //如果当前val的值为0,就表示需要展示加载动画
            if(!val){
                this.isToast = this.$toast.loading({
                    duration: 0, // 持续展示 toast
                    message: '加载中...',
                    forbidClick: true,
                });
            }
        },
        //组件实例方法watch方法中的处理回调,用于清除Toast实例，达到清除加载动画效果，返回一个配置对象,用于组件在watch中使用
        watchCallback(newVal){
            if (newVal.length) this.$toast.clear(this.isToast);
        }
    }
}