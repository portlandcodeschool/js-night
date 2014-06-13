var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

app.use(logger());

app.use(function (req, res, next) {
  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '1mb',
    encoding: 'utf8'
  }, function (err, string) {
    if (err)
      return next(err)

    req.text = string
    next()
  })
});

var items = [];

app.post('/', function (req, res) {
  console.log(req.body);
  var item = '';
  item = req.text;

  items.push(item);
  console.log(items);
  res.send(200, 'We added your todo');
});

app.get('/', function (req, res) {
  var responseBody = items.map(function (item, index) {
    return (index + ')' + item + '\n' );
  }).join('\n');

  res.send(200, items);
});

app.del('/:id', function (req, res) {
    var requestedId = req.params.id;

    if (isNaN(requestedId)) {
      res.send(400, 'Invalid item id');
    } else if (!items[requestedId]) {
      res.send(404, 'Item not found');
    } else {
      items.splice(requestedId, 1);
      res.send(200, "OK: We deleted todo # " + requestedId);
    }

});


app.listen(3000, function () {
  console.log('server started on localhost: port 3000');
});
