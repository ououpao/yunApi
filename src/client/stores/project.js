import request from "superagent";
const URLS = {
    CREATE: "/api/project/create"
};

const ProjectStore = {
    create: function(projectInfo, done) {
        request.post(URLS.CREATE)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                name: projectInfo.name,
                detail: projectInfo.detail,
                members: projectInfo.members
            })
            .end(function(err, res) {
                // if (!err && res.body && res.body.user) {
                //     done(null, res.body.user);
                //     _user = res.body.user;
                // } else {
                //     done(err, _user);
                // }
                done(err, res);
            });
    }

};

export default ProjectStore;
