const mysql = require('mysql2');

class Database {
    constructor() {
        this.host = "localhost";
        this.user = "root";
        this.password = "";
        this.database = "storedb";
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