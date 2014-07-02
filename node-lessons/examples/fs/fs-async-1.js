var fs = require('fs');

fs.readFile('myFile1.txt', {encoding: 'utf8'}, function (err, data) {
    if (err) throw err;
    console.log(data);
});


