<template>
  <el-container>
  <div style="height:100vh">
    <layout-aside />
  </div>
  <el-container>
    <el-header>
      <layout-header />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutAside from './components/layout-aside.vue'
import LayoutHeader from './components/layout-header.vue'

export default Vue.extend({
  name: 'layout',
  components: {
    LayoutAside,
    LayoutHeader
  }
})
</script>

<style>
.el-container {
  min-height: 100vh;
}
.el-aside{
  background: #d3dce5;
}
.el-header{
  background: #b2c0d0;
}
.el-main{
  background: #e9eef2;
}
</style>
