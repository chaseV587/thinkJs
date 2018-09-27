import App from './src/App.vue'
import router from './src/router/index.js'
import store from './src/store/index.js'
import { sync } from 'vuex-router-sync'

sync(store, router)

// App.el = '#root'
// App.router = router
// App.store = store

// export default new Vue(App)
new Vue(Vue.util.extend({ el: '#root', router, store }, App))

router.push('/login')