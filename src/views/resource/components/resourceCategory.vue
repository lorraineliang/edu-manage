<template>
  <div>
    <el-card>
      <div slot="header">
        <el-button @click="addResourseCategory">添加</el-button>
      </div>
      <div>
        <el-table
          :data="categories"
          border
          style="width: 100%;">
          <el-table-column
            fixed
            prop="id"
            label="编号"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
          >
          </el-table-column>
          <el-table-column
            prop="createdDate"
            label="创建时间"
          >
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序"
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
      </div>
    </el-card>
    <el-dialog :title="isEdit? '编辑分类': '添加分类'" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="70px">
          <el-form-item label="名称" prop="name">
              <el-input
                v-model="form.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input type="number" v-model="form.sort" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import { saveOrderUpdate, delCategory, getResourceCategories } from '@/services/resource-category'
export default Vue.extend({
  name: 'resourceCategory',
  data () {
    return {
      categories: [],
      isEdit: false,
      dialogFormVisible: false,
      form: {
        sort: 1,
        name: ''
      },
      msg: '添加资源分类成功'
    }
  },
  created () {
    this.loadResourceCategory()
  },
  methods: {
    async loadResourceCategory () {
      const { data } = await getResourceCategories()
      this.categories = data.data
      this.categories.forEach((i: any) => {
        i.createdDate = moment(i.createdTime).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    async addResourseCategory () {
      this.dialogFormVisible = true
      this.msg = '添加资源分类成功'
      this.form = {
        sort: 1,
        name: ''
      }
    },
    handleEdit (category: any) {
      this.form = category
      this.dialogFormVisible = true
      this.msg = '编辑资源分类成功'
    },
    handleDelete (category: any) {
      this.$confirm('确认删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await delCategory(category.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadResourceCategory()
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    async onSubmit () {
      const { data } = await saveOrderUpdate(this.form)
      if (data.code === '000000') {
        this.dialogFormVisible = false
        this.$message.success(this.msg)
        this.loadResourceCategory()
      }
    }
  }
})
</script>

<style>

</style>
