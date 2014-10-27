// st is a module from npm that helps load static assets 
var st = require('st');

// "http" is a module from node.js, sometimes referred to as "node core"
// this just means that if you have node installed, you can require this 
// module without having to download 'http' specifically.
// "http" is a module that helps you write "clients" and "servers" that use
// the HTTP protocol
var http = require('http');

// "fs" is a module that helps you interact with your computer's file system
var fs = require('fs');

// "routes-router" is a module from npmjs.org that helps you make routes in 
// your server *much* more easily
var Router = require("routes-router");

// "send-data" is a module that helps us respond to requests to our server 
// more easily. In this case, we are using the html function from the 
// send-data module since we are sending only an html file right now. 
// (besides our static file handler, of course)
var sendHtml = require("send-data/html");

// Router() returns a function that we will later pass to http.createServer
var router = Router(); 

// when someone asks for the root of our site, send them index.html
router.addRoute("/", function (req, res) {
  // read index.html. when that is done, send the file
  fs.readFile('./index.html', {encoding: 'utf8'}, function (err, data) {
    if (err) console.error(err);
    sendHtml(req, res, data);
  });
});

// handle requests for "static assets".
// these are the files listed in your html pages 
// that the browser makes requests for.
router.addRoute("/public/*", st({
  path: __dirname + "/public",
  url: "/public"
}));

// create a server, pass in our router function, store the server instance in a variable
var server = http.createServer(router);
console.log('server listening on port # 3000');
//tell the server to start listening on port # 1337
server.listen(1337);