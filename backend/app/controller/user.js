'use strict'
const BaseController = require('./baseController')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const hashSalt = '@octopusrain.cn!'
const creatRule = {
  email: { type: 'email' },
  name: { type: 'string' },
  code: { type: 'string' },
  pass: { type: 'string' },
}
class UserController extends BaseController {
  async login() {
    const { ctx } = this
    const { email, name, code, pass, emailcode } = ctx.request.body
    // 校验验证码
    if (code.toString().toUpperCase() !== ctx.session.captcha.toString().toUpperCase()) {
      return this.error('验证码错误')
    }
    // 校验邮箱验证码
    if (emailcode !== ctx.session.emailcode) {
      return this.error('邮箱验证码错误')
    }
    // 校验邮箱是否存在
    const user = await ctx.model.User.findOne({
      email,
      pass: md5(pass + hashSalt),
    })
    if (!user) {
      return this.error('用户名或密码错误')
    }
    const token = await this.getToken({ email })

    return this.success({ token, email, name })
  }
  async register() {
    const { ctx } = this
    const { email, name, code, pass } = ctx.request.body
    try {
      // 校验参数规则
      ctx.validate(creatRule)
      // return this.success('成功')
    } catch (error) {
      return this.error('参数检验失败' + error.errors)
    }
    // 校验验证码
    if (code.toString().toUpperCase() !== ctx.session.captcha.toString().toUpperCase()) {
      return this.error('验证码错误')
    }
    // 校验邮箱是否存在
    if (await this.checkEmail(email)) {
      return this.error('邮箱重复')
    }
    await ctx.model.User.create({ email, name, pass: md5(pass + hashSalt) })
    return this.success({ email, name })
  }
  async getUserInfo() {
    const { ctx } = this
    const { email } = ctx.state
    const user = await this.checkEmail(email)
    console.log('user', user)
    if (!user) {
      return this.error('token过期')
    }
    return this.success(user)
  }
  async checkEmail(email) {
    const user = await this.ctx.model.User.findOne({ email })
    return user
  }
  async getToken(data) {
    const { app } = this
    const token = jwt.sign(data, app.config.jwt.secret, { expiresIn: '1h' })
    return token
  }
}
module.exports = UserController