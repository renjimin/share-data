import { getUserRoleInfo_api } from "_api/user"
const agentType = [
  {
    value: 4,
    label: '超级管理员'
  },
  {
    value: 3,
    label: '管理员'
  },
  {
    value: 2,
    label: '业务人员'
  },
  {
    value: 1,
    label: '游客'
  }
]

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token'),      // token
    roles: [],              // 权限
    userInput: {},          // 登录表单
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    agentTypeList: JSON.parse(localStorage.getItem('agentTypeList')) || [],
  },
  mutations: {
    // 设置token
    SET_TOKEN(state, dataStr) {
      state.token = dataStr
    },
    // 设置路由
    SET_ROLES(state, dataArr) {
      state.roles = dataArr
    },
    // 设置用户信息
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    // 设置用户权限类型列表
    SET_AGENT_TYPE_LIST(state, list) {
      state.agentTypeList = list;
    },
    // 登录表单
    SET_USER_INPUT(state, dataObj) {
      state.userInput = dataObj
    }
  },
  actions: {
    // 登录保存touken
    loginAct({ commit, dispatch }, userInfo) {
      return new Promise(async (resolve, reject) => {
        const { token, userName } = userInfo;
        localStorage.setItem('token', token);
        commit('SET_TOKEN', token);
        let roleInfo = await getUserRoleInfo_api();
        if (roleInfo.salemanVO) {
          if (roleInfo.salemanVO.type === 1) {
            localStorage.setItem('token', '');
            commit('SET_TOKEN', '');
            return reject({
              type: roleInfo.salemanVO.type,
              errMsg: '你不属于管理员'
            })
          }
          roleInfo.salemanVO.user_name = userName;
          await dispatch('setUserInfoAct', roleInfo.salemanVO);
        }
        resolve();
      })
    },
    // 用户信息
    setUserInfoAct({ commit }, salemanVO) {
      return new Promise(resolve => {
        // salemanVO.type = 2
        localStorage.setItem('userInfo', JSON.stringify(salemanVO));
        commit('SET_USER_INFO', salemanVO);
        let agentTypeList = agentType.filter(item => item.value < salemanVO.type)
        localStorage.setItem('agentTypeList', JSON.stringify(agentTypeList));
        commit('SET_AGENT_TYPE_LIST', agentTypeList);
        resolve();
      })
    },
    // 退出登录
    logoutAct({ commit, dispatch }) {
      return new Promise(resolve => {
        // localStorage.removeItem('token');
        localStorage.clear();
        commit('SET_TOKEN', '');
        commit('SET_USER_INFO', {});
        commit('SET_AGENT_TYPE_LIST', []);
        // 调用其他的模块
        setTimeout(() => {
          dispatch('delAllAct', [], { root: true });
        }, 300)
        resolve()
      })
    }
  }

}