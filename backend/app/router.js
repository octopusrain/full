'use strict'
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const jwt = app.middleware.jwt({ app })
  const {
    router,
    controller,
  } = app
  router.get('/', controller.home.index)
  router.get('/utils/code', controller.utils.getCode)
  router.get('/utils/emailcode', controller.utils.getEmailCode)
  router.get('/user/info', jwt, controller.user.getUserInfo)
  router.post('/user/register', controller.user.register)
  router.post('/user/login', controller.user.login)
}