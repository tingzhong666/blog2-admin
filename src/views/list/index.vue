<template>
  <el-card class="page">
    <div slot="header">
      <h2>文章管理</h2>
    </div>

    <div class="main">
      <router-link
        to="/list/add"
      >
        <el-button
          type="primary"
        >
          新增
        </el-button>
      </router-link>

      <List
        :list="list"
        @refresh="get"
      />
    </div>
  </el-card>
</template>

<script>
import List from './list'
import api from '@/http/api'

export default {
  data () {
    return {
      list: [],
      n: 0,
      option: {
        limit: 10,
        page: 1,
        tag: 0,
        q: '',
        time: -1,
        power: 0,
        sort: 1
      }
    }
  },
  components: { List },
  methods: {
    async get () {
      const res = await api.list(this.option)
      this.n = res.n
      this.list = res.data.map(v => {
        const date = new Date(v.created_time)
        const y = date.getFullYear()
        const m = date.getMonth() + 1
        const d = date.getDate()
        v.created_time = y + '.' + m + '.' + d

        return v
      })
    }
  },
  async created () {
    await this.get()
  }
}
</script>

<style lang="stylus" scoped>
</style>
