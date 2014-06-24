//var request = require('request');
var http = require('http');

var server = require('../server');

describe('server', function () {
  before(function () {
    server.listen(8000);
  });





  after(function () {
    server.close();
  });
});


describe('/', function (done) {
  it('request should return response of 200', function () {
    http.get('http://localhost:8000', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});


