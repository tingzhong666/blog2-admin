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

api.intro = { get: null, post: null }

// 博主信息获取
api.intro.get = async function () {
  return await http.get('/intro')
}

// 博主信息修改
api.intro.post = async function ({ img, name, intro, github }) {
  return await http.post('/intro', { img, name, intro, github })
}

api.set = { get: null, post: null }

// 基本设置获取
api.set.get = async function () {
  return await http.get('/set')
}

// 基本设置修改
api.set.post = async function ({ foot, isReward, reward: { alipay, wx, qq }, email, emailPassword }) {
  return await http.post('/set', { foot, is_reward: isReward, reward: { alipay, wx, qq }, email, email_password: emailPassword })
}

export default api
