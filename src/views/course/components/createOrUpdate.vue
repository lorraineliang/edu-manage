<template>
  <div>
    <el-card>
      <div slot="header">
        <el-steps :active="active" finish-status="success">
          <el-step :title="step" v-for="(step, index) in steps" :key="index" @click.native="active = index"></el-step>
        </el-steps>
      </div>
      <el-form :model="course" ref="course" label-width="100px" class="demo-ruleForm">
        <div v-show="active === 0">
          <el-form-item label="名称" prop="courseName">
            <el-input v-model="course.courseName" maxlength="50" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="brief">
            <el-input v-model="course.brief" maxlength="100" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名" prop="teacherName">
            <el-input v-model="course.teacherDTO.teacherName" maxlength="50" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="position">
            <el-input v-model="course.teacherDTO.position" maxlength="50" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="讲师简介" prop="description">
            <el-input v-model="course.teacherDTO.description" maxlength="100" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="课程概述" prop="previewField">
            <el-input v-model="course.previewFirstField" maxlength="20" placeholder="概述1" show-word-limit style="margin-bottom:10px"></el-input>
            <el-input v-model="course.previewSecondField" maxlength="20" placeholder="概述2" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="课程封面" prop="courseListImg">
            <!--
            1. 组件需要根据绑定的数据进行图片预览
            2. 组件需要把上传成功的图片地址同步到绑定的数据中
            v-model 的本质还是父子组件通信
              1. 它会给子组件传递一个名字叫 value 的数据（Props）
              2. 默认监听 input 事件，修改绑定的数据（自定义事件）
            -->
            <course-image v-model="course.courseListImg" />
          </el-form-item>
          <el-form-item label="介绍封面" prop="courseImgUrl">
            <course-image v-model="course.courseImgUrl" />
          </el-form-item>
          <el-form-item label="课程排序" prop="sortNum">
            <el-input-number v-model="course.sortNum"  label="数字控制排序，数字越大越靠后"></el-input-number>
          </el-form-item>
        </div>
        <div v-show="active === 1">
          <el-form-item label="售卖价格" prop="discounts">
            <el-input placeholder="请输入课程售价" v-model.number="course.discounts" type="number">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价" prop="price">
            <el-input placeholder="请输入商品原价" v-model.number="course.price" type="number">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量" prop="sales">
            <el-input placeholder="请输入销量" v-model.number="course.sales" type="number">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签" prop="discountsTag">
            <el-input
              type="text"
              v-model="course.discountsTag"
              placeholder="请输入内容"
              maxlength="4"
              show-word-limit
            />
          </el-form-item>
        </div>
        <div v-show="active === 2">
          <el-form-item label="限时秒杀开关" prop="activityCourse">
            <el-switch
              v-model="course.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <div v-show="course.activityCourse">
            <el-form-item label="开始时间" prop="beginTime">
              <el-date-picker
                type="date"
                v-model="course.activityCourseDTO.beginTime"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                type="date"
                v-model="course.activityCourseDTO.endTime"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价" prop="amount">
              <el-input placeholder="请输入秒杀价" v-model.number="course.activityCourseDTO.amount" type="number">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存" prop="stock">
              <el-input placeholder="请输入秒杀库存" v-model.number="course.activityCourseDTO.stock" type="number">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div v-show="active === 3">
          <el-form-item label="课程详情" prop="courseDescriptionMarkDown">
            <!-- <el-input
              type="textarea"
              v-model="course.courseDescriptionMarkDown"
              placeholder="请输入内容"
            >
            </el-input> -->
            <text-editor v-model="course.courseDescriptionMarkDown" />
          </el-form-item>
          <el-form-item label="是否发布">
          <el-switch
            v-model="course.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-button v-if="active<3" @click="active++">下一步</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import CourseImage from './courseImage.vue'
import TextEditor from '@/components/textEditor/index.vue'
import { saveOrUpdateCourse, getCourseById } from '@/services/course'
export default Vue.extend({
  name: 'createOrUpdate',
  props: {
    courseId: {
      type: [String, Number]
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CourseImage,
    TextEditor
  },
  data () {
    return {
      steps: ['基本信息', '销售信息', '秒杀活动', '课程详情'],
      active: 0,
      course: {
        // id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: null,
        discounts: null,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: null,
        previewFirstField: '',
        previewSecondField: '',
        status: 0, // 0下架 1上架
        sales: null,
        activityCourse: false,
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: null,
          stock: null
        },
        autoOnlineTime: ''
      }
    }
  },
  created () {
    this.isEdit && this.loadCourse()
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById(this.courseId)
      const { activityCourseDTO } = data.data
      if (activityCourseDTO) {
        activityCourseDTO.beginTime = moment(activityCourseDTO.beginTime).format('YYYY-MM-DD')
        activityCourseDTO.endTime = moment(activityCourseDTO.beginTime).format('YYYY-MM-DD')
      }
      this.course = data.data
    },
    async handleSave () {
      const { data } = await saveOrUpdateCourse(this.course)
      console.log(data)
      if (data.code === '000000') {
        this.$message.success('添加课程成功')
        this.$router.back()
      }
    }
  }
})
</script>
