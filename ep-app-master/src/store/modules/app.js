export default {
  state: {
    isLoading: false,
    loadingText: ''
  },
  mutations: {
    setLoading (state, isShow) {
      state.isLoading = isShow
    },
    setLoadingText(state, text='') {
      state.loadingText = text
    }
  },
  actions: {
    
  }
}
