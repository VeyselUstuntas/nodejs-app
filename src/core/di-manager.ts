import "reflect-metadata";

export class DIManager {
    private static container = new Map<string, any>();

    static resolve<T>(target: any): T {
        if (DIManager.container.has(target.name)) {
            return DIManager.container.get(target.name);
        }
        const tokens = Reflect.getMetadata("prop", target) || [];
        console.log("tokens:", tokens);

        const injections = tokens.map((token: any): any =>
            DIManager.resolve(token)
        );
        // console.log(injections);
        const instance = new target(...injections);
        DIManager.container.set(target.name, instance);
        return instance;
    }
}