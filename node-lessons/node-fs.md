*General Questions/ Issues*

Reading: 
- [Art of Node by Max Ogden](https://github.com/maxogden/art-of-node)
- [node.js api on file system, "fs"](http://nodejs.org/api/fs.html) 
    + read approximately the first third or half of this page


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

### Discuss Homework
1. Learnyounode (Complete the first 5 lessons)
    - Show installation and first two examples
    - Explain process.argv, showing the instructions from learnyounode
    - Related Reading: 
        + [Node Docs: File System](http://nodejs.org/api/fs.html)
        + [Node Docs: Buffer](http://nodejs.org/api/buffer.html)
    - Hint Links:
        + [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Example:_Using_Number_to_convert_a_Date_object)
2. 