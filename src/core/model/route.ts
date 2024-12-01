export class Route {
    public path: string;
    public method: string;
    public callable: Function[];

    constructor(path: string, callable: any[], method: string) {
        this.method = method;

        this.path = path;

        this.callable = callable;
    }
}
