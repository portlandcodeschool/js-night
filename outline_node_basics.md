*General Questions/ Issues*
- Topics we have time for:
    + Streams
    + Databases
    + Make an api handler of some sort (express or not express)
- No time for: 
    + Full MVC server-side framework
- Not sure:
    + Socket.IO
    + Authentication
    + Promises
    + Use minimalistic framework like Express or Restify
    + Non-framework would be to use similar modules to those used in the 'http-framework repo on github

# Node Characteristics: 
+ DIRTy: *data-intensive-real-time*
+ Node can handle a large number of connections at once
+ non-blocking i/o
+ Events: callbacks associated with an event that happens mutliple times
+ Streams
+ Modular
+ Callbacks: 'define logic for one-off responses'(NIA, 46)

# Async vs. Sync (*Node.js in Action*, 5-11)
### synchronous browser example:
```javascript
var data = $.post('/resource.json');//i/o blocks execution until finished
console.log(data); //can't console.log until data comes back
```

### asynchronous browser example:
```javascript
$.post('/resource.json', function (data) {
    console.log(data);
});
//script execution continues even if data isn't 
```

### synchronous node example: 


### asynchronous node example: 
```javascript

var fs = require('fs');

fs.readFile('./resource.json', function (err, data) {
    console.log(data);
});

```


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


### Mime Types
- We need mime types to be able to send and receive files with http
    + there is a mode module called 'mime': npm install mime
- Mime types live in http headers

### Modules 
- Modules help us organize our code
- Node modules do not use the global namespace and thus help us avoid naming collisions (NIA, 40)
- Modules can be files or directories (default file in directory is index.js)
- Modules are 'attached' to exports or module.exports
- *need to read other sources on when to use `exports` vs `module.exports`* Sounds like the latter is best in most cases
- 




