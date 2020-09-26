<template>
  <div class="component">
    <!-- 标签 -->
    <el-radio
      v-model="mode"
      :label="0"
      class="item"
      @change="modeChange"
    >
      <span>按标签： </span>

      <el-select
        :value="tag"
        filterable
        placeholder="搜索"
        @change="tagChange"
        :disabled="mode !== 0"
      >
        <el-option
          v-for="item in tags"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-radio>

    <!-- 关键词 -->
    <el-radio
      v-model="mode"
      :label="1"
      class="item"
      @change="modeChange"
    >
      <span>按关键词：</span>

      <el-input
        :value="q"
        placeholder="请输入内容"
        :disabled="mode !== 1"
        @input="qChange"
      />
    </el-radio>

    <!-- 日期 -->
    <div class="time item">
      <el-radio
        :value="timeMode"
        :label="-1"
        @change="timeModeChange(-1)"
      >
        全部
      </el-radio>
      <el-radio
        :value="timeMode"
        :label="-2"
        @change="timeModeChange(-2)"
      >
        今天
      </el-radio>
      <el-radio
        :value="timeMode"
        :label="-3"
        @change="timeModeChange(-3)"
      >
        7天内
      </el-radio>
      <el-radio
        :value="timeMode"
        :label="-4"
        @change="timeModeChange(-4)"
      >
        30天
      </el-radio>
      <el-radio
        :value="timeMode"
        :label="-5"
        @change="timeModeChange(-5)"
      >
        半年内
      </el-radio>
      <el-radio
        :value="timeMode"
        :label="-6"
        @change="timeModeChange(-6)"
      >
        一年内
      </el-radio>
      <el-radio
        :value="timeMode"
        :label="0"
        @change="timeModeChange(0)"
        class="date"
      >
        <span>指定日期</span>
        <el-date-picker
          :value="time"
          type="date"
          placeholder="选择日期"
          @input="timeChange"
          :disabled="timeMode !== 0"
        />
      </el-radio>
    </div>

    <div class="power item">
      <el-radio
        :value="power"
        :label="0"
        @change="powerMode(0)"
      >
        全部
      </el-radio>

      <el-radio
        :value="power"
        :label="1"
        @change="powerMode(1)"
      >
        公开
      </el-radio>

      <el-radio
        :value="power"
        :label="2"
        @change="powerMode(2)"
      >
        私密
      </el-radio>
    </div>

    <!-- 搜索提交 -->
    <div class="submit item">
       <el-button type="primary" plain @click="submit">查询</el-button>
    </div>
  </div>
</template>

<script>
import api from '@/http/api'

export default {
  data () {
    return {
      // 0 按 标签搜索
      // 1 按 关键词搜索
      mode: 0,
      tags: []
    }
  },
  props: {
    q: {
      type: String,
      default: ''
    },
    tag: {
      // 0 || String
      validator: v => v * 1 === 0 || typeof v === 'string',
      default: () => []
    },
    // -1 || -2 || -3 || -4 || -5 || -6 || 具体到日的日期的0点的时间戳
    // 全部 || 今天 || 一周 || 一月 || 半年 || 一年 || 日期
    time: {
      type: Number,
      default: -1
    },
    power: {
      type: Number,
      default: 0
    }
  },
  computed: {
    timeMode () {
      return [-1, -2, -3, -4, -5, -6].includes(this.time) ? this.time : 0
    }
  },
  methods: {
    async tagsGet () {
      const res = await api.tag.get()
      res.data.unshift({ id: 0, name: '全部' })
      this.tags = res.data
    },
    tagChange (v) {
      this.$emit('update:tag', v)
    },
    qChange (v) {
      this.$emit('update:q', v)
    },
    modeChange () {
      if (this.mode === 0) this.qChange('')
      if (this.mode === 1) this.tagChange(0)
    },
    timeModeChange (v) {
      this.timeChange(v)
    },
    timeChange (v) {
      if (v === 0) v = Date.now()
      else if (![-1, -2, -3, -4, -5, -6].includes(v)) v = (new Date(v)).getTime()
      this.$emit('update:time', v)
    },
    powerMode (v) {
      this.$emit('update:power', v)
    },
    submit () {
      this.$emit('submit')
    }
  },
  created () {
    this.tagsGet()
  }
}
</script>

<style lang='stylus' scoped>
.component
  .item
    margin-bottom 20px
  .time
    .date
      span
        margin-right 20px
</style>
