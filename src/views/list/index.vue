<template>
  <el-card class="page">
    <div slot="header">
      <h2>文章管理</h2>
    </div>

    <div class="main">
      <router-link to="/list/add"><el-button type="primary">新增</el-button></router-link>

      <List/>
    </div>
  </el-card>
</template>

<script>
import List from './list'

export default {
  components: { List }
}
</script>

<style lang="stylus" scoped>
</style>
