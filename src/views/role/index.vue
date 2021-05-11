<template>
  <div class="role">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button @click="handleAdd">添加角色</el-button>
    </div>
    <role-list :needRefresh="needRefresh" @refresh="refresh" @isEdit="isEdit" />
    <el-dialog :title="isAdd?'添加角色':'编辑角色'" width="40%" :visible.sync="dialogFormVisible">
      <create-or-edit
        v-if="dialogFormVisible"
        :roleData="roleData"
        @closeDialog="closeDialog"
      />
    </el-dialog>
  </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RoleList from './components/list.vue'
import CreateOrEdit from './components/createOrEdit.vue'
export default Vue.extend({
  name: 'RoleIndex',
  components: {
    RoleList,
    CreateOrEdit
  },
  data () {
    return {
      dialogFormVisible: false,
      needRefresh: false,
      isAdd: false,
      roleData: {}
    }
  },
  methods: {
    handleAdd () {
      this.roleData = {}
      this.dialogFormVisible = true
      this.isAdd = true
    },
    refresh (val: boolean) {
      this.needRefresh = val
    },
    closeDialog (val: any) {
      this.dialogFormVisible = false
      this.needRefresh = val
      this.roleData = {}
    },
    isEdit (val: any) {
      this.dialogFormVisible = true
      this.isAdd = false
      this.roleData = val
    }
  }
})
</script>

<style lang="scss" scoped></style>
