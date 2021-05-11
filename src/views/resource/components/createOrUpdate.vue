<template>
  <div>
      <el-form ref="resource-form" :model="resource" label-width="70px">
        <el-form-item label="资源名称">
            <el-input
              v-model="resource.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="resource.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select v-model="resource.categoryId" clearable placeholder="请选择资源分类">
              <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="resource.description"
            type="textarea"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleAddSourse">确认</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { deepClone } from '@/utils/commonFunc'
import { saveOrUpdate } from '@/services/resource'
export default Vue.extend({
  name: 'createOrUpdate',
  props: ['resource', 'categories', 'isEdit'],
  data () {
    return {
      form: {
        name: '',
        url: '',
        description: '',
        categoryId: 1
      },
      msg: '添加资源成功'
    }
  },
  mounted () {
    this.form = this.isEdit ? deepClone(this.resource) : this.form
    this.msg = this.isEdit ? '编辑资源成功' : this.msg
  },
  methods: {
    handleCancel () {
      (this.$refs['resource-form'] as Form).resetFields()
      this.$emit('closeDialog', false)
    },
    async handleAddSourse () {
      const { data } = await saveOrUpdate(this.resource)
      if (data.code === '000000') {
        this.$message.success(this.msg)
        this.$emit('closeDialog', true)
      }
    }
  }
})
</script>

<style>

</style>
