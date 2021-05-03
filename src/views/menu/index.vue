<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({name: 'menu-create'})">添加菜单</el-button>
      </div>
      <el-table
        :data="menuList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称"
        >
        </el-table-column>
        <el-table-column
          prop="menuLevel"
          label="菜单级数"
        >
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标"
        >
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        small
        style="margin-top:20px"
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="menuList.length"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenu, deleteMenu } from '@/services/menu'

export default Vue.extend({
  name: 'menuIndex',
  data () {
    return {
      menuList: [],
      pageSize: 8,
      currentPage: 1
    }
  },
  created () {
    this.loadMenuList()
  },
  methods: {
    async loadMenuList () {
      const { data } = await getAllMenu()
      if (data.code === '000000') {
        this.menuList = data.data
        this.menuList.forEach((menu: any) => {
          menu.menuLevel = Number(menu.level) + 1 + '级'
        })
      }
    },
    handleEdit (row: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: row.id
        }
      })
    },
    handleDelete (row: any) {
      this.$confirm('确认删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await deleteMenu(row.id)
        console.log(data)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadMenuList()
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    handleCurrentChange (val: number) {
      this.currentPage = val
    }
  }
})
</script>

<style>

</style>
