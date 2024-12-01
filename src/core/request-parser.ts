import { IncomingMessage } from "http";
import { BaseRequest } from "./model/base-request";

export class RequestParser {

    static parse(req: IncomingMessage): BaseRequest {
        const request = new BaseRequest();
        request.method = req.method;
        request.path = req.url;
        return request;
    }
}