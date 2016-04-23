import request from "superagent";

let _user = null;
let _changeListeners = [];
let _initCalled = false;

const URLS = {
    AUTH: "/api/auth",
    SIGN_UP: "/api/signup",
    SIGN_OUT: "/api/signout",
};

function _postAndHandleParseUser(url, user, done) {
    request.post(url)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send({ 
            username: user.username, 
            password: user.password,
            email: user.email 
        })
        .end(function(err, res) {
            if (!err && res.body && res.body.user) {
                // 注册成功处理逻辑
                // _user = parseUser(res.body.user);
                /* eslint-disable no-use-before-define */
                // AuthStore.notifyChange();
                /* eslint-enable no-use-before-define */
            }
            if (done) {
                // 注册失败处理逻辑
                done(err, _user);
            }
        });
}

const AuthStore = {
    signUp: function(user, done) {
        _postAndHandleParseUser(URLS.SIGN_UP, user, done);
    },
    signIn: function(user, done) {
        _postAndHandleParseUser(URLS.AUTH, user, done);
    },
    signOut: function(done) {
        _user = null;
        request.get(URLS.SIGN_OUT)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .end(function(err, res) {
                if (!err) {
                    // AuthStore.notifyChange();
                }
                if (done) {
                    done(null, res);
                }
            });
    },
};

export default AuthStore;
