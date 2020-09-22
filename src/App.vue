<template>
  <div id="app">
    <transition mode="out-in">
      <component :is="layout"/>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Login from './layouts/login'
import Layout from './layouts/layout'
import Loading from './layouts/loading'
import './assets/base.css'
import './assets/iconfont/iconfont.css'

export default {
  metaInfo: {
    titleTemplate: '博客后台管理'
  },
  computed: {
    ...mapState(['isLogin']),
    layout () {
      let comp = ''
      switch (this.isLogin) {
        case true: comp = 'Layout'; break
        case false: comp = 'Login'; break
        case null: comp = 'Loading'; break
      }

      return comp
    }
  },
  components: { Login, Layout, Loading },
  methods: {
    ...mapActions(['auth'])
  },
  async created () {
    await this.auth()
  }
}
</script>

<style lang="stylus">
.v-enter-active
.v-leave-active
  transition .3s ease
.v-enter
.v-leave-to
  transform translateY(-30px)
  opacity 0
</style>
