import VueRouter from 'vue-router'
Vue.use(VueRouter);
// 首页
import loginView from '../page/auth/login/login.vue'

export default new VueRouter({
  routes: [
    { path: '/login', component: loginView }, // 报错页面
  ]
})