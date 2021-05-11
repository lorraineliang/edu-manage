<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="clear:both; overflow:hidden">
        <div style="float: left">
          <el-form :inline="true" ref="form" :model="filterParams" class="demo-form-inline">
            <el-form-item label="课程名称" prop="phone">
              <el-input v-model="filterParams.courseName" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="filterParams.status" placeholder="请选择">
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="onSearch" :disabled="isLoading">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-button type="primary" style="float: right" @click="$router.push({name: 'createCourse'})" :disabled="isLoading">+ 添加课程</el-button>
      </div>
      <el-table
        :data="courseList"
        border
        style="width: 100%;margin-bottom:20px">
        <el-table-column
          fixed
          prop="id"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sortNum"
          label="排序"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="状态"
          width="150">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :disabled="scope.row.isStatusLoading"
              @change="onStateChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="$router.push({
                name: 'editCourse',
                params: {
                  courseId: scope.row.id
                }
              })"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="$router.push({
                name: 'editSection',
                params: {
                  courseId: scope.row.id
                }
              })">内容管理</el-button>
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
  </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getQueryCourses, changeState } from '@/services/course'
export default Vue.extend({
  name: 'courseList',
  data () {
    return {
      isLoading: false,
      filterParams: {
        currentPage: 1,
        pageSize: 10,
        courseName: '',
        status: ''
      },
      statusList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 1,
          label: '上架'
        },
        {
          value: 0,
          label: '下架'
        }
      ],
      courseList: [],
      totalCount: 0
    }
  },
  created () {
    this.loadCourses()
  },
  methods: {
    async loadCourses () {
      const { data } = await getQueryCourses(this.filterParams)
      this.courseList = data.data.records
      this.courseList.forEach((item: any) => {
        this.$set(item, 'isStatusLoading', false)
        // item.isStatusLoading = false
      })
      this.totalCount = data.data.total
    },
    async onStateChange (course: any) {
      course.isStatusLoading = true
      await changeState({
        courseId: course.id,
        status: course.status
      })
      this.$message.success(`${course.status === 0 ? '下架' : '上架'}成功`)
      course.isStatusLoading = false
    },
    onSearch () {
      this.filterParams.currentPage = 1
      this.loadCourses()
    },
    handleSizeChange (val: number) {
      this.filterParams.pageSize = val
      this.filterParams.currentPage = 1
      this.loadCourses()
    },
    handleCurrentChange (val: number) {
      this.filterParams.currentPage = val
      this.loadCourses()
    }
  }

})
</script>

<style>

</style>
