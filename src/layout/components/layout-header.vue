<template>
  <div class="header">
    <div style="display: flex;align-items: center;">
      <div style="margin-right:10px">
        <i class="el-icon-s-unfold" style="font-size:26px" @click="handleCollape" v-if="isCollapse"></i>
        <i class="el-icon-s-fold" style="font-size:26px" @click="handleCollape" v-else></i>
      </div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
            v-for="(item ,index) in routerList"
            :key="index"
          >
            {{ item.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
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
      userInfo: {},
      isCollapse: false
    }
  },
  computed: {
    routerList () {
      const temp: Array<any> = []
      let temps: Array<any> = []
      const { path: routePath, matched } = this.$route
      matched.filter((item) => {
        if (item.meta.title) {
          const { path, meta, name } = item
          const routeItem = { path: meta.title === '首页' ? '/' : path, title: meta.title, name, isActive: routePath === path || false }
          temp.push(routeItem)
        }
      })
      temps = temp.filter(function (item, index, self) {
        return self.findIndex(el => el.title === item.title) === index
      })
      return temps
    }

  },
  created () {
    this.getUserInfo()
    this.getUserInfo()
  },
  methods: {
    ...mapMutations([
      'setUser',
      'setCollapse'
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
    },
    handleCollape () {
      this.isCollapse = !this.isCollapse
      this.setCollapse(this.isCollapse)
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::v-deep .el-breadcrumb__separator {
  color: #545c63;
}
::v-deep .el-breadcrumb__inner .is-link {
  font-weight: bold;
  text-decoration: none;
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: #303133;
}

</style>
