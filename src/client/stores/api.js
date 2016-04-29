import request from "superagent";
const URLS = {
    LIST: 'api/project'
};

const ApiStore = {
    getList(projectUrl, done) {
        request.get(`api/project/${projectUrl}/api`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .end(function(err, res) {
                done(err, res.body.list);
            });
    },
    getDetail(projectUrl, id, done) {
        request.get(`api/project/${projectUrl}/api/${id}`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .end(function(err, res) {
                done(err, res.body.detail);
            });
    },
    create(projectUrl, apiInfo, done) {
        console.log(projectUrl);
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
                done(err, res.body.detail);
            });
    },
    remove(projectUrl, id, done) {
        request.del(`api/project/${projectUrl}/api/${id}`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .end(function(err, res) {
                done(err, res.body);
            });
    },
    update() {}
};

export default ApiStore;
