'use strict'
const BaseController = require('./baseController')

class UtilController extends BaseController {
  async getCode() {
    const svgCaptcha = require('svg-captcha')
    const captcha = svgCaptcha.create()
    const { ctx } = this
    ctx.session.captcha = captcha.text
    console.log('code', captcha.text)
    ctx.type = 'svg'
    ctx.body = captcha.data
  }
  async getEmailCode() {
    const { ctx } = this
    const { email } = ctx.query
    const code = Math.random().toString().substring(2, 6)
    console.log('email:', email, 'code:', code)
    ctx.session.emailcode = code
    const subject = 'octopus验证码'
    const text = ''
    const html = `<h2>octopus社区</h2><a href="http://octopusrain.cn" >我的主页</a><br><p>您的验证码是：<b>${code}</b></p>`
    const hasSend = await this.service.tools.sendMail(email, subject, text, html)
    if (hasSend) {
      return this.success('发送成功')
    }
    return this.error('发送失败')
  }
}
module.exports = UtilController