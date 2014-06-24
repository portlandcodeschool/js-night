var request = require('request');
var http = require('http');

suite('http server', function () {
  test('request should return response of 200', function () {
    http.get('http://localhost:8000', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
    
    
  });
});


