'use strict'
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const userSchema = new Schema({
    email: { type: String, required: true },
    pass: { type: String, required: true, select: false }, // 默认不查询密码返回
    name: { type: String, required: true },
    avatar: { type: String, required: true, default: '/user' },
  }, { timestamps: true })
  return mongoose.model('User', userSchema)
}
