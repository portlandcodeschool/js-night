# Reading: 
- [Art of Node by Max Ogden](https://github.com/maxogden/art-of-node)
- [node.js api on file system, "fs"](http://nodejs.org/api/fs.html) 
    + read approximately the first third or half of this page
- [node.js api entry on modules](http://nodejs.org/api/modules.html)
- [node.js api section on process.argv in the process entry](http://nodejs.org/api/process.html#process_process_argv)
    + This section will provide some critical understanding that enables us to use nodeschool.io
    
# Reading for Homework: 
+ [Node Docs: File System](http://nodejs.org/api/fs.html)
+ [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Example:_Using_Number_to_convert_a_Date_object)

# Homework 
- Learnyounode 3-4
- Refactor Homework 3, Primes Improved
    + How did this refactor help or hurt?
    + What are the advantages or disadvantages of doing this? 

# Slides 

### Nodes.js
Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

-- from the node.js home page

### Again please, this time in english
- We can use node to make servers and other useful bits of software such as command-line tools
- We can use node to do fun things like fly helicopters and control robots


### What is node good at? 
+ DIRTy: *data-intensive-real-time*
+ Node can handle a large number of connections at once
+ non-blocking i/o

### Quote / Analogy

"Node does I/O in a way that is asynchronous which lets it handle lots of different things simultaneously. For example, if you go down to a fast food joint and order a cheeseburger they will immediately take your order and then make you wait around until the cheeseburger is ready. In the meantime they can take other orders and start cooking cheeseburgers for other people. Imagine if you had to wait at the register for your cheeseburger, blocking all other people in line from ordering while they cooked your burger! This is called blocking I/O because all I/O (cooking cheeseburgers) happens one at a time. Node, on the other hand, is non-blocking, which means it can cook many cheeseburgers at once."

### What makes node fast and non/blocking  

+ Events: callbacks associated with an event that happens mutliple times
    * similarly to the browser, we can have our programs in node listen for events and then perform an action
+ Streams
    * unlike some other platforms, like php, node gives you access to the data of a request (among other things) as it comes in. 
+ Callbacks and other asynchronous interfaces

### Modules

- Modules help us organize our code
- Node modules do not use the global namespace and thus help us avoid naming collisions (NIA, 40)
- Modules can be files or directories (default file in directory is index.js)
- Modules are 'attached' to exports or module.exports
- exports` vs `module.exports`
    + use module.exports when you need to modify the module
    + When in doubt, use module.exports
- The require() function is actually based on the FS module (NIA, 327)

### Example With all the Code in One File

```js
var names = {
    mom: 'Christy',
    dad: 'Jeff',
    sister1: 'Becky',
    sister2: 'Elizabeth'
}

nameSayer(names.dad);
nameSayer(names.mom);

function nameSayer (name) {
  console.log('hey there, ' + name);
}

```

### Main file of name app

- name-app.js (our main file)
```js

var nameSayer = require('./say-the-name');
var names = require('./names-list');

nameSayer(names.dad);
nameSayer(names.mom)

```

### Modules of name app
- say-the-name.js 
```js

module.exports = function (name) {
  console.log('hey there, ' + name);
}

```

- names-list.js
```js

module.exports = {
  mom: 'Christy',
  dad: 'Jeff',
  sister1: 'Becky',
  sister2: 'Elizabeth'
}

```

### Node Process Global Object 
- The Obvious: It is something that node provides, so don't give anything in your code the name process.
- Each node process has its own process object. A process is basically any node program that you might be running. You may have multiple processes if you have more than one of the following: a server, a client, or a database.
- We can use process.argv, that you read about, to access command-line arguments. Process.argv is just an array that we can play with. One thing that this enables, which you will find more useful later on, is the ability to make command-line tools. For our purposes, we only need it to use nodeschool.io.

### Learnyounode Introduction
- Installation
- learnyounode
- learnyounode verify 

### Learnyounode 1-2 

### synchronous node example: 
```js 

var fs = require('fs');

var myFile = fs.readFileSync('myFile.txt', {encoding: 'utf8'});


```

### asynchronous node example: 

```js

var fs = require('fs');

fs.readFile('myFile.txt', {encoding: 'utf8'}, function (err, data) {
    console.log(data);
});

```
