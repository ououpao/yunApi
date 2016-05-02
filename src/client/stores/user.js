import request from "superagent";
const URLS = {
    USER: "/api/user",
    INVITE: "/api/user/invite",
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
    },
    acceptInvite(msgId, projectId, done) {
        request.post(URLS.INVITE)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                msgId: msgId,
                projectId: projectId
            })
            .end(function(err, res) {
                if (!err && res.body) {
                    done(err, res.body)
                }
            });
    },
}
export default UserStore;
