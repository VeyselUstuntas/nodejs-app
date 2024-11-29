class Route {
    /**
     * @param {string} path 
     * @param {Array} callable 
     * @param {string} method 
    */
    constructor(path, callable, method) {
        /**
         * @type {string}
        */
        this.method = method;

        /**
         * @type {string}
        */
        this.path = path;

        /**
         * @type {Array}
        */
        this.callable = callable;
    }
}

module.exports = Route;