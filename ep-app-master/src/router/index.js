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
// 车位信息修改 添加
import parkUpdateView from '../page/manage/update/index.vue'

// 停车管理 立即停车
import parkFastView from '../page/park/fast/index.vue'
// 停车管理 实时车位(当天停车)
import parkTodayView from '../page/park/today/index.vue'

export default new VueRouter({
  routes: [
    { path: '/login', component: loginView }, // 登录页面
    { path: '/register', component: registerView }, // 注册页面
    { path: '/home', component: homeView }, // 首页页面
    { path: '/manage-index', component: parkListView }, // 车位管理 首页
    { path: '/manage-add', component: parkAddView }, // 车位管理 添加
    { path: '/manage-update', component: parkUpdateView }, // 车位管理 修改
    { path: '/park-fast', component: parkFastView }, // 停车管理 立即停车
    { path: '/park-today', component: parkTodayView }, // 停车管理 实时车位(当天停车)
  ]
})