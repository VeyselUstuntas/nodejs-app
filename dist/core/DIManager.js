"use strict";
var DIManager = /** @class */ (function () {
    function DIManager() {
    }
    DIManager.findInstance = function (className) {
        var instanceResult = null;
        DIManager.instances.forEach(function (instance) {
            if (instance.constructor.name == className.toString()) {
                instanceResult = instance;
            }
        });
        return instanceResult;
    };
    DIManager.resolve = function (className) {
        var instance = DIManager.findInstance(className);
        console.log("DIManager/resolve instance:", instance);
        if (instance !== null) {
            return instance;
        }
        var constructor = Reflect.has(className, "constructor");
        console.log("prp:", Reflect.get(className, "constructor"));
        if (constructor === false) {
            var newInstance = Reflect.construct(className, []);
            DIManager.instances.push(newInstance);
            return newInstance;
        }
        var parameters = Reflect.ownKeys(className);
        console.log("PARAMETERS:", parameters);
        if (parameters.length === 0) {
            var newInstance = Reflect.construct(className, []);
            DIManager.instances.push(newInstance);
            return newInstance;
        }
        var newInstanceParams = [];
        parameters.forEach(function (item) {
            var param = className.prototype[item];
            console.log("DIManager/resolve recursive param:", param);
            console.log("DIManager/resolve recursive param type:", typeof param);
            if (typeof param === 'function') { // parametrenin class olup olmadığı kontrolü
                console.log("DIManager/resolve recursive param:", param);
                newInstanceParams.push(DIManager.resolve(param));
            }
        });
        var generatedInstance = Reflect.construct(className, newInstanceParams);
        DIManager.instances.push(generatedInstance);
        console.log("DIManager/resolve return instance:", generatedInstance);
        return generatedInstance;
    };
    DIManager.instances = [];
    return DIManager;
}());
module.exports = DIManager;
