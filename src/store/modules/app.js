export default {
  state: {
    sideStatus: false,    // 是否折叠侧边栏
    globalLoading: false,   // loading 状态
    loadingMessage: '正在拼命加载中...',
    isAni: false
  },
  mutations: {
    SET_ANI(state, status) {
      state.isAni = status;
    },
    // 设置全局 loading
    SET_GLOBAL_LOADING(state, dataObj) {
      if (typeof dataObj === "object") {
        let { loading, message } = dataObj
        state.globalLoading = loading
        message && (state.loadingMessage = message)
      } else {
        state.globalLoading = dataObj
      }
    },
    // 设置侧边栏的收缩状态
    SET_SIDE_STATUS(state) {
      if (state.sideStatus) {
        sessionStorage.setItem('sideStatus', 0)
      } else {
        sessionStorage.setItem('sideStatus', 1)
      }
      state.sideStatus = !state.sideStatus
    }
  }
}