*General Questions/ Issues*

### Make a server that responds to the root route with hello world

```javascript
var Hapi = require('hapi');

var server = Hapi.createServer('localhost', 8000);

server.route(  
  {
    path: "/",
    method: 'GET',
    handler: function(request, reply) {
        reply("Hello, world!");
    }
  }
);

server.start();
```

### Refactor: put route objects into an array
```javascript
var Hapi = require('hapi');

var server = Hapi.createServer('localhost', 8000);

var routes = [
  {
    path: "/hello",
    method: 'GET',
    handler: function(request, reply) {
        reply("Hello, world!");
    }
  }
];

server.route(routes);
server.start();
```
### Add a Route that responds to a name given as a route parameter
```Javascript
var Hapi = require('hapi');

var server = Hapi.createServer('localhost', 8000);

var routes = [
  {
    path: "/hello",
    method: 'GET',
    handler: function(request, reply) {
        reply("Hello, world!");
    }
  },
  {
    path: '/{name}',
    method: 'GET',
    handler: function(request, reply) {
      reply('Hello there, ' + request.params.name + '!');
    }
  }
];

server.route(routes);
server.start();
```

### Add a Static File Handler (for our front-end code, eg. CSS, JS, HTML, Images)
```javascript 
var Hapi = require('hapi');

var server = Hapi.createServer('localhost', 8000);

var routes = [
  {
    path: '/{path*}',
    method: 'GET',
    config: {
      handler: { 
        directory: { 
          path: './public', listing: false, index: true
        }
      }
    } 
  },
  {
    path: "/hello",
    method: 'GET',
    handler: function(request, reply) {
        reply("Hello, world!");
    }
  },
  {
    path: '/{name}',
    method: 'GET',
    handler: function(request, reply) {
      reply('Hello there, ' + request.params.name + '!');
    }
  }
];

server.route(routes);
server.start();
```