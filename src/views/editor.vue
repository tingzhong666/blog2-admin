<template>
  <el-card class="page">
    <div slot="header">
      <h2
        v-text="title"
      />
    </div>

    <div class="main">
      <div class="item">
        <p>标题：</p>
        <el-input
          v-model="body.title"
          placeholder="请输入内容"
        />
      </div>

      <div class="item">
        <p>赞赏：</p>
        <el-switch
          v-model="body.is_reward"
        />
      </div>

      <div class="item">
        <p>私密：</p>
        <el-switch
          v-model="body.is_private"
        />
      </div>

      <div class="item">
        <p>置顶：</p>
        <el-switch
          v-model="body.is_top"
        />
      </div>

      <div class="item tag">
        <p>标签：</p>
        <!-- 已添加 -->
        <el-tag
          v-for="(item, i) in body.tag"
          :key="item.id"
          closable
          :disable-transitions="false"
          @close="tagRm(i)"
          class="tag"
        >
          {{ item.name }}
        </el-tag>

        <!-- 搜索 then 添加 -->
        <el-select
          v-model="tagId"
          filterable
          placeholder="添加"
          @change="tagAdd"
        >
          <el-option
            v-for="item in tags"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>

      <div class="item">
        <p>简介：</p>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          resize="none"
          v-model="body.intro"
        />
      </div>

      <!-- 编辑器 -->
      <div class="item content">
        <p>内容：</p>
        <mavon-editor
          v-model="body.md"
          @imgAdd="imgAdd"
          ref="editor"
          class="editor"
        />
      </div>

      <div class="item">
        <el-button
          type="primary"
          class="submit"
          @click="submit"
        >
          确定
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import api from '@/http/api'

export default {
  data () {
    return {
      body: {
        md: '',
        title: '',
        intro: '',
        tag: [],
        is_reward: false,
        is_private: false,
        is_top: false,
        img: ''
      },
      // 预添加的标签id
      tagId: null,
      // 所有标签
      tags: []
    }
  },
  computed: {
    title () {
      if (this.$route.path === '/list/add') return '新增'
      if (this.$route.path === '/list/edi') return '编辑'
      return ''
    }
  },
  methods: {
    async imgAdd (i, file) {
      const formdata = new FormData()
      formdata.append('files', file)
      const res = await api.upload(formdata)
      this.$refs.editor.$img2Url(i, res.data.url[0])
    },
    bodyClear () {
      this.body.md = ''
      this.body.title = ''
      this.body.intro = ''
      this.body.img = ''
      this.body.tag = []
      this.body.is_reward = false
      this.body.is_private = false
      this.body.is_top = false
    },
    async tagsGet () {
      const res = await api.tag.get()
      this.tags = res.data
    },
    // 标签添加
    tagAdd () {
      const id = this.tagId
      // 重复添加
      if (this.body.tag.find(v => v.id === id) !== undefined) return

      this.body.tag.push(this.tags.find(v => v.id === id))
      // this.tagAddInput = false
    },
    // 标签删除
    tagRm (index) {
      this.body.tag.splice(index, 1)
    },
    // 提交
    submit () {
      if (this.$route.path === '/list/add') this.add()
      if (this.$route.path === '/list/edi') this.set()
    },
    // 修改
    async set () {
      const res = await api.artical.post({
        id: this.$route.query.id,
        title: this.body.title,
        intro: this.body.intro,
        content: this.body.md,
        img: this.body.img,
        isReward: this.body.is_reward,
        isPrivate: this.body.is_private,
        isTop: this.body.is_top,
        tagId: this.body.tag.map(v => v.id)
      })

      if (res.code === 1) this.$router.push('/list')
    },
    // 新增
    async add () {
      const res = await api.artical.add({
        title: this.body.title,
        intro: this.body.intro,
        content: this.body.md,
        img: this.body.img,
        isReward: this.body.is_reward,
        isPrivate: this.body.is_private,
        isTop: this.body.is_top,
        tagId: this.body.tag.map(v => v.id)
      })

      if (res.code === 1) this.$router.push('/list')
    },
    // 获取
    async get () {
      const res = await api.artical.get(this.$route.query.id)

      this.body.md = res.data.content
      this.body.title = res.data.title
      this.body.intro = res.data.intro
      this.body.img = res.data.img
      this.body.tag = res.data.tag
      this.body.is_reward = res.data.is_reward
      this.body.is_private = res.data.is_private
      this.body.is_top = res.data.is_top
    }
  },
  async created () {
    if (this.$route.path === '/list/edi') this.get()
    this.tagsGet()
  }
}
</script>

<style lang="stylus" scoped>
.page
  .main >
    .item
      p
        margin 15px 0
      &:first-child p
        margin-top 0
    .content
      .editor
        min-height 70vh
        margin-top 15px
    .tag
      .tag
        margin-right 10px
</style>
