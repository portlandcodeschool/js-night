# Reading:
- [Node Docs entries on HTTP](http://nodejs.org/api/http.html)
- Continue reading or re-read [art-of-node](https://github.com/maxogden/art-of-node)

# Reading for Homework: 
- [node docs entry on Path](http://nodejs.org/api/path.html)
    + pay particular attention to path.extname

# Slides

### Node as a Basic HTTP server
```javascript
    var http = require('http');
    var server = http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
    });
    server.listen(3000);
    console.log('Server running at http://localhost:3000/');

```

- bring in the http module and store it in a var
- create the server and store it in a var
- make a callback function that determines how requests will be handled
- declare arguments (also local vars) that pass the request and response objects into the callback function
- write an HTTP header
- send the response and end it in one statement
- listen on a particular port
- give a startup message that lets us know the server is running





