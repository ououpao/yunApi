"use strict"
let passport = require("koa-passport")
let User = require("mongoose").model("User")
let ProjectStore = require("mongoose").model("Project")
let inviteMsgStore = require("mongoose").model("inviteMsg")

exports.signIn = function*() {
  var _this = this
  yield * passport.authenticate("local", function*(err, user) {
    if (!!err) {
      _this.throw(err, 400)
    }
    if (user) {
      yield _this.login(user)
      _this.body = { user: user }
    }
  }).call(this)
}

exports.signOut = function*() {
  this.logout()
  this.session = null
  this.status = 204
}

exports.createUser = function*(next) {
  if (!this.request.body) {
    this.throw("注册信息不能为空！", 400)
  }
  if (!this.request.body.username) {
    this.throw("用户名不能为空！", 400)
  }
  if (!this.request.body.password) {
    this.throw("密码不能为空！", 400)
  }
  if (!this.request.body.email) {
    this.throw("电子邮箱不能为空！", 400)
  }

  var User = require("mongoose").model("User")

  var user = yield User.findOne({ email: this.request.body.email }).exec()
  if (!user) {
    try {
      var user = new User({
        username: this.request.body.username,
        password: this.request.body.password,
        email: this.request.body.email,
        time: new Date()
      })
      user = yield user.save()
      // yield this.login(user)
    } catch (err) {
      this.throw(err)
    }
    let _this = this
    this.status = 200
    this.body = { user: user }
  } else {
    this.throw("该邮箱已存在！", 400)
  }
}

exports.getCurrentUser = function*() {
  if (this.passport.user) {
    this.body = { user: this.passport.user }
  }
  this.status = 200
}
exports.update = function*() {
  let uid = this.params.id
  let user = User.findOneAndUpdate({ _id: uid }, {
    username: this.request.body.user.name
  }).exec()
  this.status = 200
  this.body = {
    user: user
  }
}
exports.getUserById = function*() {
  var User = require("mongoose").model("User")
  var user = yield User
    .findOne({ _id: this.params.id })
    .populate('friends')
    .exec()
  this.status = 200
  this.body = { user: user }
}
exports.accpetInvite = function*() {
  let body = this.request.body,
    msgId = body.msgId,
    projectId = body.projectId
  let user = this.passport.user
  let project = yield ProjectStore.findOne({ _id: projectId }).exec()
  // 更新信息状态
  inviteMsgStore.findOneAndUpdate({ _id: msgId }, { isTimeout: true }).exec()
  // 在项目中添加成员
  yield project.update({
    '$push': {
      members: user
    }
  }).exec()
  // 更新该用户项目表
  yield user.update({
    '$push': {
      inviteProjects: project
    }
  }).exec()
  this.status = 200
  this.body = {
    status: 'success',
    data: {
      projectUrl: project.url,
      msg: '加入成功!'
    }
  }
}
exports.rejectInvite = function*() {
  let body = this.request.body,
    msgId = body.msgId
  // 更新信息状态
  inviteMsgStore.findOneAndUpdate({ _id: msgId }, { isTimeout: true }).exec()
  // 在项目中添加成员
  this.status = 200
  this.body = {
    status: 'success',
    data: {
      msg: '操作成功!'
    }
  }
}
exports.addFriend = function*() {
  let userId = this.request.body.userId
  let user = this.passport.user
  let friend = yield User.findOne({ _id: userId }).exec()
  if (friend) {
    yield user.update({
      '$push': {
        'friends': friend
      }
    })
  }
  this.status = 200
  this.body = {
    status: 'success',
    msg: '添加成功！'
  }
}
exports.getFriends = function*() {
  let userId = this.params.id
  let friends = yield User
    .findOne({ _id: userId })
    .populate('friends')
    .exec()
  this.status = 200
  this.body = friends.friends
}
