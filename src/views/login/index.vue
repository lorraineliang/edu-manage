<template>
  <div id="login">
    <div class="login-form">
      <h1>登录</h1>
      <el-form label-position="top" label-width="80px" :rules="rules"  ref="form" :model="form">
        <el-form-item label="手机号" prop="phone">
          <el-input placeholder="请输入手机号" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
          class="form-btn"
          type="primary"
          :loading="isLoading"
          @click="onSubmit"
        >
        登录
        </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { Form } from 'element-ui'
// import request from '@/utils/request'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'login',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      isLoading: false
    }
  },
  methods: {
    ...mapMutations([
      'setUser',
      'setCollapse'
    ]),
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        this.isLoading = true
        const { data } = await login(this.form)
        console.log(data)
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          this.$message.success('登录成功')
          this.setUser(data.content)
          this.setCollapse(false)
          this.$router.push(this.$route.query.redirect as string || '/')
        }
      } catch (err) {
        console.log(err)
      }
      this.isLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form {
    width: 300px;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    .form-btn {
      width: 100%;
    }
  }
}
</style>
