'use strict';
var router = require('koa-router')();
var authController = require('./controllers/auth');
var projectController = require('./controllers/project');

var secured = function *(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    this.throw('未登录， 请重新登陆！', 401);
  }
};

module.exports = function(app, passport) {
  // register functions
  // router.use(function *(next) {
  //   this.type = 'json';
  //   yield next;
  // });

  router.get('/api/auth', authController.getCurrentUser);
  router.post('/api/auth', authController.signIn);
  
  router.all('/api/signout', authController.signOut);
  router.post('/api/signup', authController.createUser);

  router.post('/api/project/create', secured, projectController.createProject);
  router.get('/api/project/list', secured, projectController.getALl);

  app.use(router.routes());
};
