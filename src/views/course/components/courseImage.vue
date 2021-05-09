<template>
  <div id="courseImage">
    <el-progress
      v-if="isLoading"
      type="circle"
      :percentage="percentage"
      :status="percentage === 100 ? 'success' : undefined"
    ></el-progress>
    <el-upload
      v-else
      action=""
      class="avatar-uploader"
      :show-file-list="false"
      :http-request="handleUpload"
      :before-upload="beforeAvatarUpload">
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { imgUpload } from '@/services/course'
export default Vue.extend({
  name: 'courseImage',
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      isLoading: false,
      percentage: 0
    }
  },
  methods: {
    async handleUpload (option: any) {
      // this.isLoading = true
      // const fd = new FormData()
      // fd.append('file', option.file)
      // const { data } = await imgUpload(fd, e => {
      //   this.percentage = Math.floor(e.loaded / e.total * 100)
      // })
      // this.isLoading = false
      // this.percentage = 0
      // // this.course.courseListImg = data.data.name
      // this.$emit('input', data.data.name)
      try {
        this.isLoading = true
        const fd = new FormData()
        fd.append('file', option.file)
        const { data } = await imgUpload(fd, e => {
          this.percentage = Math.floor(e.loaded / e.total * 100)
        })
        if (data.code === '000000') {
          this.isLoading = false
          this.percentage = 0
          this.$emit('input', data.data.name)
        } else {
          this.$message.error('上传失败')
        }
      } catch (err) {
        console.log(err)
      }
      this.isLoading = false
      this.percentage = 0
    },
    beforeAvatarUpload (file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
