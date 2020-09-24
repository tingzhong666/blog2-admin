<template>
  <div class='component'>
    <el-table
      :data="list"
      style="width: 100%"
      class="item list"
    >
      <el-table-column
        prop="created_time"
        label="创建时间"
      />
      <el-table-column
        prop="title"
        label="标题"
      />
      <el-table-column
        prop="readed"
        label="浏览量"
      />
      <el-table-column
        prop="tag"
        label="标签"
      />
      <el-table-column
        prop="is_reward"
        label="赞赏"
      />
      <el-table-column
        prop="is_top"
        label="置顶"
      />
      <el-table-column
        label="操作"
        fiexd="right"
      >
        <template slot-scope="scoped" class="handle">
          <el-popover
            placement="top"
            width="160"
            v-model="rmPopover">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="rmPopover = false">取消</el-button>
              <el-button type="primary" size="mini" @click="rm(scoped.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="small" plain>删除</el-button>
          </el-popover>

          <el-button class="btn" @click="setDialog = true; body = { ...scoped.row }" type="primary" size="small" plain>编辑</el-button>
          <el-dialog
            title="编辑"
            :visible.sync="setDialog"
          >
            <el-input
              v-model="body.name"
              placeholder="请输入内容"
            />

            <div
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="setDialog = false; bodyClear()">取 消</el-button>
              <el-button type="primary" @click="set()">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
