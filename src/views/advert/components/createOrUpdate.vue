<template>
  <div>
    <el-card>
      <div slot="header">
        <span>{{ title }}</span>
      </div>
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="广告名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="广告位置">
            <el-select v-model="form.spaceId" placeholder="请选择广告位置">
              <el-option :label="item.name" :value="item.id" v-for="item in advertSpaces" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="到期时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="上线/下线">
            <el-radio-group v-model="form.status">
              <el-radio :label="0">下线</el-radio>
              <el-radio :label="1">上线</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="课程封面">
            <course-image v-model="form.img" />
          </el-form-item>
          <el-form-item label="广告链接">
            <el-input v-model="form.link"></el-input>
          </el-form-item>
          <el-form-item label="广告备注">
            <el-input type="textarea" v-model="form.text"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">立即创建</el-button>
            <el-button :disabled="isLoading">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import CourseImage from '@/views/course/components/courseImage.vue'
import { getAllSpaces } from '@/services/advert-space'
import { saveOrUpdate, getAdById } from '@/services/advert'
export default Vue.extend({
  name: 'advert-createOrUpdate',
  props: {
    advertId: {
      type: [String, Number]
    }
  },
  components: {
    CourseImage
  },
  data () {
    return {
      isLoading: false,
      isEdit: false,
      title: '添加广告',
      form: {
        name: '',
        spaceId: null,
        keyword: '',
        htmlContent: '',
        text: '',
        img: '',
        link: '',
        startTime: '',
        endTime: '',
        status: 0,
        priority: 0,
        startTimeFormatString: '',
        endTimeFormatString: ''
      },
      advertSpaces: []
    }
  },
  created () {
    this.judgeIsEdit()
    this.loadAdvertSpace()
  },
  methods: {
    judgeIsEdit () {
      this.isEdit = Boolean(this.advertId) || false
      this.isEdit && this.loadAdvert()
    },
    async loadAdvert () {
      const { data } = await getAdById(this.advertId)
      this.form = data.content
    },
    async loadAdvertSpace () {
      const { data } = await getAllSpaces()
      this.advertSpaces = data.content
    },
    async onSubmit () {
      this.isLoading = true
      this.form.startTimeFormatString = moment(this.form.startTime).format('YYYY-MMM-DD HH:mm:ss')
      this.form.endTimeFormatString = moment(this.form.endTime).format('YYYY-MMM-DD HH:mm:ss')
      const { data } = await saveOrUpdate(this.form)
      if (data.state === 1) {
        this.$message.success(this.title + '成功')
        this.$router.back()
      }
      this.isLoading = false
    }

  }
})
</script>

<style>

</style>
