var st = require('st');
var http = require('http');
var fs = require('fs');
var Router = require("routes-router");
var sendHtml = require("send-data/html");

var router = Router(); 

var server = http.createServer(router);

router.addRoute("/", function (req, res) {
  fs.readFile('./public/index.html', {encoding: 'utf8'}, function (err, data) {
    if (err) console.error(err);
    sendHtml(req, res, data);
  });
});

router.addRoute("/*", st({
  path: __dirname + "/public",
  url: "/"
}));

server.listen(1337);