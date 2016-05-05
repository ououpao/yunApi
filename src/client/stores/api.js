import request from "superagent";
const URLS = {
    LIST: 'api/project',
    ADDCOMMENT: 'api/addComment'
};

const ApiStore = {
    create(projectUrl, apiInfo, done) {
        request.post(`api/project/${projectUrl}/api`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                name: apiInfo.name,
                url: apiInfo.url,
                detail: apiInfo.detail,
                method: apiInfo.method,
                members: apiInfo.noAccessMembers,
                requestBody: apiInfo.requestBody,
                responseBody: apiInfo.responseBody
            })
            .end(function(err, res) {
                done(err, res.body.detail);
            });
    },
    update(id, apiInfo, done) {
        request.put(`api/api/${id}`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                name: apiInfo.name,
                url: apiInfo.url,
                detail: apiInfo.detail,
                method: apiInfo.method,
                members: apiInfo.members,
                requestBody: apiInfo.requestBody,
                responseBody: apiInfo.responseBody
            })
            .end(function(err, res) {
                done(err, res.body.detail);
            });
    },
    getDetail(projectUrl, id, done) {
        request.get(`/api/api/${id}`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .end(function(err, res) {
                done(err, res.body.detail);
            });
    },
    remove(projectUrl, id, done) {
        request.del(`/api/api/${id}`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .end(function(err, res) {
                done(err, res.body);
            });
    },
    addComment(id, comment, done) {
        request.post(`/api/api/${id}/addComment`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                comment: comment
            })
            .end(function(err, res) {
                done(err, res.body.data.comment);
            });
    }

};

export default ApiStore;
