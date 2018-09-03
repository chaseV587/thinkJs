/* 使用vue-router */
import VueRouter from 'vue-router';
Vue.use(VueRouter);

 /* 导入需要在Vue-Router内路由的页面 */
import loginView from '../page/auth/login/login.vue'

const routes = [
    {path:'/login',redirect: '/loginView'},
]

/* 将需要路由的页面routes做为参数，新建VueRouter对象router */
const router = new VueRouter({
    routes
});

export default{
    router,  //export router
}