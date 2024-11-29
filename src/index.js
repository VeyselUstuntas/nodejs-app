const http = require('http');
const fs = require('fs');
const RequestParser = require('./core/RequestParser.js');
const Router = require('./core/Router.js');

const server = http.createServer((req, res) => {
    let request = RequestParser.parse(req);
    let router = new Router();


    router.route(request);
    res.end();
});

server.listen(3000, () => {
    console.log("node.js server at port 3000");
});