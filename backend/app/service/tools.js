/*
 * @Author: your name
 * @Date: 2020-05-05 21:22:27
 * @LastEditTime: 2020-05-05 21:33:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /full/backend/app/service/tools.js
 */
'use strict'
const { Service } = require('egg')
const nodemail = require('nodemailer')
const userEmail = '18604418448@163.com'
const transport = nodemail.createTransport({
  service: '163',
  secureConnection: true,
  auth: {
    user: userEmail,
    pass: 'zy51110802',
  },
})
class ToolService extends Service {
  async sendMail(email, subject, text, html) {
    const mailOption = {
      from: userEmail,
      to: email,
      cc: userEmail,
      subject,
      text,
      html,
    }
    try {
      await transport.sendMail(mailOption)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
module.exports = ToolService