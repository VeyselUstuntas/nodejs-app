const http = require('http');
const Database = require('./config/Database.js');
const QueryBuilder = require('./config/QueryBuilder.js');

const server = http.createServer((req, res) => {
    var connection = new Database();
    var queryBuilder = new QueryBuilder();


    const sql = queryBuilder.select().columns(["*"]).tableName("user").where(["id"]).getQuery();
    console.log(sql);
    connection.connection.query(sql, [5],(err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            for (var i = 0; i < result.length; i++) {
                res.write(result[i].name + '\n');
            }
            const query = queryBuilder
                .select()
                .tableName("users")
                .columns(["id", "name", "email"])
                .where(["id"], "AND")
                .getQuery();

            res.write(query);
            res.end();

        }
    });
});

server.listen(3000, () => {
    console.log("node.js server at port 3000");
});