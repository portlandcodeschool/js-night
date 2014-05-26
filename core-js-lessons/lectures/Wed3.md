Functions are Objects

Consequently: (PREVIEW of IMPLICATIONS)

1) Multiple Creation forms
* function name() {}
* name = function() {}
* name = new Function() 

2) name of a function is a variable holding a reference

3) functions have no intrinsic name

4) functions can be shared (e.g. two objects sharing one method)

5) functions can have properties

6) Functions can have methods

7) Functions can be passed as arguments to other functions

8) Functions are subject to operators

---

3 invocations of functions:

1) definition
2) call/use
3) mention/reference


1) Defining function creates object, returns reference to it
[Diagram function obj]

3) Mention returns a reference to that fn

2) Call is operator: takes a function reference + args,
builds scope for that call, outputs return value associated with that scope


---

Deferred eval

function someFn() { blahblahblah;}
someFn; //OK
typeof someFn; //OK
var alias = someFn; //ok

---

Scopes:
contain variables:
1) all local vars declared with _var_, and
2) all normal parameters,
and 2 special parameters:
3) _this_
4) _arguments_

---
EX:
function plus(x,y) { return x+y; } //[FIG 1a]
var sum = plus(1,2); //[FIG 1b]
sum = plus(3,4); //[FIG 1c]

---

LEXICAL CONTEXT (CLOSURE)

"Where Function was born"

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

It's how scope nesting is implemented

[FIG3]
```
var x=0;
function plusX(y) {
    return x+y;
} //[FIG3a]
x = plusX(1); //[FIG3b]
x = plusX(5); //[FIG3c]
---


Lexical scope

An environment/scope is created when a fn is called

When called, a fn retains secret link to the scope which defined it.
Diagram:

Represents Scope Nesting; how to find variables

```

var x = 1;
function outerA() {
  var x=2;
  return x;
} //[FIG4a]
outerA() //2 [FIG4b]


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

--- 

NESTED EXAMPLE

function outer() {
  function inner() {}
} //[Fig6a]
// So far, only outer is built
outer(); //[Fig6b]
// Now: both built, only outer has scope

How to call inner()?  Can't from console; need outer to do it:

function outer() {
  function inner() {}
  return inner();
}  //[Fig7a]
outer(); // [Fig7b]


---

NESTED with CLOSURE

var x = 1;
function outer() {
  var x = 2;
  function inner() {
    return x;
  }
  return inner();
}  // [Fig8a]
var y = outer() //2 [Fig8b]

---

CLOSURE prevents SCOPE COLLAPSE
allows PERSISTENT ("static") SCOPE

As before, with one tiny change:

var x = 1;
function outer() {
  var x = 2;
  function inner() {
    return x;
  }
  return inner; //<<change from inner() to inner
}  // [Fig9a]
var y=outer() //inner [Fig9b]
y() //2

NOTICE: inner still needs the "page" where the variable for its _x_ is written.
That scope created by outer(), which serves as the closure for inner,
if forced to persist even once outer() returns!

The scope is now a "secret space": it's not directly accessible, nor can its variables be addressed directly from outside, but they can still be referenced and set _indirectly_.



---

Global Object



---




Functions are Objects

Consequently:

1) Multiple Creation forms
* function name() {}
* name = function() {}
* name = new Function() 

2) name of a function is a variable holding a reference

3) functions have no intrinsic name
	a) can be aliased: multiple references to same function-obj
	b) can be temporarily anonymous

4) functions can be shared (e.g. two objects sharing one method)
*  _this_ depends on how fn is called:
```
function myName() {return this.name; }
var a = {name:'a', myName:myName};
var b = {name:'b', myName:myName};
a.myName(); //'a'
b.myName(); //'b'
```

Reinterpretation of _this_:
_this_ is the object holding the reference to this f

5) functions can have properties
* Function.length

6) Functions can have methods
* Function.call
* Function.apply

7) Functions can be passed as arguments to other functions
Callbacks
Array.map
array.forEach

8) Functions are subject to operators
Call operator:
()


---
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
  for (var i=1; i<words.length; i++) {
         words[i]=normalizeTitleWord(words[i]);


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