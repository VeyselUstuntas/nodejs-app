import { DIManager } from "./di-manager";
import { BaseRequest } from "./model/base-request";
import { Route } from "./model/route";


export class Router {

    static routes: Route[] = [];

    static get(path: string, callable: any[]) {
        Router.register(path, callable, 'GET');
    }


    static post(path: string, callable: any[]) {
        Router.register(path, callable, 'POST');
    }



    static register(path: string, callable: any[], method: string) {
        let controller = DIManager.resolve(callable[0]);
        let action = callable[1];

        let route = new Route(path, [controller, action], method);
        // console.log(route);
        Router.routes.push(route);
    }

    route(request: BaseRequest) {
        let method: string | undefined = request.method;
        let page: string | undefined = request.path;
        if (page) {
            page = page.replace('/', '');
        }

        Router.routes.forEach(item => {

            if (item.method === method && item.path === page) {
                let instance = item.callable[0];
                let action = item.callable[1];
                const callable = action.bind(instance);
                callable();
            }

        })
    }
}
