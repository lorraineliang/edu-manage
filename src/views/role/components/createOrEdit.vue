<template>
  <div id="roleCreateOrEdit">
    <el-form :model="form" ref="form">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="code">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="$emit('closeDialog', false)">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { saveOrUpdate } from '@/services/role'
import { deepClone } from '@/utils/commonFunc'
export default Vue.extend({
  name: 'roleCreateOrEdit',
  props: ['roleData'],
  data () {
    return {
      form: {
        code: '',
        name: '',
        description: ''
      },
      msg: '添加角色成功'
    }
  },
  mounted () {
    this.form = Object.keys(this.roleData).length > 0 ? deepClone(this.roleData) : this.form
    this.msg = Object.keys(this.roleData).length > 0 ? '编辑角色成功' : this.msg
  },
  methods: {
    async onSubmit () {
      const { data } = await saveOrUpdate(this.form)
      if (data.code === '000000') {
        (this.$refs.form as Form).resetFields()
        this.$message.success(this.msg)
        this.$emit('closeDialog', true)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
