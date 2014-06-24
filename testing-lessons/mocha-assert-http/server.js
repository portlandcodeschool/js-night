var http = require('http');

var server = http.createServer(function (req, res) {
  if (error) console.log(error);
  res.writeHead(200,{'Content-Type': 'text/plain'});
  res.end('hello');
});


console.log('server running, go to localhost:3000');
server.listen(3000);