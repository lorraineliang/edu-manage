<template>
  <div>
    <el-card>
      <div slot="header">
        <el-button type="primary" @click="handleAdd">添加广告位</el-button>
      </div>
      <div>
        <el-table
          :data="advertSpaces.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          style="width: 100%; margin-bottom:20px">
          <el-table-column
            prop="spaceKey"
            label="spaceKey"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="广告位名称"
          >
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="创建时间"
          >
          </el-table-column>
          <el-table-column
            prop="updateDate"
            label="更新时间"
          >
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          style="margin-top:20px"
          layout="prev, pager, next"
          :page-size="pageSize"
          :current-page="currentPage"
          :total="advertSpaces.length"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </el-card>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
    >
      <div>
        广告位名称
        <el-input v-model="name" style="margin-top:10px"></el-input>
      </div>
      <div slot="footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Moment from 'moment'
import { saveOrUpdate, getAllSpaces } from '@/services/advert-space'
export default Vue.extend({
  name: 'advertSpace',
  data () {
    return {
      advertSpaces: [],
      advertSpace: {},
      dialogVisible: false,
      isEdit: false,
      name: '',
      title: '添加广告位',
      pageSize: 10,
      currentPage: 1
    }
  },
  created () {
    this.loadAdvertSpace()
  },
  methods: {
    async loadAdvertSpace () {
      const { data } = await getAllSpaces()
      this.advertSpaces = data.content
      this.advertSpaces.forEach((i: any) => {
        i.createDate = Moment(i.createTime).format('YYYY-MM-DD HH:mm:ss')
        i.updateDate = Moment(i.updateTime).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    async handleAdd () {
      this.dialogVisible = true
      this.isEdit = false
    },
    async handleEdit (advertSpace: any) {
      this.dialogVisible = true
      this.isEdit = true
      this.advertSpace = advertSpace
      this.name = advertSpace.name
    },
    async onSubmit () {
      if (this.isEdit) {
        (this.advertSpace as any).name = this.name
      }
      this.isEdit ? await saveOrUpdate(this.advertSpace) : await saveOrUpdate({
        name: this.name
      })
      this.dialogVisible = false
      this.loadAdvertSpace()
    },
    handleCancel () {
      this.name = ''
      this.dialogVisible = false
      this.isEdit = false
    },
    handleCurrentChange (val: number) {
      this.currentPage = val
    }
  }
})
</script>

<style>

</style>
