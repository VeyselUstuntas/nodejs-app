const Database = require("../core/database.js");
const QueryBuilder = require("../core/model/QueryBuilder.js");
const User = require("../models/User.js");
class UserService {
    constructor() {
        this.database = new Database();
        this.queryBuilder = new QueryBuilder();
    }

    /**
     * @returns {User[]}
    */
    getAllUser() {
        let userList = new Array();
        let users = this.queryBuilder.select().columns(['*']).tableName('user').getQuery();
        this.database.connection.query(users, (err, result) => {
            if (err) {
                console.log(err.message);
            }
            else {
                for (let i = 0; i < result.length; i++) {

                    const user = {
                        id: result[i].id,
                        name: result[i].name,
                        surname: result[i].surname,
                        email: result[i].email,
                        password: result[i].password,

                    };
                    userList.push(new User(user));
                }
            }
        });

        return userList;
    }
}
module.exports = UserService;