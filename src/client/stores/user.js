import request from "superagent";
const URLS = {
    USER: "/api/user",
};

const UserStore = {
    getUserById(id, done) {
        request.get(`${URLS.USER}/${id}`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .end(function(err, res) {
                if (!err && res.body && res.body.user) {
                    done(err, res.body.user)
                }
            });
    }
}
export default UserStore;
