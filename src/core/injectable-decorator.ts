import "reflect-metadata";

function Injectable() {
    return function (target: any) {
        console.log('tar', target.constructor);
        const type = Reflect.getMetadata("design:type", target);
        Reflect.defineMetadata("class", true, target);

        console.log('ttt,type', type);
        // console.log('aaa,all', Reflect.getMetadata('design:paramtypes', target));
        console.log('aaa,all', Reflect.getOwnMetadata('design:paramtypes', target));

    };
}
export default Injectable;