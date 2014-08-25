# Reading: 
- [article: Enter the World of Node.js](http://www.sitepoint.com/enter-world-node-js/)
- [Art of Node by Max Ogden](https://github.com/maxogden/art-of-node)
- [node.js api on file system, "fs"](http://nodejs.org/api/fs.html) 
    + read approximately the first third or half of this page
- [node.js api entry on modules](http://nodejs.org/api/modules.html)
- [node.js api section on process.argv in the process entry](http://nodejs.org/api/process.html#process_process_argv)
    + This section will provide some critical understanding that enables us to use nodeschool.io

# Install before Class
[Node.js (includes npm: the node package manager)](http://nodejs.org/)
  - Click the green button
  - You may also use any of the installation instructions in the readings if you feel more comfortable with that
[Nodeschool: learnyounode module](http://nodeschool.io/#learn-you-node)
  - this is a "workshopper" module that we will use in class
    
# Bonus Reading About Node: 
- [2011 Article on the History of Node](http://www.theregister.co.uk/2011/03/01/the_rise_and_rise_of_node_dot_js/?page=1)

# Reading for Homework: 
+ [Node Docs: File System](http://nodejs.org/api/fs.html)

# Homework 
- Learnyounode 3-4 (this is a portion of the homework for this week, the majority of which will be assigned after node lesson 2(Wednesday))

# Slides 

### Nodes.js
Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

-- from the node.js home page

### Again please, this time in english
- We can use node to make:
    + servers
    + clients
    + command-line tools
    + software to control robots
    + software to control helicopters/ drones
    + other useful bits of software

### What is node good at? 
+ DIRTy: *data-intensive-real-time*
+ Node can handle a large number of connections at once
+ non-blocking i/o

### Quote / Analogy

"Node does I/O in a way that is asynchronous which lets it handle lots of different things simultaneously. For example, if you go down to a fast food joint and order a cheeseburger they will immediately take your order and then make you wait around until the cheeseburger is ready. In the meantime they can take other orders and start cooking cheeseburgers for other people. Imagine if you had to wait at the register for your cheeseburger, blocking all other people in line from ordering while they cooked your burger! This is called blocking I/O because all I/O (cooking cheeseburgers) happens one at a time. Node, on the other hand, is non-blocking, which means it can cook many cheeseburgers at once." (From the Art of Node by Max Ogden)

### What makes node fast and non/blocking  

+ Events: I/O in node does not happen (usually) in the "event loop". When the I/O (which is slow) happens, it emits an event. The I/O does not block other events in the event loop. 
+ Streams: Node has the ability, in many cases, to give you data in chunks (instead of waiting for an entire file to buffer, for instance)
+ Callbacks and other asynchronous interfaces

### The Goodness of Modules, pt. 1

- Modules help us organize our code
- Node modules do not use the global namespace and thus help us avoid naming collisions (NIA, 40)
- Modules can be files or directories (default file in project directory is index.js)
- We use the require function to bring in other code
- Example: (index.js)
```js 
var plus = require('./plus');

console.log(plus(1,2));

```

### The Goodness of Modules, pt. 2
- Modules are attached to the exports object or become the module.exports object
- We use `exports` or  `module.exports` to make a module or file available to node
    + use module.exports to export one function or object (in general, this is the better pattern)
    + use exports to export each property (exports is an object)
      * This can be a useful pattern when requiring a directory
      * Be careful, however, variables outside the exported item are private to the module
- Example: (plus.js)
```js
  function additionFunc (a,b) {
    return a + b;
  }
  module.exports = additionFunc;
```

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

### Examples

### Warning: Exports vs. Module.Exports
"As a guideline, if the relationship between exports and module.exports seems like magic to you, ignore exports and only use module.exports." (Node docs on Module)

- Basically, Exports is a shorthand reference to Module.Exports. The problem is that Exports is already set up as an object, and node will not allow that to be overwritten. It simply nests the object you export in the exports object. There is also other unexpected behavior.

(example not in slides, see node-modules-3)

### Node Process Global Object 
- The Obvious: It is something that node provides, so don't give anything in your code the name process.
- Each node process has its own process object. A process is basically any node program that you might be running. You may have multiple processes if you have more than one of the following: a server, a client, or a database.
- We can use process.argv, that you read about, to access command-line arguments. Process.argv is just an array that we can play with. One thing that this enables, which you will find more useful later on, is the ability to make command-line tools. For our purposes, we only need it to use nodeschool.io.

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
