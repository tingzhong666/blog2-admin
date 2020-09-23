<template>
  <div class="component">
    <el-upload
      class="avatar-uploader"
      :action="url"
      name="files"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img
        v-if="srcUrl"
        :src="srcUrl"
        class="avatar"
      >
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      />
    </el-upload>
  </div>
</template>

<script>
import urlJoin from 'url-join'

export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imageUrl: '',
      // 上传接口
      api: urlJoin(process.env.VUE_APP_API_URL, 'upload')
    }
  },
  computed: {
    // 上传接口 + token
    url () {
      return urlJoin(this.api, '?token=' + this.$store.state.token)
    },
    // 图像地址
    srcUrl () {
      return this.imageUrl || this.src
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      const url = urlJoin(process.env.VUE_APP_API_URL, res.data.url)
      this.imageUrl = url
      // 将文件url提交
      this.$emit('src', url)
    }
  }
}
</script>

<style lang="stylus" scoped>
.avatar-uploader
  display inline-block
  vertical-align top
  >>>
    .el-upload
      border: 1px dashed #d9d9d9
      border-radius: 6px
      cursor: pointer
      position: relative
      overflow: hidden
      &:hover
        border-color: #409EFF
    .avatar-uploader-icon
      font-size: 28px
      color: #8c939d
      width: 178px
      height: 178px
      line-height: 178px
      text-align: center
.avatar
  width: 178px
  height: 178px
  display: block
</style>
