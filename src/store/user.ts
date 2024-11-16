// initial state
//定义全局状态
import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    //用户的状态信息
    loginUser: {
      userName: "未登录",
    },
  }),
  // actions 执行异步操作，并且除法mutation的更改 actions调用mutation
  actions: {
    //async异步获取
    async getLoginUser({ commit, state }, payload) {
      //todo 改成远程登陆 从远程请求获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      //登录成功将数据返回给后端 包括用户信息也存放在res的data中
      if (res.code === 0) {
        commit("updateUser", res.data);

        //没登陆就返回没登陆状态码
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  // mutations 对数据进行更新的方法 payload是传入的内容
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
