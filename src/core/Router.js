const Route = require("./model/Route.js");
const BaseRequest = require("./model/BaseRequest.js");
const DIManager = require("./DIManager.js");

class Router {

    /**
    * @type {DIManager}
    */
    static diManager = null;

    /**
    * @type {Route[]}
    */
    static routeArray = null;


    /**
     * @param {DIManager} diManager 
    */
    constructor(diManager) {
        Router.diManager = diManager;
    }

    /**
     * @param {string} path 
     * @param {Array} callable 
    */
    static get(path, callable) {
        this.register(path, callable, 'GET');
    }

    /**
     * @param {string} path 
     * @param {Array} callable 
    */
    static post(path, callable) {
        this.register(path, callable, 'POST');
    }


    /**
     * @param {string} path 
     * @param {Array} callable 
     * @param {string} method 
    */
    static register(path, callable, method) {
        console.log("router/register/callable0 ", callable[0]);
        let controller = this.diManager.resolve(callable[0]);
        let action = callable[1];

        let route = new Route(path, [controller, action], method);
        console.log(route);
        this.routeArray.push(route);
    }

    /**
     * @param {BaseRequest} request 
    */
    route(request) {
        let method = request.method;
        let page = request.path;

        this.routeArray.forEach(item => {
            if (item.path === method && item.path === page) {
                console.log("burda çözümlenecek ve çalışacak.");
            }
        })
    }
}

module.exports = Router;