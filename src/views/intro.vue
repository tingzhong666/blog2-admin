<template>
  <el-card class="page">
    <div slot="header">
      <h2>博主信息</h2>
    </div>

    <div class="main">
      <!-- 头像 -->
      <div class="item">
        <p>头像：</p>
        <Img
          :src="req.headUrl"
          @src="url"
          class="item head-img"
        />
      </div>

      <!-- 昵称 -->
      <div class="item nickname">
        <p>昵称：</p>
        <el-input
          v-model="req.nickname"
          placeholder="请输入内容"
        />
      </div>

      <!-- 简介 -->
      <div class="item intro">
        <p>简介：</p>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          resize="none"
          v-model="req.intro"
        />
      </div>

      <!-- github -->
      <div class="item github">
        <p>github：</p>
        <el-input
          v-model="req.github"
          placeholder="请输入内容"
        />
      </div>

      <!-- 提交 -->
      <el-button
        type="primary"
        class="submit"
        @click="set"
      >
        确定
      </el-button>
    </div>
  </el-card>
</template>

<script>
import Img from '@/components/img'
import api from '@/http/api'

export default {
  components: { Img },
  data () {
    return {
      req: {
        headUrl: '',
        nickname: '',
        intro: '',
        github: ''
      }
    }
  },
  methods: {
    // 上传后返回的图像地址
    url (src) {
      this.req.headUrl = src
    },
    // 获取
    async get () {
      const res = await api.intro.get()
      this.req = {
        headUrl: res.data.img,
        nickname: res.data.name,
        intro: res.data.intro,
        github: res.data.github
      }
    },
    // 修改
    async set () {
      await api.intro.post({
        img: this.req.headUrl,
        name: this.req.nickname,
        intro: this.req.intro,
        github: this.req.github
      })

      this.get()
    }
  },
  async created () {
    await this.get()
  }
}
</script>

<style lang="stylus" scoped>
.page
  .main
    .submit
      margin-top 20px
    .item
      max-width 500px
      p
        margin 20px 0
      &:first-child p
        margin-top 0
    .head-img
      width auto
</style>
