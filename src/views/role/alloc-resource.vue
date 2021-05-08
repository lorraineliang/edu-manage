<template>
  <div id="alloc-resource">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
      <span>分配资源</span>
    </div>
      <el-tree
      :data="resources"
      :props="defaultProps"
      :default-checked-keys="checkedKeysList"
      ref="menuTree"
      node-key="id"
      show-checkbox
      default-expand-all
    ></el-tree>
    <div style="text-align:center;margin-top:20px">
      <el-button @click="resetChecked">清空</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
    </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourceCategories } from '@/services/resource-category'
import { Tree } from 'element-ui'
export default Vue.extend({
  name: 'alloc-resource',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      resources: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeysList: []
    }
  },
  created () {
    this.loadResources()
    // this.loadRoleMenus()
  },
  methods: {
    // async loadRoleMenus () {
    //   const { data } = await getRoleMenus(this.roleId)
    //   console.log(data)
    //   this.getCheckedRole(data.data)
    // },
    // getCheckedRole (menus: any) {
    //   menus.forEach((i: any) => {
    //     if (i.selected) {
    //       console.log(i.id)
    //       this.checkedKeysList = [...this.checkedKeysList, i.id] as any
    //     }
    //     if (i.subMenuList) {
    //       this.getCheckedRole(i.subMenuList)
    //     }
    //   })
    // },
    async loadResources () {
      const { data } = await getResourceCategories()
      console.log(data)
    },
    // async onSave () {
    //   const menuIdList = (this.$refs.menuTree as Tree).getCheckedKeys()
    //   console.log(menuIdList)
    //   const { data } = await allocateRoleMenus({
    //     roleId: this.roleId,
    //     menuIdList
    //   })
    //   this.$message.success('操作成功')
    //   if (data.code === '000000') {
    //     this.$router.back()
    //   }
    // },
    resetChecked () {
      (this.$refs.menuTree as Tree).setCheckedKeys([])
    }
  }

})
</script>

<style>

</style>
