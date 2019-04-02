import store from '@/store'
export default {
  // 打开loading
  openLoading(message) {
    let payload = {
      message,
      loading: true
    }
    store.commit('SET_GLOBAL_LOADING', payload)
  },
  // 关闭loading
  closeLoading() {
    store.commit('SET_GLOBAL_LOADING', false)
  }
}