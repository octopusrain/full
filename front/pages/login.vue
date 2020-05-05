<!--
 * @Descripttion:
 * @Author: octopus
 * @Date: 2020-05-04 16:43:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-05 21:31:26
-->
<template>
  <div class="login-wrap">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      label-width="100px"
      status-icon
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item>
        <img @click="handleChangeCode" :src="codeImg" class="code-img" alt="">
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="ruleForm.code" />
      </el-form-item>
      <el-form-item label="邮箱验证码" prop="emailcode">
        <el-input v-model="ruleForm.emailcode" />
        <el-button @click="sendCode" :disabled="timer>0" v-html="codeTxt" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" autocomplete="off" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button @click.native.prevent="login" type="primary">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      ruleForm: {
        name: 'octopus',
        email: '857358156@qq.com',
        pass: '',
        code: '',
        emailcode: ''
      },
      rules: {
        name: [{ required: true }],
        email: [{ required: true }, { type: 'email', message: '请输入正确的邮箱' }],
        code: [{ required: true }],
        emailcode: [{ required: true }],
        pass: [{ validator: validatePass, trigger: 'blur', required: true }]
      },
      codeImg: '/api/utils/code',
      timer: 0
    }
  },
  computed: {
    codeTxt() {
      return this.timer <= 0 ? '发送邮件' : `${this.timer}s后获取`
    }
  },
  methods: {
    sendCode() {
      this.timer = 10
      setInterval(() => {
        this.timer -= 1
        if (this.timer <= 0) {
          clearInterval()
        }
      }, 1000)
      this.$http.get('/api/utils/emailcode?email=' + this.ruleForm.email)
    },
    login() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const params = this.ruleForm
          const res = await this.$http.post('/api/user/login', params)
          if (res.code === 0) {
            window.localStorage.setItem('token', res.data.token)
            this.$router.push('/')
          } else {
            this.$message.error(res.message)
          }
        } else {
          this.$message.error('检验失败')
        }
      })
    },
    handleChangeCode() {
      this.codeImg = '/api/utils/code?v=' + new Date().getTime()
    }
  }
}
</script>