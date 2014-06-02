Functions are Objects

Consequently: (PREVIEW of IMPLICATIONS)

1) Multiple Creation forms

* function name() {}
```
function plus(x,y) { return x+y;}
```

* name = function() {}
```
var plus = function(x,y) { return x+y;}
```

* name = new Function() 
```
var plus = new Function('x','y','return x+y;');
```

2) name of a function is a variable holding a reference

3) functions have no intrinsic name

4) functions can be shared (e.g. two objects sharing one method)

5) functions can have properties

6) Functions can have methods

7) Functions can be passed as arguments to other functions

8) Functions are subject to operators

---

3 invocations of functions:

* definition
* call/use
* mention/reference


1) Defining function creates object, returns reference to it
[Diagram function obj]

3) Mention returns a reference to that fn


CALL OPERATOR
2) Call is operator: takes a function reference + args,
builds scope for that call, outputs return value associated with that scope


---

Consider this:
`f(f)`

Hint: first consider this: `f(obj)`

Write a function f for which f(f) does something sensible
(i.e. what sort of function might reasonably receive itself as an argument)

(Ans: a function which does anything reasonable to an object!  "Function, whatever you do, do it to yourself")

```
function f(obj) {  // f --> paintObjBlue
  obj.color = 'blue';
}

function f(obj) {  // f --> wrapObj
  return {inner:obj};
}

function f(obj) {  // f --> getKeysOf
  return Object.keys(obj);
}

function f(obj) { // f --> isFunction
  return (typeof obj === 'function');
}
```

---

Deferred eval

```
function someFn() { blahblahblah;}
someFn; //OK
typeof someFn; //OK
var alias = someFn; //ok
```

---

SCOPES contain variables:

* all local vars declared with _var_, and
* all normal parameters,
* and 2 special parameters:
  * _this_
  * _arguments_

```
function plus(x,y) { return x+y; } //[FIG 1a]
var sum = plus(1,2); //[FIG 1b]
sum = plus(3,4); //[FIG 1c]
```

---

LEXICAL CONTEXT (CLOSURE)

When fn is called, an new environment/scope is created.

When fn is created, retains secret link to the scope which defined it, called 'closure'

'Closure'="Where Function was born"

[FIG2]
Add detail to Fig1: Dotted arrow from _plus_ Function back to global context.
Arrow called: "lexical context":
 scope/context surrounding the function object.
It's where function goes to look for any variables not declared locally.

(Etymology: variables which are not declared locally are "open",
JS must "close" them to use them; closure is where to look to close them)

Closure arrow is dotted b/c not a normal reference:
*  Can't follow it / get its value
*  Refers to a scope, not an object

Represents scope nesting, how to find variables

[FIG3]
```
var x=0;
function plusX(y) {
    return x+y;
} //[FIG3a]
x = plusX(1); //[FIG3b]
x = plusX(5); //[FIG3c]
```

---


```
var x = 1;
function outerA() {
  var x=2;
  return x;
} //[FIG4a]
outerA() //2 [FIG4b]
```

```
var x = 1;
function outerA() {
  var x = 2;
  return outerB();
}
function outerB() {
  return x;
}  //[FIG5a]
outerB() //1 [FIG5b]
outerA() //1 [FIG5c]
```
--- 

NESTED EXAMPLE

```
function outer() {
  function inner() {}
} //[Fig6a]
// So far, only outer is built
outer(); //[Fig6b]
// Now: both built, only outer has scope
```

How to call inner()?  Can't from console; need outer to do it:

```
function outer() {
  function inner() {}
  return inner();
}  //[Fig7a]
outer(); // [Fig7b]
```

---

NESTED with CLOSURE

```
var x = 1;
function outer() {
  var x = 2;
  function inner() {
    return x;
  }
  return inner();
}  // [Fig8a]
var y = outer() //2 [Fig8b]
```

---
<!--  Fork in road; remember this spot...

CLOSURE prevents SCOPE COLLAPSE
allows PERSISTENT ("static") SCOPE

As before, with one tiny change:

```
var x = 1;
function outer() {
  var x = 2;
  function inner() {
    return x;
  }
  return inner; //<<- change from inner() to inner
}  // [Fig9a]
var y=outer() //inner [Fig9b]
y() //2
```

