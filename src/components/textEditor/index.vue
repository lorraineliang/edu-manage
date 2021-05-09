<template>
  <div ref="editor"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { imgUpload1 } from '@/services/course'
export default Vue.extend({
  name: 'textEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editor: null
    }
  },
  watch: {
    value () {
      (this.editor as any).txt.html(this.value)
    }
  },
  mounted () {
    this.initEditor() // 组件渲染好可以操作dom时初始化
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor as any)
      this.editor = editor as any
      // 配置 onchange 回调函数 回调函数必须在create方法前执行
      editor.config.onchange = (newHtml: string) => {
        this.$emit('input', newHtml)
      }
      editor.config.customUploadImg = async (resultFiles: any, insertImgFn: any) => {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        // console.log(resultFiles)
        // 上传图片，返回结果，将图片插入到编辑器中
        // insertImgFn(imgUrl)
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await imgUpload1(fd)
        insertImgFn(data.data.name)
      }

      editor.create()

      // editor.txt.html(this.value) // 初始化编辑器内容
    }
  }

})
</script>

<style>

</style>
