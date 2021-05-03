<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>{{ isEdit ? '编辑菜单' : '添加菜单'}}</span>
  </div>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px" v-loading="isLoading">
    <el-form-item label="菜单名称"  prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="菜单路径"  prop="href">
      <el-input v-model="form.href"></el-input>
    </el-form-item>
    <el-form-item label="上级菜单" prop="parentId">
    <el-select v-model="form.parentId" placeholder="请选择上级菜单">
        <el-option label="无上级菜单" :value="-1"></el-option>
      <el-option v-for="menu in parentMenuList" :key="menu.id" :label="menu.name" :value="menu.id"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="前端图标">
      <el-input v-model="form.icon"></el-input>
    </el-form-item>
    <el-form-item label="是否显示">
      <el-radio-group v-model="form.shown">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="排序">
      <el-input-number v-model="form.orderNum" @change="handleChange"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button v-if="!isEdit" @click="resetForm">重置</el-button>
      <el-button @click="backToMenu">返回</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'
export default Vue.extend({
  name: 'menu-create-edit',
  data () {
    return {
      isLoading: false,
      form: {
        name: '',
        href: '',
        parentId: -1,
        description: '',
        icon: '',
        shown: false,
        orderNum: 1
      },
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        href: [
          { required: true, message: '请输入菜单路径', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请选择上级菜单', trigger: 'change' }
        ]
      },
      parentMenuList: []
    }
  },
  computed: {
    isEdit () {
      return Boolean(this.$route.params.id) || false
    }
  },
  created () {
    this.loadMenuInfo()
  },
  methods: {
    async loadMenuInfo () {
      const { data } = await getEditMenuInfo(this.$route.params.id || -1)
      if (data.code === '000000') {
        this.form = data.data.menuInfo || this.form
        this.parentMenuList = data.data.parentMenuList
      }
    },
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        this.isLoading = true
        const { data } = await createOrUpdateMenu(this.form)
        console.log(data)
        if (data.code === '000000') {
          this.$message.success('提交成功')
          this.$router.back()
        }
      } catch (err) {
        console.log(err)
      }
      this.isLoading = false
    },
    backToMenu () {
      this.$router.back()
    },
    resetForm () {
      (this.$refs.form as Form).resetFields()
    },
    handleChange () {
      console.log('11')
    }
  }
})
</script>

<style>

</style>
