//用户信息模块
import axios from "axios";

const userInfo = {
    namespaced:true,
    actions:{
      getUserIfo(context) {
          //获取本地储存中的token
          let token = window.localStorage.getItem('token');
          //发送请求验证token
          axios.get(
              'user/info',
              {
                  //配置请求头Authorization字段，验证token
                  headers:{
                      'Authorization':token
                  }
              }).then(res=>{
                  if(!res.data.code){
                      //验证成功后，返回的code值为0
                      //存储服务器解析后的token内信息到vuex的userInfo
                      context.commit('GetUserIfo',res.data.msg);
                  }else{
                      //验证失败就清除用户信息
                      context.commit('GetUserIfo',{});
                  }
          }).catch(err=>console.log(err.message));
      }
    },
    mutations:{
        //存储用户token内信息 用户名、用户昵称、用户头像
        GetUserIfo(state,val){
            state.userInfo = val;
        }
    },
    state:{
        userInfo: {} //用于储存用户信息
    }
}

//导出
export default userInfo;