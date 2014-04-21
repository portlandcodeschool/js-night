*General Questions/ Issues*

### Resources 
* Reading:
    - [Node Docs entries on HTTP](http://nodejs.org/api/http.html)
    - [Example Code on Node.js homepage](http://nodejs.org/)
    - Continue reading or re-read [art-of-node](https://github.com/maxogden/art-of-node)
    - Nodeschool.io: Learnyounode and Stream Adventure

# Node as a Basic HTTP server
```javascript
    var http = require('http');
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
    }).listen(3000);
    console.log('Server running at http://localhost:3000/');

//for another example, see Node JS in Action, 33
```
- For the HTTP server, an anonymous function is provided as an argument to createServer, acting as a callback that defines how each HTTP request should be handled. (NIA, 22)







