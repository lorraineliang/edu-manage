<template>
<div id="header">
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="30" :src="userInfo.portrait || require('@/assets/default-avatar.png')"></el-avatar>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
      <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { getUserInfo } from '@/services/user'
export default Vue.extend({
  name: 'layout-header',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.getUserInfo()
    this.getUserInfo()
  },
  methods: {
    ...mapMutations([
      'setUser'
    ]),
    async getUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },
    logout () {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.setUser(null)
        // 跳转到登录页面
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
})
</script>

<style lang="scss">
#header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
