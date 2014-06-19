var fs = require('fs');

var output;

fs.readFile('some-json.json', {encoding: 'utf8'}, function (err, data) {
  if (err) throw err;
  output = data;
});

console.log(output);