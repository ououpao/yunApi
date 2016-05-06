import request from "superagent";
const URLS = {
    LIST: 'api/project',
    ADDCOMMENT: 'api/addComment'
};

const ApiStore = {
    create(projectUrl, apiInfo, done) {
        request.post(`api/project/${projectUrl}/task`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                name: apiInfo.name,
                detail: apiInfo.detail,
                startTime: apiInfo.startTime,
                endTime: apiInfo.endTime,
                reciver: apiInfo.reciver
            })
            .end(function(err, res) {
                done(err, res.body);
            });
    },
    remove(projectUrl, id, done) {
        request.del(`/api/api/${id}`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .end(function(err, res) {
                done(err, res.body);
            });
    }
};

export default ApiStore;
