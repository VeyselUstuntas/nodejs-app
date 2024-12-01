import mysql from 'mysql2';

export class DatabaseConnection {
    private host: string;
    private database: string;
    private user: string;
    private password: string;
    private connection: mysql.Connection;

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

    async getConnection(): Promise<mysql.Connection> {
        return new Promise((resolve, reject) => {
            resolve(this.connection);
        });
    }

}