class BaseRequest {
    constructor() {

        /**
         * @type {string}
        */
        this.method;

        /**
         * @type {string}
        */
        this.path;

    }
}
module.exports = BaseRequest;