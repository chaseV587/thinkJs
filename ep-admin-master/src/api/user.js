import axios from '@/libs/api.request'
const baseUrl = 'http://127.0.0.1:8360/admin/'

export const login = ({ userName, password }) => {
  const loginAction = baseUrl + 'auth/login'
  const data = {
    userName,
    password
  }
  return axios.request({
    url: loginAction,
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  const getUserInfoAction = baseUrl + 'auth/getUserInfo'
  return axios.request({
    url: getUserInfoAction,
    data: {
      token
    },
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
