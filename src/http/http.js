import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 3000
})

// 响应处理
http.interceptors.response.use(async config => {
  if (config.status === 200) return config.data
}, error => Promise.reject(error))

export default http
