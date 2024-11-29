const BaseRequest = require("./model/BaseRequest.js");
class RequestParser{

    /**
     * @return {BaseRequest}
     */
    static parse(req){
        let request = new BaseRequest();
        request.method = req.method;
        request.path = req.url;
        return request;
    }
}
module.exports = RequestParser;