import VueRouter from 'vue-router'
import umsApi from 'ums-api'
import Vuex from 'vuex'
import store from '../store/index.js'
import router from '../router/index.js'
import Api from '../lib/api/index.js'
import utils from '../lib/utils/index.js'
import { sync } from 'vuex-router-sync'

sync(store, router)
Vue.mixin(Api)
Vue.mixin(utils)
export default {
  router,
  store,
  umsApi,
  methods: {
    jump (to) {
      if (this.$router) {
        this.$router.push(to)
      }
    }
    // back () {
    //   const isShow = this.$store.state.indicatorIsShow
    //   if (!isShow) {
    //     console.log('goBack-path0 = ', this.$store.state.paths[0])
    //     if (this.$store.state.paths[0] === '/'){
    //       var navigator = weex.requireModule('navigator')
    //       navigator.pop()
    //     } else {
    //       this.$store.commit('deletePaths')
    //       this.jump(this.$store.state.paths[0])
    //       this.$store.commit('deletePaths') //返回键再减一次paths
    //     }
    //   }
    // },
  }
}
