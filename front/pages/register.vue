<!--
 * @Descripttion:
 * @Author: octopus
 * @Date: 2020-05-04 16:43:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-05 21:31:36
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
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" autocomplete="off" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" autocomplete="off" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button @click.native.prevent="register" type="primary">
          提交
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
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: 'octopus',
        email: '857358156@qq.com',
        pass: '',
        checkPass: '',
        code: ''
      },
      rules: {
        name: [{ required: true }],
        email: [{ required: true }, { type: 'email', message: '请输入正确的邮箱' }],
        code: [{ required: true }],
        pass: [{ validator: validatePass, trigger: 'blur', required: true }],
        checkPass: [{ validator: validatePass2, trigger: 'blur', required: true }]
      },
      codeImg: '/api/utils/code'
    }
  },
  methods: {
    register() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const params = this.ruleForm
          const res = await this.$http.post('/api/user/register', params)
          if (res.code === 0) {
            this.$alert('成功', {
              type: 'sucess',
              title: '注册成功',
              confirmButtonText: '去登陆',
              callback: () => {
                this.$router.push('/login')
              }
            })
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