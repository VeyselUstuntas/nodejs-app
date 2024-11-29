class DIManager {
    /**
     * @type Object[]
    */
    #instances;
    constructor() {
        this.#instances = [];
    }

    /**
     * @param {string} className
     * @return {Object|null}
    */
    findInstance(className) {
        let instanceResult = null;
        this.#instances.forEach((instance) => {
            if (instance.constructor.name == className) {
                instanceResult = instance;
            }
        });
        return instanceResult;
    }


    resolve(className) {
        /**
         * @type {Object|null}
        */
        let instance = this.findInstance(className);
        console.log("DIManager/resolve instance:", instance);

        if (instance !== null) {
            return instance;
        }

        let constructor = Reflect.has(className, "constructor");

        if (constructor === false) {
            let newInstance = Reflect.construct(className);
            this.#instances.push(newInstance);
            return newInstance;
        }

        let parameters = Reflect.ownKeys(className);
        console.log("PARAMETERS:",parameters.length);

        if (parameters.length === 0) {
            let newInstance = Reflect.construct(className);
            this.#instances.push(newInstance);
            return newInstance;
        }

        let newInstanceParams = [];
        parameters.forEach((item) => {
            let param = className[item];
            console.log("DIManager/resolve recursive param:",param);
            console.log("DIManager/resolve recursive param type:",typeof param);

            if (typeof param === 'function') { // parametrenin class olup olmadığı kontrolü
                console.log("DIManager/resolve recursive param:",param);
                newInstanceParams.push(this.resolve(param));
            }
        });


        let generatedInstance = Reflect.construct(className, newInstanceParams);
        this.#instances.push(generatedInstance);


        console.log("DIManager/resolve return instance:", generatedInstance);

        return generatedInstance;
    }
}
module.exports = DIManager;