NOTICE: inner still needs the "page" where the variable for its _x_ is written.
That scope created by outer(), which serves as the closure for inner,
if forced to persist even once outer() returns!

The scope is now a "secret space": it's not directly accessible, nor can its variables be addressed directly from outside, but they can still be referenced and set _indirectly_.

-->

---



Functions are Objects (Reprise)

Consequently:

#1) Multiple Creation forms
* function name() {}
* name = function() {}
* name = new Function() 

#2) name of a function is a variable holding a reference

#3) functions have no intrinsic name
	a) can be aliased: multiple references to same function-obj
	b) can be temporarily anonymous

#8) Functions are subject to operators
Call operator:
()

---
THIS

#4) functions can be shared (e.g. two objects sharing one method)
*  _this_ depends on how fn is called:
```
function myName() {return this.name; }
var a = {name:'a', myName:myName};
var b = {name:'b', myName:myName};
a.myName(); //'a'
b.myName(); //'b'
```

Reinterpretation of _this_:
_this_ is the object holding the reference we followed to get here

---

#5) functions can have properties
* Function.length  (automatic)
Custom:

* plus.sideEffects = false;
* console.log.sideEffects = true;
* perpetualMotion.status = 'needs debugging'

---

#6) Functions can have methods
* Function.apply
* Function.call
```
function paintThis(newcolor) {
   this.color = newcolor;
}
var car {color:'blue', paint:paintThis}
car.paintThis('red');
car.color //

// another object may borrow it:
var fence = {color:'white'};
paintThis.call(fence,'red');
// OR
car.paintThis.call(fence,'red');
// either way:
fence.color //red

//equivalent to:
fence.paint = paintThis;
fence.paint('red');
delete fence.paint;
```

Call method means: 'function, lend yourself to obj as if it were your owner'
OR: call function 'through this object'
vs normal call operator: call function through whatever obj used to name it

---

GLOBAL OBJECT

1) It's an environment:
a) Contains variables declared w. _var_
b) Lexical context for global functions
c) Execution context: place for JS robot to stand when interpreting code, meaning of 'this'

In other execution contexts (i.e. in methods), 'this' is owner object, the object with a reference property we followed to get to the function.
By that interpretation...

[DRAW global var reference to function]
... in a global function, 'this' means Global Object Itself!

2) It's an object!
a) contains properties: every variable is also a property of global object;
therefore can delete global variables
b) contains methods: every global function is a method of global object, so 'this' points to it
c) reference properties and variables may refer to it.

It's the only object in JS which is both an Object and a Scope!

In browser:
this === window
window === this.window
window.window.window.window === this

In Node:
this === global
etc.

---

7) Functions can be passed as arguments to other functions
Callbacks

function callFunct(fn) {
  return fn();
}
function callFunctWithArg(fn,arg) {
  return fn(arg);
}




Array.map
Array.forEach
Array.sort


```
var result = {};
function addPair(key) {
    result[key] = key;
}
var keys = ['one','two','three','four'];
keys.forEach(addPair);

result={};
keys.forEach(function (key) {
              result[key]=key;
            });


function addPairToObj(key,obj) {
    obj[key] = key;
}
var obj = {};
keys.forEach(function (key) {
              addPairToObj(key,obj);
            });
```


---

SORTING ARRAY

Array.sort(compareFn)...

function compareNums(x,y) {
  return x-y;
}
var arr = [5,8,2,4,9,0,1];
arr.sort(compareNums);
arr // 



---

<!--
Nested functions:
```

function capitalizeWord(word) {
	 return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
function normalizeTitleWord(word) {
  if (word==='a' || word==='the') {
     return word.toLowerCase;
  return capitalizeWord(word);
}

function normalizeName(name) {
  var words = name.split(' ');
  if (words.length > 0)
     words[0]=capitalizeWord(words[0]);
  for (var i=1; i < words.length; i++) {
         words[i]=normalizeTitleWord(words[i]);
-->

---

Factory pattern

```
function makeThing(val) {
	 var thing = {};
	 thing.value = val;
	 thing.personalMethod = function() {};

	 thing.sharedMethod = makeThing.sharedMethod;
	 return thing;
}
makeThing.sharedMethod = function() {
		   return this.value;
	}
var thing1 = makeThing(1);
var thing2 = makeThing(2);
thing1.sharedMethod(); //1
thing2.sharedMethod(); //2
//Problems:
// 
```