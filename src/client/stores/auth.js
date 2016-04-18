import request from "superagent";

let _user = null;
let _changeListeners = [];
let _initCalled = false;

const URLS = {
    AUTH: "/auth",
    SIGN_UP: "/signup",
};
function _postAndHandleParseUser(url, username, password, done) {
    request.post(url)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send({ username: username, password: password })
        .end(function(err, res) {
            if (!err && res.body && res.body.user) {
                _user = parseUser(res.body.user);
                /* eslint-disable no-use-before-define */
                // AuthStore.notifyChange();
                /* eslint-enable no-use-before-define */
            }
            if (done) {
                done(err, _user);
            }
        });
}

const AuthStore = {
    signUp: function(username, password, done) {
        _postAndHandleParseUser(URLS.SIGN_UP, username, password, done);
    }
};

export default AuthStore;
