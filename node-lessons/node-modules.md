*General Questions/ Issues*

Reading:
- [node.js api entry on modules](http://nodejs.org/api/modules.html)
- [art-of-node section on modules](https://github.com/maxogden/art-of-node#modules)
- Read NIA 3.1 "Organizing and reusing Node functionality" (pp. 38-45)


### Introduction 
- Modules help us organize our code
- Node modules do not use the global namespace and thus help us avoid naming collisions (NIA, 40)
- Modules can be files or directories (default file in directory is index.js)
- Modules are 'attached' to exports or module.exports
- exports` vs `module.exports`
    + use module.exports when you need to modify the module


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