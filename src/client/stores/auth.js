import request from "superagent";

let _user = null;
let _changeListeners = [];
let _initCalled = false;

const URLS = {
    AUTH: "/api/auth",
    SIGN_UP: "/api/signup",
    SIGN_OUT: "/api/signout",
};

const AuthStore = {
    init: function() {
        if (_initCalled) {
            return;
        }
        _initCalled = true;
        this.fetchUser();
    },
    fetchUser: function() {
        request.get(URLS.AUTH)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .end(function(err, res) {
                if (!err && res.body && res.body.user) {
                    _user = res.body.user;
                }
                AuthStore.notifyChange(res.body && res.body.user || null);
            });
    },
    getUser: function(){
        return _user;
    },
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
    notifyChange: function(user) {
        _changeListeners.forEach(function(listener) {
            listener(user);
        });
    },
    addChangeListener: function(listener) {
        _changeListeners.push(listener);
    },
    removeChangeListener: function(listener) {
        _changeListeners = _changeListeners.filter(function(l) {
            return listener !== l;
        });
    }
};

export default AuthStore;

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
                done(null, res.body.user);
                _user = res.body.user;
                AuthStore.notifyChange(res.body.user);
            } else {
                done(err, _user);
            }
        });
}
