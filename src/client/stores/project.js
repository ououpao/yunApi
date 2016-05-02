import request from "superagent";
const URLS = {
    All: '/api/project',
    CREATE: '/api/project/create',
    GETALL: '/api/project/list',
    DETAIL: '/api/project/detail',
    ADDAPI: '/api/project/addapi',
    INVITE: '/api/project/invite'
};

const ProjectStore = {
    create(projectInfo, done) {
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
                done(err, res.body.project);
            });
    },
    reomve(id, done) {
        request.del(`${URLS.All}/${id}`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .end(function(err, res) {
                done(err, res.body.detail);
            });
    },
    update(projectInfo, done) {
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
                done(err, res.body.detail);
            });
    },
    getAll(done) {
        request.get(URLS.GETALL)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .end(function(err, res) {
                done(err, res.body.list);
            });
    },
    getDetail(url, done) {
        request.get(URLS.DETAIL)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .query({
                url: url
            })
            .end(function(err, res) {
                done(err, res.body.detail);
            });
    },
    addApi(projectUrl, apiInfo, done) {
        request.post(`api/project/${projectUrl}/api`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                name: apiInfo.name,
                url: apiInfo.url,
                detail: apiInfo.detail,
                method: apiInfo.method,
                requestBody: apiInfo.requestBody,
                responseBody: apiInfo.responseBody
            })
            .end(function(err, res) {
                done(err, res);
            });
    },
    inviteUser(email, projectUrl, done){
        request.post(URLS.INVITE)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                email: email,
                projectUrl: projectUrl
            })
            .end(function(err, res) {
                done(err, res);
            });
    }
};

export default ProjectStore;
