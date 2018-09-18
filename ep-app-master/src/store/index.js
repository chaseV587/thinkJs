import Vuex from 'vuex'

import user from './modules/user.js'
import carbarn from './modules/carbarn.js'
import app from './modules/app.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    carbarn
  }
})
