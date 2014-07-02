var fs = require('fs');

var myFile = fs.readFileSync('myFile.txt', {encoding: 'utf8'});

console.log(myFile);

for (var i = 0; i < 10; i++) {
  console.log(i);
}

