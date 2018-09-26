import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import api from './lib/api/index.js'
import { sync } from 'vuex-router-sync'

sync(store, router, api)

// export default new Vue(App)
new Vue(Vue.util.extend({ el: '#root', router, store, api }, App))

router.push('/home')