import request from "superagent";
const URLS = {
    CREATE: "/api/project/create",
    GETALL: '/api/project/list'
};

const ProjectStore = {
    create: function(projectInfo, done) {
        request.post(URLS.CREATE)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                name: projectInfo.name,
                url: projectInfo.url,
                detail: projectInfo.detail,
                members: projectInfo.members
            })
            .end(function(err, res) {
                done(err, res);
            });
    },
    getAll: function(done) {
        request.get(URLS.GETALL)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .end(function(err, res) {
                done(err, res);
            });
    }

};

export default ProjectStore;
