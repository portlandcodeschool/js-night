var http = require('http');

var urlToFetch = 'http://localhost:3000';

http.get(urlToFetch, function (res) {

  res.on('data', function (chunk) {
    console.log(chunk.toString());
  });

  res.on('error', function (err) {
    console.error(err);
  });

});