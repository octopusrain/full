// 解析jwt 也可以使用egg-jwt中间件
'use strict'
const jwt = require('jsonwebtoken')
module.exports = ({ app }) => {
  return async function verify(ctx, next) {
    const { token } = ctx.request.query
    if (!token) {
      ctx.body = {
        code: -1,
        message: '用户未登录',
      }
      return
    }
    try {
      const res = jwt.verify(token, app.config.jwt.secret)
      console.log(res)
      ctx.state.email = res.email
    } catch (error) {
      ctx.body = {
        code: -1,
        message: '用户信息出错',
      }
    }
    await next()
  }
}
