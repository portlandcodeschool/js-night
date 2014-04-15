### Async vs. Sync (*Node.js in Action*, 5-11)
- synchronous browser example:
```javascript
var data = $.post('/resource.json');//i/o blocks execution until finished
console.log(data); //can't console.log until data comes back
```

- asynchronous browser example:
```javascript
$.post('/resource.json', function (data) {
    console.log(data);
});
//script execution continues even if data isn't 
```

- synchronous node example: 


- asynchronous node example: 
```javascript

var fs = require('fs');

fs.readFile('./resource.json', function (err, data) {
    console.log(data);
});

```

- Node Characteristics: 
    + DIRTy: *data-intensive-real-time*
    + Node can handle a large number of connections at once
    + non-blocking i/o