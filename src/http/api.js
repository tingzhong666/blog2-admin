import http from './http'

const api = {}

// 验证
api.auth = async function (token) {
  return await http.post('/auth', { token })
}

// 登录
api.login = async function ({ username, password }) {
  return await http.post('/login', { username, password })
}

export default api
