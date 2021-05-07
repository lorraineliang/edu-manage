<template>
  <div class="roleList">
    <el-table
      :data="allRoleList"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="createdDate"
        label="添加时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            @click="$router.push({
              name: 'alloc-menu',
              params: {
                roleId: scope.row.id
              }
            })"
            type="text"
            size="small"
          >分配菜单</el-button>
          <el-button type="text" size="small">分配资源</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Moment from 'moment'
import { getRoleAll, delRole } from '@/services/role'
export default Vue.extend({
  name: 'RoleList',
  props: {
    needRefresh: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      allRoleList: []
    }
  },
  watch: {
    needRefresh () {
      this.needRefresh && this.getRoleList()
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const { data } = await getRoleAll()
      this.allRoleList = data.data
      this.allRoleList.forEach((i: any) => {
        i.createdDate = Moment(i.createdTime).format('YYYY-MM-DD HH:mm:ss')
      })
      this.$emit('refresh', false)
    },
    async handleDelete (row: any) {
      this.$confirm('确认删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await delRole(row.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.getRoleList()
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    handleClick (row: any) {
      console.log(row)
    },
    handleEdit (row: any) {
      this.$emit('isEdit', row)
    }
  }
})
</script>

<style lang="scss" scoped></style>
