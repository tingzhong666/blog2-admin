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
      >
        <template slot-scope="scoped">
          <el-tag
            v-for="item in scoped.row.tag"
            :key="item.id"
            :disable-transitions="false"
            class="tag"
            size="mini"
          >
            {{ item.name }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="赞赏"
      >
        <template slot-scope="scoped">
          <el-switch
            v-model="scoped.row.is_reward"
            @change="rewardSwitch(scoped.row.id, $event)"
          />
        </template>
      </el-table-column>

      <el-table-column
        label="置顶"
      >
        <template slot-scope="scoped">
          <el-switch
            v-model="scoped.row.is_top"
            disabled
          />
        </template>
      </el-table-column>

      <el-table-column
        label="私密"
      >
        <template slot-scope="scoped">
          <el-switch
            v-model="scoped.row.is_private"
            disabled
          />
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        fiexd="right"
      >
        <template slot-scope="scoped" class="handle">
          <el-popconfirm
            confirmButtonText='好的'
            cancelButtonText='不用了'
            icon="el-icon-info"
            iconColor="red"
            title="确定删除吗？"
            @onConfirm="rm(scoped.row.id)"
          >
            <el-button slot="reference" type="danger" size="small" plain>删除</el-button>
          </el-popconfirm>

          <el-button class="btn" @click="editor(scoped.row.id)" type="primary" size="small" plain>编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from '@/http/api'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async rm (id) {
      await api.artical.rm(id)

      this.$emit('refresh')
    },
    async editor (id) {
      this.$router.push('/list/edi?id=' + id)
    },
    async rewardSwitch (id, newV) {
      await api.reward({ id, switc: newV })
    }
  }
}
</script>

<style lang='stylus' scoped>
.component
  .list
    .tag
      margin 2px
    .btn
      margin-left 10px
</style>
