'use strict'
const { Controller } = require('egg')

class BaseController extends Controller {
  success(data) {
    const code = 0
    this.ctx.body = {
      data,
      code,
      message: '',
    }
    return
  }
  error(message) {
    const code = -1
    this.ctx.body = {
      code,
      message,
      data: {},
    }
    return
  }
}
module.exports = BaseController