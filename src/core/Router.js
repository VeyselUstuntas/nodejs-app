const Route = require("./model/Route.js");
const BaseRequest = require("./model/BaseRequest.js");
const DIManager = require("./DIManager.js");

class Router {

    /**
    * @type {Route[]}
    */
    static routes = [];

    /**
     * @param {string} path 
     * @param {Array} callable 
    */
    static get(path, callable) {
        Router.register(path, callable, 'GET');
    }

    /**
     * @param {string} path 
     * @param {Array} callable 
    */
    static post(path, callable) {
        Router.register(path, callable, 'POST');
    }


    /**
     * @param {string} path 
     * @param {Array} callable 
     * @param {string} method 
    */
    static register(path, callable, method) {
        // console.log("router/register/callable0 ", callable[0]);
        let controller = DIManager.resolve(callable[0]);
        let action = callable[1];

        let route = new Route(path, [controller, action], method);
        // console.log(route);
        Router.routes.push(route);
    }

    /**
     * @param {BaseRequest} request 
    */
    route(request) {
        let method = request.method;
        let page = request.path;

        Router.routes.forEach(item => {
            if (item.method === method && item.path === page) {
                // console.log("burda çözümlenecek ve çalışacak.");
                let controller = item.callable[0];
                let action = item.callable[1];

                let instance = new controller();
                const deneme = instance[action]();
                console.log(deneme);
            }
        })
    }
}

module.exports = Router;