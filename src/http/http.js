import axios from 'axios'
import store from '../store'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 3000
})

// 响应处理
http.interceptors.response.use(async config => {
  if (config.status === 200) return config.data
}, error => Promise.reject(error))

// 请求处理
http.interceptors.request.use(config => {
  if (config.url === '/auth') return config

  if (config.method === 'post') {
    if (config.data === undefined) config.data = {}
    config.data.token = store.state.token
  }
  if (config.method === 'get') {
    if (config.params === undefined) config.params = {}
    config.params.token = store.state.token
  }

  return config
}, error => Promise.reject(error))

export default http
