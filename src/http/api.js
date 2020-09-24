import http from './http'
import urlJoin from 'url-join'

export default {
  // 验证
  async auth (token) {
    return await http.post('/auth', { token })
  },
  // 登录
  async login ({ username, password }) {
    return await http.post('/login', { username, password })
  },
  // 上传
  async upload (formdata) {
    const res = await http.post('/upload', formdata)
    res.data.url = res.data.url.map(v => urlJoin(process.env.VUE_APP_API_URL, v))
    return res
  },
  intro: {
    // 博主信息获取
    async get () {
      return await http.get('/intro')
    },
    // 博主信息修改
    async post ({ img, name, intro, github }) {
      return await http.post('/intro', { img, name, intro, github })
    }
  },
  set: {
    // 基本设置获取
    async get () {
      return await http.get('/set')
    },
    // 基本设置修改
    async post ({ foot, isReward, reward: { alipay, wx, qq }, email, emailPassword }) {
      return await http.post('/set', { foot, is_reward: isReward, reward: { alipay, wx, qq }, email, email_password: emailPassword })
    }
  },
  tag: {
    // 标签获取
    async get () {
      return await http.get('/tag')
    },
    // 标签修改
    async post ({ id, name }) {
      return await http.post('/tag_modify', { id, name })
    },
    // 标签新增
    async add ({ name }) {
      return await http.post('/tag_add', { name })
    },
    // 标签删除
    async rm (id) {
      return await http.get('/tag_rm', { params: { id } })
    }
  }
}
