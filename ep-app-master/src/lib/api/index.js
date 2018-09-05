import http from './public'

export default {
    methods: {
        // 用户登录
        userLogin(params) {
            return http.fetchPost(`/auth/login`, params)
        }
    }
}