<template>
  <el-pagination
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize"
    layout="total, prev, pager, next, jumper"
    :total="total"
    class='component'
    background>
  </el-pagination>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleCurrentChange (page) {
      this.$emit('change', page)
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
