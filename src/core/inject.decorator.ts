import "reflect-metadata";

function Inject() {
    return function (target: any, propKey: any) {
        const type = Reflect.getMetadata("design:type", target, propKey);
        Reflect.defineMetadata("prop", type, target, propKey);
        console.log("inject dec. ",Reflect.getMetadata("prop",target, propKey));
    };
}
export default Inject;