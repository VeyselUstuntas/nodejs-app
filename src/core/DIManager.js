
class DIManager {
    /**
     * @type Object[]
    */
    static instances = [];

    /**
     * @param {string} className
     * @return {Object|null}
    */
    static findInstance(className) {
        let instanceResult = null;
        DIManager.instances.forEach((instance) => {
            if (instance.constructor.name == className) {
                instanceResult = instance;
            }
        });
        return instanceResult;
    }


    static resolve(className) {
        /**
         * @type {Object|null}
        */
        let instance = DIManager.findInstance(className);
        console.log("DIManager/resolve instance:", instance);

        if (instance !== null) {
            return instance;
        }

        let constructor = Reflect.has(className, "constructor");
        console.log("prp:",Reflect.get(className));

        if (constructor === false) {
            let newInstance = Reflect.construct(className);
            DIManager.instances.push(newInstance);
            return newInstance;
        }

        let parameters = Reflect.ownKeys(className);
        console.log("PARAMETERS:",parameters);


        if (parameters.length === 0) {
            let newInstance = Reflect.construct(className);
            DIManager.instances.push(newInstance);
            return newInstance;
        }

        let newInstanceParams = [];
        parameters.forEach((item) => {
            let param = className[item];
            console.log("DIManager/resolve recursive param:",param);
            console.log("DIManager/resolve recursive param type:",typeof param);

            if (typeof param === 'function') { // parametrenin class olup olmadığı kontrolü
                console.log("DIManager/resolve recursive param:",param);
                newInstanceParams.push(DIManager.resolve(param));
            }
        });


        let generatedInstance = Reflect.construct(className, newInstanceParams);
        DIManager.instances.push(generatedInstance);


        console.log("DIManager/resolve return instance:", generatedInstance);

        return generatedInstance;
    }
}
module.exports = DIManager;