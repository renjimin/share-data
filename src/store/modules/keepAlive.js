export default {
  state: {
    includeCache: []
  },
  mutations: {
    add_include_cache(state, routeName) {
      if (state.includeCache.findIndex(item => item === routeName) == -1) {
        state.includeCache.push(routeName);
      }
    },
    remove_include_cache(state, routeName) {
      let index = state.includeCache.findIndex(item => item === routeName)
      state.includeCache.splice(index, 1);
    },
    clear_include_cache(state) {
      state.includeCache = []
    }
  }
}