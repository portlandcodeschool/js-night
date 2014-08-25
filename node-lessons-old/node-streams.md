*General Questions/ Issues*

# Basic Streaming Data Example
- Streams are data that come in a little at a time
- Data comes in *chunk* by *chunk*
- Why might this be a good idea? Streaming video?
- Node has readable streams and writable streams
    + The `response` (res) object in node is a writeable stream

### Basic Streaming File Example
```javascript
var stream = fs.createReadStream('./resource.json');
stream.on('data', function (chunk) {
    console.log(chunk); 
});
stream.on('end', function () {
    console.log('finished'); 
});
```

### Streaming an Image from an Http server
```javascript
var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type':'image/png'});
    fs.createReadStream('./image.png').pipe(res);
}).listen(3000);
console.log('Server running at http://localhost:3000/');
```


