import { IncomingMessage } from "http";

export class BaseRequest {
    public method: string | undefined;
    public path: string | undefined;
}