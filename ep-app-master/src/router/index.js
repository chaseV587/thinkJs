import VueRouter from 'vue-router'
// 首页
import loginView from '../page/auth/login/login.vue'
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: '/login', component: loginView }, // 报错页面
  ]
})