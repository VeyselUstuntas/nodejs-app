"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require('http');
var fs = require('fs');
var RequestParser = require('./core/RequestParser.js');
var Router = require('./core/Router.js');
var DIManager = require('./core/DIManager.js');
var UserController = require("./controllers/UserController.js");
var server = http.createServer(function (req, res) {
    var request = RequestParser.parse(req);
    var router = new Router();
    Router.get("users", [UserController, "getAllUser"]);
    router.route(request);
    res.end();
});
server.listen(3000, function () {
    console.log("node.js server at port 3000");
});
