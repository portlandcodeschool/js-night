var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

var database = {}
database.pbAndJ = {
      title: 'Peanut Butter and Jelly',
      inventor: 'Anonymous',
      meal: 'lunch',
      ingredients: [1,2,3,4],
      instructions: [1,2,3,4]
};

var server = http.createServer(function (req, res) {

  var pathname = url.parse(req.url, true).pathname;
  console.log(pathname);

  if (pathname === '/api/recipes') {
    if(req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(database.pbAndJ));
    } else if (req.method === 'PUT') {
      // write to the database, etc. 
    }
  } else if (pathname === '/'){
    fs.readFile('./index.html', {encoding: 'utf8'}, function (err, data) {
      if (err) console.log(err);
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  }
});

server.listen(3000);