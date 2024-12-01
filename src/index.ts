import { IncomingMessage, ServerResponse } from "http";
import { UserController } from "./controllers/user-controller";
import { BaseRequest } from "./core/model/base-request";
import { RequestParser } from "./core/request-parser";
import { Router } from "./core/router";
import http from 'http';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const request: BaseRequest = RequestParser.parse(req);
    let router = new Router();

    Router.get("users", [UserController, UserController.prototype.getAllUser]);


    router.route(request);
    res.end();
});

server.listen(3000, () => {
    console.log("node.js server at port 3000");
});