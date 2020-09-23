<template>
  <el-card class="page">
    <div slot="header">
      <h2>基本设置</h2>
    </div>

    <div class="main">
      <div class="item">
        <p>底部备案信息：</p>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          resize="none"
          v-model="body.foot"
        />
      </div>

      <div class="item is-reward">
        <p>赞赏开关：</p>
        <el-switch
          v-model="body.is_reward"
        />
      </div>

      <div class="item reward">
        <p>收款码：</p>
        <div class="content">
          <div class="item">
            <div class="p">
              支付宝：
            </div>
            <Img
              :src="body.reward.alipay"
              @src="urlAlipay"
              class="img"
            />
          </div>
          <div class="item">
            <div class="p">
              微信：
            </div>
            <Img
              :src="body.reward.wx"
              @src="urlWx"
              class="img"
            />
          </div>
          <div class="item">
            <div class="p">
              QQ：
            </div>
            <Img
              :src="body.reward.qq"
              @src="urlQq"
              class="img"
            />
          </div>
        </div>
      </div>

      <div class="item">
        <p>网站邮箱：</p>
        <el-input
          v-model="body.email"
          placeholder="请输入内容"
        />
      </div>

      <div class="item">
        <p>邮箱授权码：</p>
        <el-input
          v-model="body.email_password"
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
      body: {
        foot: '',
        is_reward: null,
        reward: {
          alipay: '',
          wx: '',
          qq: ''
        },
        email: '',
        email_password: ''
      }
    }
  },
  methods: {
    // 上传后返回的图像地址
    urlAlipay (src) {
      this.body.reward.alipay = src
    },
    urlWx (src) {
      this.body.reward.wx = src
    },
    urlQq (src) {
      this.body.reward.qq = src
    },
    async get () {
      const res = await api.set.get()
      this.body = {
        foot: res.data.foot,
        is_reward: res.data.is_reward,
        reward: {
          alipay: res.data.reward.alipay,
          wx: res.data.reward.wx,
          qq: res.data.reward.qq
        },
        email: res.data.email,
        email_password: res.data.email_password
      }
    },
    async set () {
      await api.set.post({
        foot: this.body.foot,
        isReward: this.body.is_reward,
        reward: {
          alipay: this.body.reward.alipay,
          wx: this.body.reward.wx,
          qq: this.body.reward.qq
        },
        email: this.body.email,
        emailPassword: this.body.email_password
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
.main >
  .item
    max-width 500px
    p
      margin 20px 0
    &:first-child p
      margin-top 0
  .is-reward
  .reward
    p
      display inline-block
  .reward
    display flex
    p
      margin 0
      margin-right 20px
    .content
      .item
        display flex
        justify-content space-between
  .submit
    margin-top 20px
</style>
