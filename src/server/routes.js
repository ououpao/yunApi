'use strict';
var router = require('koa-router')({
    prefix: '/api'
});
var authController = require('./controllers/auth');
var projectController = require('./controllers/project');

var secured = function*(next) {
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

    router.get('/auth', authController.getCurrentUser);
    router.post('/auth', authController.signIn);

    router.all('/signout', authController.signOut);
    router.post('/signup', authController.createUser);

    router.post('/project/create', secured, projectController.createProject);
    router.get('/project/list', secured, projectController.getALl);
    router.get('/project/detail', secured, projectController.getDetail);
    router.del('/project/:id', secured, projectController.remove);

    app.use(router.routes());
};
