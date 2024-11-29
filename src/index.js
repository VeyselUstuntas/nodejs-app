const http = require('http');
const fs = require('fs');
const RequestParser = require('./core/RequestParser.js');
const Router = require('./core/Router.js');
const DIManager = require('./core/DIManager.js');
const UserController = require("./controllers/UserController.js");

const server = http.createServer((req, res) => {
    let request = RequestParser.parse(req);
    let diManager = new DIManager();
    let router = new Router(diManager);

    console.log(UserController.length);
    Router.get("users", [UserController, "getAllUser"]);


    router.route(request);
    res.end();
});

server.listen(3000, () => {
    console.log("node.js server at port 3000");
});