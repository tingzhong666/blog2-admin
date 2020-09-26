<template>
  <el-card class="page">
    <div slot="header">
      <h2>文章管理</h2>
    </div>

    <div class="main">
      <div class="search">
        <Search v-bind.sync="option" @submit="search"/>
      </div>

      <router-link
        to="/list/add"
        class="add"
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

      <div class="page">
        <Page
          @change="pageChange"
          :total="n"
          :pageSize="option.limit"
          :currentPage="option.page"/>
      </div>
    </div>
  </el-card>
</template>

<script>
import List from './list'
import Page from './page'
import Search from './search'
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
  components: { List, Page, Search },
  methods: {
    async get () {
      const res = await api.list(this.option)
      this.n = res.count
      this.list = res.data.map(v => {
        const date = new Date(v.created_time)
        const y = date.getFullYear()
        const m = date.getMonth() + 1
        const d = date.getDate()
        v.created_time = y + '.' + m + '.' + d

        return v
      })
    },
    pageChange (current) {
      this.option.page = current
      this.get()
    },
    search () {
      this.option.page = 1
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
    .search
      margin-bottom 20px
    .page
      margin-top 20px
      display flex
      justify-content center
</style>
