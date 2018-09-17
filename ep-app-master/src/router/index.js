import VueRouter from 'vue-router'
Vue.use(VueRouter);
// 登录
import loginView from '../page/auth/login/login.vue'
// 注册
import registerView from '../page/auth/register/register.vue'
// 首页
import homeView from '../page/home/index.vue'
// 车位管理 首页
import parkListView from '../page/manage/index/index.vue'
// 车位管理 添加
import parkAddView from '../page/manage/add/index.vue'

export default new VueRouter({
  routes: [
    { path: '/login', component: loginView }, // 登录页面
    { path: '/register', component: registerView }, // 注册页面
    { path: '/home', component: homeView }, // 首页页面
    { path: '/manage-index', component: parkListView }, // 车位管理 首页
    { path: '/manage-add', component: parkAddView }, // 车位管理 添加
  ]
})