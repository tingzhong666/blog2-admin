import Vue from 'vue'
import Vuex from 'vuex'
import api from '../http/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: null,
    token: null
  },
  getters: {
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setIsLogin (state, isLogin) {
      state.isLogin = isLogin
    }
  },
  actions: {
    async auth (store) {
      const token = await localStorage.getItem('token')
      // 没有 token
      if (token === null) {
        store.commit('setToken', null)
        store.commit('setIsLogin', false)
      }

      // 验证
      const res = await api.auth(token)
      // token 错误或过期失效
      if (res.code === -2) {
        store.commit('setToken', null)
        store.commit('setIsLogin', false)
      }
      // 有效
      if (res.code === 1) {
        store.commit('setToken', token)
        store.commit('setIsLogin', true)
      }
    },
    // 登录
    async login (store, { username, password }) {
      const res = await api.login({ username, password })

      switch (res.code) {
        case 1:
          store.commit('setToken', res.data.token)
          store.commit('setIsLogin', true)
          await localStorage.setItem('token', res.data.token)
          return
        case -1: return '用户名或密码为空'
        case 0: return '用户名或密码错误'
        default: return res.msg || '未知'
      }
    }
  },
  modules: {
  }
})
