<template>
  <div id='resourceList'>
    <el-card style="margin-bottom: 10px">
      <div>
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
    </el-card>
    <el-card style="margin-bottom: 10px">
      <div>
        <el-button @click="addSourse" :disabled="isLoading">添加资源</el-button>
        <el-button @click="$router.push({ name: 'resourceCategory'})" :disabled="isLoading">资源分类</el-button>
      </div>
    </el-card>
    <el-card class="box-card">
      <div>
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
              <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
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
      </div>
    </el-card>
    <el-dialog :title="isEdit?'编辑资源':'添加资源'" :visible.sync="isShowDialog">
      <create-or-update
        v-if="isShowDialog"
        :categories="categories"
        :resource="resource"
        :isEdit="isEdit"
        @closeDialog="closeDialog"/>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Moment from 'moment'
import CreateOrUpdate from './createOrUpdate.vue'
import { getResourcePages, delResource } from '@/services/resource'
import { getCategories } from '@/services/category'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'resourceList',
  components: {
    CreateOrUpdate
  },
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
      isLoading: false,
      isShowDialog: false,
      isEdit: false,
      resource: {
        name: '',
        url: '',
        description: '',
        categoryId: 1
      }
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
    onSubmit () {
      this.form.current = 1
      this.loadResource()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResource()
    },
    addSourse () {
      this.isEdit = false
      this.isShowDialog = true
    },
    handleEdit (resourse: any) {
      this.resource = resourse
      this.isShowDialog = true
      this.isEdit = true
    },
    handleDelete (resourse: any) {
      this.$confirm('确认删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await delResource(resourse.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadResource()
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    closeDialog (val: boolean) {
      this.isShowDialog = false
      this.resource = {
        name: '',
        url: '',
        description: '',
        categoryId: 1
      }
      val && this.loadResource()
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
