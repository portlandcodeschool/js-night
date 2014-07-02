var http = require('http');

var server = http.createServer(function (req, res) {


  //implement up here

  
  if (req.url === '/') {
    res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end('Homepage Here');
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Sorry, we don\'t have that document');
  }

});

console.log("listening on localhost, port 3000");
server.listen(3000);