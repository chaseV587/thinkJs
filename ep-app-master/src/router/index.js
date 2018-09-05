import VueRouter from 'vue-router'
Vue.use(VueRouter);
// 登录
import loginView from '../page/auth/login/login.vue'
// 注册
import registerView from '../page/auth/register/register.vue'

export default new VueRouter({
  routes: [
    { path: '/login', component: loginView }, // 登录页面
    { path: '/register', component: registerView }, // 登录页面
  ]
})