<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" ref="form" :model="filterParams" class="demo-form-inline">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="filterParams.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop="rangeDate">
            <el-date-picker
              v-model="filterParams.rangeDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch" :disabled="isLoading">查询搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="users"
        border
        style="width: 100%; margin-bottom:20px">
        <el-table-column
          fixed
          prop="id"
          label="用户ID"
        >
        </el-table-column>
        <el-table-column
          prop="portrait"
          label="头像"
        >
          <template slot-scope="scope">
            <!-- <img width="30px" :src="scope.row.portrait || '/src/assets/default-avatar.png'"> -->
            <el-avatar :size="30" :src="scope.row.portrait || require('@/assets/default-avatar.png')"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="createdDate"
          label="注册时间"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button @click="handleForbidUser(scope.row)" type="text" size="small">禁用</el-button>
            <el-button type="text" size="small" @click="handleAllocRole(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled="isLoading"
        :current-page.sync="filterParams.currentPage"
        :page-sizes="[10,50,100,200]"
        :page-size="filterParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
      <el-dialog title="分配角色" :visible.sync="dialogFormVisible">
        <el-select v-model="roleIdList" multiple placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Moment from 'moment'
import { getUserPages, forbidUser } from '@/services/user'
import { getRoleAll, allocateUserRoles, getUserRoles } from '@/services/role'
export default Vue.extend({
  name: 'userIndex',
  data () {
    return {
      filterParams: {
        phone: '',
        rangeDate: [],
        startCreateTime: '',
        endCreateTime: '',
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 0,
      roles: [],
      users: [],
      roleIdList: [],
      currentUser: {},
      dialogFormVisible: false,
      isLoading: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker: any) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker: any) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker: any) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created () {
    this.loadUsers()
    this.loadRoles()
  },
  methods: {
    async loadUserRoles () {
      const { data: { data: userRole } } = await getUserRoles((this.currentUser as any).id)
      this.roleIdList = userRole.map((item: any) => item.id)
    },
    async loadUsers () {
      this.isLoading = true
      const { rangeDate } = this.filterParams
      if (rangeDate && rangeDate.length) {
        this.filterParams.startCreateTime = rangeDate[0]
        this.filterParams.endCreateTime = rangeDate[1]
      } else {
        this.filterParams.startCreateTime = ''
        this.filterParams.endCreateTime = ''
      }
      const { data } = await getUserPages(this.filterParams)
      this.users = data.data.records
      this.users.forEach((i: any) => {
        i.createdDate = Moment(i.createdTime).format('YYYY-MM-DD HH:mm:ss')
      })
      this.totalCount = data.data.total
      this.isLoading = false
    },
    async loadRoles () {
      const { data } = await getRoleAll()
      this.roles = data.data
    },
    async handleForbidUser (user: any) {
      const { data } = await forbidUser({
        userId: user.id
      })
      console.log(data)
    },
    handleAllocRole (user: any) {
      this.dialogFormVisible = true
      this.currentUser = user
      this.loadUserRoles()
    },
    async onSubmit () {
      const { data } = await allocateUserRoles({
        userId: (this.currentUser as any).id,
        roleIdList: this.roleIdList
      })
      if (data.code === '000000') {
        this.$message.success('操作成功')
        this.dialogFormVisible = false
      }
    },
    onSearch () {
      this.filterParams.currentPage = 1
      this.loadUsers()
    },
    handleSizeChange (val: number) {
      this.filterParams.pageSize = val
      this.filterParams.currentPage = 1
      this.loadUsers()
    },
    handleCurrentChange (val: number) {
      this.filterParams.currentPage = val
      this.loadUsers()
    }
  }

})
</script>

<style>

</style>
