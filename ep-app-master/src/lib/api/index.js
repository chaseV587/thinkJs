import http from './public'

export default {
  methods: {
    // 用户登录
    userLogin(params) {
        return http.fetchPost(`/auth/login`, params)
    },
    // 用户注册
    userRegister(params) {
        return http.fetchPost(`/auth/register`, params)
    }
  }
}