<template>
  <section class="layout">
    <div class="panel">
      <div class="item">
        <el-alert
          :title="msg"
          type="error"
          effect="dark"
          v-show="msg != ''">
        </el-alert>
      </div>

      <div class="item">
        <label for="username">用户名：</label>
        <input type="text" v-model="username">
      </div>

      <div class="item">
        <label for="password">密码：</label>
        <input type="password" v-model="password">
      </div>

      <div class="item">
        <button class="submit" @click="submit">登录</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  metaInfo: {
    titleTemplate: '登录'
  },
  data () {
    return {
      username: '',
      password: '',
      msg: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    async submit () {
      this.msg = ''
      if (this.username === '' || this.password === '') {
        this.msg = '用户名或密码为空！'
        return
      }

      this.msg = (await this.login({ username: this.username, password: this.password })) || ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.layout
  background-color bgc
  min-width 100vw
  min-height 100vh
  padding-top 1px
  .panel
    width 400px
    min-height 108px
    --height @min-height
    box-shadow 0px 0px 19px -3px rgba(0,0,0,0.3)
    padding 20px
    border-radius 5px
    margin calc((100vh - var(--height)) / 2 - var(--height)) auto 0
    @media screen and (max-height 400px)
      margin 10vh auto 0
    .item
      margin-bottom 10px
      width 100%
      &:last-child
        margin 0
      label
        width 20%
        display inline-block
      input
        width 80%
        height 2rem
      .submit
        background-color theme
        color color
        text-align center
        line-height 3rem
        display block
        width 100%
        cursor pointer
</style>
