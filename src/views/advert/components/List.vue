<template>
  <div>
    <el-card>
      <div slot="header">
        <el-button
          type="primary"
          @click="$router.push({
            name: 'createAdvert'
          })"
        >添加广告</el-button>
      </div>
      <div>
        <el-table
          :data="advertList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          style="width: 100%;margin-bottom:20px">
          <el-table-column
            prop="id"
            label="ID"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="广告名称"
            width="200">
          </el-table-column>
          <el-table-column
            label="广告位置"
            width="120">
            <template slot-scope="scope">
              <span>{{ changeAdvertSpace(scope.row.spaceId) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sortNum"
            label="广告图片"
            width="250">
            <template slot-scope="scope">
            <!-- <img width="30px" :src="scope.row.portrait || '/src/assets/default-avatar.png'"> -->
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.img || ''"
              fit="cover">
            </el-image>
          </template>
          </el-table-column>
          <el-table-column
            label="时间"
            width="250">
            <template slot-scope="scope">
              <p>开始时间：{{ scope.row.startTimeFormatString}}</p>
              <p>到期时间：{{ scope.row.endTimeFormatString}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="上线/下线"
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
                  name: 'editAdvert',
                  params: {
                    advertId: scope.row.id
                  }
                })"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
         <el-pagination
          small
          style="margin-top:20px"
          layout="prev, pager, next"
          :page-size="pageSize"
          :current-page="currentPage"
          :total="advertList.length"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAdList, updateStatus } from '@/services/advert'
import { getAllSpaces } from '@/services/advert-space'
export default Vue.extend({
  name: 'advertList',
  data () {
    return {
      pageSize: 3,
      currentPage: 1,
      advertList: [],
      advertSpaces: []
    }
  },
  created () {
    this.loadAdvertSpace()
    this.loadAdvert()
  },
  methods: {
    async loadAdvert () {
      const { data } = await getAdList()
      this.advertList = data.content
      this.advertList.forEach((i: any) => {
        this.$set(i, 'isStatusLoading', false)
      })
    },
    async loadAdvertSpace () {
      const { data } = await getAllSpaces()
      this.advertSpaces = data.content
    },
    async onStateChange (advert: any) {
      advert.isStatusLoading = true
      await updateStatus(advert.id, advert.status)
      this.$message.success(`${advert.status === 0 ? '下线' : '上线'}成功`)
      advert.isStatusLoading = false
    },
    changeAdvertSpace (val: any) {
      const space: any = this.advertSpaces.find((i: any) => i.id === val)
      const name = (space && space.name) || ''
      return name
    },
    handleCurrentChange (val: number) {
      this.currentPage = val
    }

  }

})
</script>

<style>

</style>
