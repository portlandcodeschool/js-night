REVIEW

var duck = {noise:'quack', feet:2, canSwim:true};
var nest = {mama:duck};

Another way?
var nest = {mama:{noise:'quack', feet:2, canSwim:true}};


Another way?
var nest = {};
nest.mama = {noise:'quack', feet:2, canSwim:true};

Another way?
var nest = new Object;
nest.mama = new Object;
nest.mama.noise = 'quack';
...

Another way?
var nest = new Object();
nest['mama'] = new Object();
nest['mama']['noise'];

(nest.mama).noise ///OK

What about
nest[mama['noise']]; //WRONG
nest.(mama.noise) //WRONG

What does it look like as an operator cascade:


QUIZ: what can [] do that . cannot?


Consequence: Property can be named any string, but need []
4th diff between props and vars:
* PROP: any name
* VARS: restricted




REFERENCES and SHARED OBJS

How many objects are there here?
```
var a={};
var b=a;
var c={a:a,b:b};
a.c = c;
var d=c.a;
delete c.a;
delete c.b;
a = null;
c = null;
```

Vars and props don't store objects, but references to them.

An object NAME IS NOT THE OBJECT, but a reference to it.  Consider it an arrow.

Name is little box; object is big box.


IMPLICATIONS of REFERENCES

0) null is not {}

1) COMPARISON: No deep comparison; Object equality means identity

2) CLONING: No built-in cloning; copying means sharing.

3) Passing by reference (i.e. objs as arguments) allows function side-effects with shadowing
```
function paint(color) {
    color='blue';
}
var myCar = {color:'red'};
paint(myCar.color);//no change


function paint(obj) {
    obj.color='blue'
}
paint(myCar);//change!
```



4) Nesting is just linking

5) Cyclic linking OK

6) No intrinsic names

7) Deleting only destroys links, not objects


OBJECT NETWORK

---

PSEUDO-ARRAYS


ARRAYS


ARRAY METHODS


CUSTOM METHODS
---





ARRAY METHODS


Array.sort()   //need for HW2
Array.concat()
Array.push()

---

PURPOSE of OBJECTS

1) Represent entity: group data related to single entity
Simple Examples: duck, self



2) Toolbox/Namespace: group related functions
Built-in Example: Math


3) Index: find objects by name



METHODS and THIS

Example:
Array.everyNth()



TOOLBOX PATTERN

Example: Currency converter

