class Request {
    /**
     * @param {Request} request
    */
    constructor(request) {

        this.method = request.method;
        this.url = request.url;
    }
}