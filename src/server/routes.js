'use strict'
let router = require('koa-router')({
  prefix: '/api'
})
let authController = require('./controllers/auth')
let projectController = require('./controllers/project')
let apiController = require('./controllers/api')
let taskController = require('./controllers/task')

let secured = function*(next) {
  if (this.isAuthenticated()) {
    yield next
  } else {
    this.throw('未登录， 请重新登陆！', 401)
  }
}

module.exports = function(app) {
  router.get('/auth', authController.getCurrentUser)
  router.post('/auth', authController.signIn)
  router.get('/user/:id', authController.getUserById)
  router.put('/user/:id', authController.update)
  router.post('/user/invite', authController.accpetInvite)
  router.post('/user/reject', authController.rejectInvite)
  router.post('/user/addFriend', authController.addFriend)
  router.get('/u/:id/getFriends', authController.getFriends)

  router.all('/signout', authController.signOut)
  router.post('/signup', authController.createUser)

  router.get('/project/list', secured, projectController.getProjectList)
  router.get('/project/:url/api', secured, projectController.getApiList)
  router.get('/project/:url/task', secured, projectController.getTaskList)
  router.get('/project/:url/member', secured, projectController.getMemberList)
  router.get('/project/detail', secured, projectController.getDetail)
  router.post('/project/create', secured, projectController.create)
  router.post('/project/invite', secured, projectController.inviteMember)
  router.del('/project/:id', secured, projectController.remove)
  router.put('/project/:id', secured, projectController.update)

  router.post('/project/:url/api', secured, apiController.create)
  router.post('/api/:id/addComment', secured, apiController.addComment)
  router.get('/api/:id', secured, apiController.getDetail)
  router.put('/api/:id', secured, apiController.update)
  router.del('/api/:id', secured, apiController.remove)

  router.post('/project/:url/task', secured, taskController.create)

  app.use(router.routes())
}
