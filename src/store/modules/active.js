export default {
  state: {
    activeId: '',
    rowData: {}                 // 选中的表格数据
  },
  mutations: {
    // 设置选中的数据
    SET_ROW_DATA(state, dataObj) {
      state.rowData = dataObj
    },
    SET_ACTIVE_ID(state, dataNum) {
      state.activeId = dataNum
    }
  }
}