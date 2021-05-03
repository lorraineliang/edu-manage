<template>
  <div id='resourceList'>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="form.url" placeholder="请输入资源路径"></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select v-model="form.categoryId" clearable placeholder="请选择资源分类">
              <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询搜索</el-button>
            <el-button @click="onReset" :disabled="isLoading">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="resources"
        v-loading = "isLoading"
        border
        style="width: 100%; margin-bottom: 20px">
        <el-table-column
          fixed
          prop="id"
          label="编号"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
        >
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
        >
        </el-table-column>
        <el-table-column
          prop="createdDate"
          label="添加时间"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled="isLoading"
        :current-page.sync="form.current"
        :page-sizes="[10,50,100,200]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Moment from 'moment'
import { getResourcePages } from '@/services/resource'
import { getCategories } from '@/services/category'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'resourceList',
  data () {
    return {
      form: {
        name: '',
        url: '',
        categoryId: null,
        size: 10,
        current: 1
      },
      totalCount: 0,
      resources: [],
      categories: [],
      isLoading: false
    }
  },
  created () {
    this.loadResource()
    this.loadCategories()
  },
  methods: {
    async loadCategories () {
      const { data } = await getCategories()
      this.categories = data.data
    },
    async loadResource () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      this.resources = data.data.records
      this.totalCount = data.data.total
      this.resources.forEach((i: any) => {
        i.createdDate = Moment(i.createdTime).format('YYYY-MM-DD HH:mm:ss')
      })
      this.isLoading = false
    },
    handleClick (row: any) {
      console.log(row)
    },
    onSubmit () {
      this.form.current = 1
      this.loadResource()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResource()
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.loadResource()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadResource()
    }
  }

})
</script>

<style>

</style>
