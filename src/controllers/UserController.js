const UserService = require("../services/UserService.js");
const User = require("../models/User.js");
class UserController {
    /**
     * @param {UserService} UserService 
    */
    constructor(UserService) {
        /**
         * @type {UserService}
        */
        this.UserService = UserService;
    }

    /**
     * @returns {User[]}
    */
    getAllUser() {
        /**
         * @type {User[]}
        */
        let userList = this.UserService.getAllUser();
        console.log("Çalıştı.");

        console.log(JSON.stringify(userList));
    }

}
module.exports = UserController;