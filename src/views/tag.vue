<template>
  <el-card class="page">
    <div slot="header">
      <h2>分类/标签</h2>
    </div>

    <div class="main">
      <el-button
        type="primary"
        class="item"
        @click="addDialog = true"
      >新增</el-button>
      <el-dialog
        title="新增"
        :visible.sync="addDialog"
      >
        <el-input
          v-model="body.name"
          placeholder="请输入内容"
        />

        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="addDialog = false; bodyClear()">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>

      <el-table
        :data="list"
        style="width: 100%"
        class="item list"
      >
        <el-table-column
          prop="name"
          label="名称"
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
  </el-card>
</template>

<script>
import api from '@/http/api'

export default {
  data () {
    return {
      list: [],
      body: {
        name: '',
        id: ''
      },
      addDialog: false,
      rmPopover: false,
      setDialog: false
    }
  },
  methods: {
    async get () {
      this.bodyClear()
      const res = await api.tag.get()
      this.list = res.data
    },
    async set () {
      await api.tag.post(this.body)

      this.setDialog = false
      this.get()
    },
    async add () {
      await api.tag.add({ name: this.body.name })

      this.addDialog = false
      this.get()
    },
    async rm (id) {
      await api.tag.rm(id)

      this.rmPopover = false
      this.get()
    },
    bodyClear () {
      this.body = { name: '', id: '' }
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
    .item
      margin-bottom 20px
    .list
      .btn
        margin-left 20px
</style>
