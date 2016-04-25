import request from "superagent";
const URLS = {
    All: '/api/project',
    CREATE: '/api/project/create',
    GETALL: '/api/project/list',
    DETAIL: '/api/project/detail',
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
    reomve: function(id, done) {
        request.del(`${URLS.All}/${id}`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .end(function(err, res) {
                done(err, res.body.detail);
            });
    },
    update: function(projectInfo, done) {
        request.put(`${URLS.All}/${projectInfo._id}`)
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
                done(err, res.body.list);
            });
    },
    getDetail: function(url, done) {
        request.get(URLS.DETAIL)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .query({
                url: url
            })
            .end(function(err, res) {
                done(err, res.body.detail);
            });
    }

};

export default ProjectStore;
