<template>
  <section class="layout">
    <el-menu
      class="menu"
      :default-active="$route.fullPath"
      :router="true">
      <el-menu-item
        v-for="(v, i) in menu"
        :index="v.path"
        :key="i">
        <i :class="v.icon"></i>
        <span slot="title" v-text="v.title"></span>
      </el-menu-item>
    </el-menu>

    <main>
      <div class="container">
        <transition mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        { icon: 'iconfont icon-gerenxinxi-', title: '博主信息', path: '/intro' },
        { icon: 'iconfont icon-set', title: '基本设置', path: '/set' },
        { icon: 'iconfont icon-about', title: '关于说明', path: '/about' },
        { icon: 'iconfont icon-article', title: '文章管理', path: '/list' },
        { icon: 'iconfont icon-tag', title: '标签/分类', path: '/tag' },
        { icon: 'iconfont icon-news', title: '消息列表', path: '/news' },
        { icon: 'iconfont icon-link-share', title: '友链管理', path: '/links' }
      ]
    }
  },
  computed: {
    title () {
      let active
      this.menu.some(v => {
        if (v.path === this.$route.fullPath) {
          active = v.title
          return true
        }
      })
      return active || ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.layout
  .menu
    width 200px
    height 100vh
    position fixed
    left 0
    top 0
    > li > span
      display inline-block
      margin-left 10px
  main
    --width calc(100vw - 200px)
    width var(--width)
    float right
    .container
      width calc(var(--width) - 20px)
      margin 10px auto
      padding 20px
</style>
