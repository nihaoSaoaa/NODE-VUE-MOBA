import axios from  'axios'
import Vue from 'vue'
import router from 'vue-router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use( config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config
}, err => {
  Promise.reject(err)
})

http.interceptors.response.use(res => {
  return res;
}, err => {
  // 若获取错误的信息
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
  } 
  if (err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})

export default http