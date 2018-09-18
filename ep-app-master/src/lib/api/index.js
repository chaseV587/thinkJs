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
    },
    // 车位列表查询
    queryAllCarbarn(params) {
      return http.fetchPost(`/carbarn/queryAll`, params)
    },
    // 车位添加
    addCarbarn(params) {
      return http.fetchPost(`/carbarn/add`, params)
    },
    // 车位信息修改
    updateCarbarn(params) {
      return http.fetchPost(`/carbarn/update`, params)
    }
  }
}