const mysql = require('mysql2');

class Database {
    constructor() {
        /**
         * @type {string} 
        */
        this.host = "localhost";

        /**
         * @type {string} 
        */
        this.user = "root";

        /**
         * @type {string} 
        */
        this.password = "";
        /**
         * @type {string} 
        */
        this.database = "storedb";

        /**
         * @type {import('mysql2').Connection}
        */
        this.connection = mysql.createConnection(
            {
                host: this.host,
                user: this.user,
                database: this.database,
                password: this.password
            }
        );
    }

}
module.exports = Database;