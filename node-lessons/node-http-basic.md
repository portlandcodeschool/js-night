*General Questions/ Issues*

### Resources 
* Reading:
    - [Node Docs entries on HTTP](http://nodejs.org/api/http.html)
    - [Example Code on Node.js homepage](http://nodejs.org/)
    - Continue reading or re-read [art-of-node](https://github.com/maxogden/art-of-node)
    - Nodeschool.io: Learnyounode

# Node as a Basic HTTP server
```javascript
    var http = require('http');
    var server = http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
    });
    server.listen(3000);
    console.log('Server running at http://localhost:3000/');

//for another example, see Node JS in Action, 33
```

- bring in the http module and store it in a var
- create the server and store it in a var
- make a callback function that determines how requests will be handled
- declare arguments (also local vars) that pass the request and response objects into the callback function's scope
- write an HTTP header
- send the response and end it in one statement
- listen on a particular port
- give a startup message that lets us know the server is running

"For every HTTP request received by the server, the request callback function will be invoked with new req and res objects. Prior to the callback being triggered, Node will parse the request up through the HTTP headers and provide them as part of the req object. But Node doesn’t start parsing the body of the request until the callback has been fired. This is different from some server-side frameworks, like PHP, where both the headers and the body of the request are parsed before your application logic runs. Node provides this lower-level interface so you can handle the body data as it’s being parsed, if desired." (njia, 73)





