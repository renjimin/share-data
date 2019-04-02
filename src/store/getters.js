export default {
  token: state => state.user.token,
  role: state => state.user.role,
  userInfo: state => state.user.userInfo,
  agentTypeList: state => state.user.agentTypeList,
  globalLoading: state => state.app.globalLoading,
  loadingMessage: state => state.app.loadingMessage,
  isAni: state => state.app.isAni,
  sideStatus: state => state.app.sideStatus,
  tagsList: state => state.tagsNav.tagsList,
}