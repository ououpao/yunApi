'use strict';
var router = require('koa-router')({
    prefix: '/api'
});
var authController = require('./controllers/auth');
var projectController = require('./controllers/project');
var apiController = require('./controllers/api');

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

    router.get('/project/list', secured, projectController.getALl);
    router.get('/project/detail', secured, projectController.getDetail);
    router.post('/project/create', secured, projectController.createProject);
    router.del('/project/:id', secured, projectController.remove);
    router.put('/project/:id', secured, projectController.update);

    router.get('/project/:url/api', secured, apiController.getList);
    router.get('/project/:url/api/:id', secured, apiController.getDetail);
    router.post('/project/:url/api', secured, apiController.addApi);
    router.put('/project/:url/api', secured, apiController.updateApi);
    router.del('/project/:url/api', secured, apiController.removeApi);

    app.use(router.routes());
};
