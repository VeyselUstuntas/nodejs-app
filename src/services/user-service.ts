import { QueryError, QueryResult } from "mysql2";
import { DatabaseConnection } from "../core/database-connection";
import { QueryBuilder } from "../core/model/query-builder";
import User from "../models/user";
import Injectable from "../core/injectable-decorator";

@Injectable()
export class UserService {
    public database: DatabaseConnection;
    public queryBuilder: any;

    constructor() {
        this.database = new DatabaseConnection();
        this.queryBuilder = new QueryBuilder();
    }

    yaz() {
        console.log("deneme123");
    }

    async getAllUser(): Promise<User[]> {
        return new Promise(async (resolve, reject) => {
            let userList: User[] = [];
            let users = this.queryBuilder.select().columns(['*']).tableName('user').getQuery();
            let connection = this.database.getConnection();
            await connection.then((value) => {
                value.query(users, (err: QueryError | null, result: any) => {
                    if (err) {
                        reject(err.message);
                    }
                    else {
                        for (let usr of result) {
                            const user = new User(usr.id, usr.name, usr.surname, usr.email, usr.password);
                            userList.push(user);
                        }
                        resolve(userList);
                    }
                });
            });
        });
    }
}
