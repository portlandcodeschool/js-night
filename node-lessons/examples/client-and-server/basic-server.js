var http = require('http');

var server = http.createServer(function (req, res) {
  console.log('%s %s', req.method, req.url);

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('hey there client, how are you doing?');
});

console.log('listening on port # 3000, have a nice day');
server.listen(3000);