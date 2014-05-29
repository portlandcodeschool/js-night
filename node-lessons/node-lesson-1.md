*General Questions/ Issues*

Examples:


Reading: 
- [Art of Node by Max Ogden](https://github.com/maxogden/art-of-node)
- [node.js api on file system, "fs"](http://nodejs.org/api/fs.html) 
    + read approximately the first third or half of this page
- [node.js api entry on modules](http://nodejs.org/api/modules.html)
- [node.js api section on process.argv in the process entry](http://nodejs.org/api/process.html#process_process_argv)
    + This section will provide some critical understanding that enables us to use nodeschool.io

# In-Class Exercises
- Learnyounode 1-4

# Homework 
- Learnyounode through 6
- Other exercises 

# Node Characteristics: 
+ DIRTy: *data-intensive-real-time*
+ Node can handle a large number of connections at once
+ non-blocking i/o
+ Events: callbacks associated with an event that happens mutliple times
+ Streams
+ Modular
+ Callbacks: 'define logic for one-off responses'(NIA, 46)

# Modules

### Introduction To Modules
- Modules help us organize our code
- Node modules do not use the global namespace and thus help us avoid naming collisions (NIA, 40)
- Modules can be files or directories (default file in directory is index.js)
- Modules are 'attached' to exports or module.exports
- exports` vs `module.exports`
    + use module.exports when you need to modify the module
- The require() function is actually based on the FS module (NIA, 327)


### Example

- name-app.js (our main file)
```javascript

var nameFunction = require('./name-module');
var names = require('./names-module');

nameFunction('Ben');

console.log('My dad\'s name is ' + names.dad);
console.log('My mom\'s name is ' + names.mom);

```

- name-module.js 
```javascript

module.exports = function (name) {
  console.log('hey there, ' + name);
}

```

- names-module.js
```javascript

module.exports = {
  mom: 'Christy',
  dad: 'Jeff',
  sister1: 'Becky',
  sister2: 'Elizabeth'
}

```

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


# Node Process Global Object 

### What is it? 
- The Obvious: It is something that node provides, so don't give anything in your code the name process.
- Each node process has its own process object. A process is basically any node program that you might be running. You may have multiple processes if you have more than one of the following: a server, a client, or a database.
- We can use process.argv, that you read about, to access command-line arguments. Process.argv is just an array that we can play with. One thing that this enables, which you will find more useful later on, is the ability to make command-line tools. For our purposes, we only need it to use nodeschool.io.

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