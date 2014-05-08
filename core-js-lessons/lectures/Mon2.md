OBJECTS
====

All the examples of data values we've seen have been (apparently) **primitives**, except for arrays, which we've assumed to contain primitives.
But arrays themselves are the tip of an iceberg: data elements which are _compound values_ with independent parts.
In JS, all such compound structure are classified as **objects**.
An object is just a _set_ or _group_ of values: a big box containing a bunch of little boxes. **[Draw obj box]**
These inner boxes are called **properties** or **members**; they're similar to variables but not exactly the same.
Like variables, properties have both a _name_ (the label on the box) and a _value_ (what's in the box).
A property name is often called a **key**.

EX: [Draw big box: {noise:'quack', feet:2, wings:2, canSwim:true}]

So a property is a pair: a key and a value, and a object is just a set of key-value pairs.
Within a particular object, keys are always unique, although the values may repeat.

We can also think of an object as a **dictionary**: its keys are words, and each word has a value, its "definition".
Even if all the values are blank or undefined values, the object is still a bag of words.

[Delay:
I say "bag" (or "set") instead of "list" or "box" because the properties inside aren't inherently ordered.
Don't assume they're alphabetized by key, or sorted in the order of their addition to be bag.
They're just _in_ the set, or not.

And there's a special operator to test this: **\_ in \_**.
** _key_ in _object_ ** returns true whenever the object includes a property named _key_.]

INCREMENTAL CREATION

To build an object incrementally, first create empty object then add properties:
`var obj = new Object(); //empty object`
`obj.key1 = value1;`
`obj.key2 = value2;`
`typeof obj`

**[Diagram: big box with exterior label _obj_, interior properties key1, key2]

SHORTHAND

You may also see two "slang" forms of empty-object creation:
`obj = new Object;`
`obj = Object();`
Both of these have same result, but for now always practice using the full form: `new Object()`

LITERAL NOTATION

Objects also have a special notation which creates an object and its constituent properties all at once:
`var obj = {}` for an empty object, or
`var obj = {key1: value1, key2: value2, ...}`
That's called **object literal notation**, because it enumerates each property.
It's somewhat a misnomer because the values may be expressions rather than literal values:
`obj = {one:(1+2), 'two':(4-2), flavor:"pine"+"apple"}`

Also called **JSON**, a format sometimes used to describe structured data outside JS programs.

Notice that quotes around the keys are optional, but required when the values are strings!  Why? [Ans: b/c expressions are allowed as values, so variables may appear-- must preserve difference between x (which holds a value) and 'x']

And once you have an object created by either method, you can always incrementally add new properties:
```
obj = {one:1, two:2};
obj.three = 3;
obj
```

NESTED OBJECTS

Often, object property values are primitives, but like variables, may also contain other objects.  In this case, have **nested** objects.
```
var outer = {inner:{core:1}}
// equivalent to:
var inner = new Object();
inner.core = 1;
var outer = new Object();
outer.inner = inner;  //left inner is prop, right inner is var
```
**[Diagram: nested big boxes, inmost property _core_]**

MEMBER ACCESS
Object members/properties act like variable in that they can be set to values or used as values in expressions.  But they always have to be named through their object in one of two ways...

**dot notation: obj.key**
The dot/period symbol, in any context besides a decimal in a number, is an operator: **\_.\_** (binary infix)
Its inputs are the object and the property name/key, and the output is the property value:
`var obj ={one:1, two:2};`
`obj.one //1`
`obj.two //2`
`obj.one = (0+1);`
`obj.two++`

**index notation: obj[keyExpr]**
A related operator is the **member operator** or **index operator**: **\_[\_]** (binary mixed-fix)
`obj['one'] //1`
`obj['two'] //2`
`obj[one]='1';
Pronounced "obj sub one" (as in subscript) or "obj index one".
(You've already seen this notation in arrays, and arrays and objects are very similar in ways we'll shortly explore.)

There is one critical difference between these two operators:
**dot** is always followed by a literal key name, unquoted, but
**[member]** may substitute expressions.  Therefore, if you use the literal key name, it must be quoted: obj['one'].
Could also say: `obj['o'+'n'+'e']`, or `var x = 'one'; obj[x];`  But `obj.x` always means `obj['x']`.

This illustrates that key names are really just strings, and they can be **any** string.  But if your string is weird, have to use [] to access the member:
`obj[' '] = 'space'`
`obj[''] = 'empty str'
`obj['"'] = 'quote mark'`
Weird property names can be very confusing, so only do it with good reason.  But it's a valid consequence of the rule: object is bag of **strings**.

CHAINING
If objects are nested, both membership operators can be **chained**:
`outer.inner.core = 0;`
`outer['inner']['core'] = 0;`
Don't confuse latter with:
`outer[inner['core']]`// discuss meaning...

Or mix them together:
`outer['inner'].core`

You can interpret it as stacking two operator funnels: output of one is input of next. **[Diagram]**


CREATING and DELETING PROPERTIES

Unlike variables, object properties aren't declared before using; they're created whenever they're set for first time.
If they're read without creating, no error but have value _undefined_;


Also unlike variables, properties can be **deleted**:
`delete obj.one`
`obj`
`delete obj['two']`
`obj`

**delete** is a unary operator: takes one object-prefixed property name, has side-effect of deleting it.  Actually has a return value (usually true), but ignore it for now; pretend only side-effect.

DETERMINING PROPERTIES
How can we tell whether an object has a certain property/key?  It's not enough to check for _undefined_, since there may be keys in the set with an undefined value.

There's a special (binary) operator for the purpose: _KEY in OBJ_, returning _true_ if string KEY is a property name in OBJ
`var obj = {one:1, two:2}
'one' in obj //true
'three' in obj//false

But that requires proposing a particular key.  If you want to find out all the keys present, there's a special kind of loop: _for...in..._
**for (VAR in OBJ)...**
VAR is a variable which is automatically set to each key in OBJ, one per loop cycle.
For example:
`var obj={one:1,two:2};
for (var key in obj) console.log('key='+key+' val='+obj[key]);
`

Don't confuse _for (\_in \_)_ with _for (\_ ;\_ ;\_ )_; they're different idioms with different templates and different roles, and you can't use either in place of the other.

AUTOMATIC PROPERTIES

Certain kinds of objects have some properties which are created automatically.  Automatic properties are hidden (technically: non-enumerable) and are not included in the keys listed by _for...in_.  However, they will return _true_ for _in_.

In recognition of their differences, I'll usually draw _automatic properties_ in an "attic" on top of the main object. [Diagram]


METHODS (briefly)
Some object properties may be functions!  In that case, they're called **methods** of the object they belong to.
For example:
`Math.floor(1.1)`
`console.log('boo')`




PURPOSE of OBJECTS
Until we write more complex code, it may be hard to understand the purpose of objects.  We've seen at least 3 distinct uses:
1.  An object can represent a real-world object/entity which has distinct parts and features and measurements.  Object groups together those data as different aspects of single thing:
`var person={name:'Kermit',color:'green',occupation:'frog',height:60}`
Or built-in: `screen`

2. An object can be a toolbox (namespace?), grouping and isolating a set of related tools:
Math is object which doesn't repreresent a thing; instead its a collection of methods:
Math.floor(), Math.random(), Math.sqrt(), Math.log()
Why do we need to isolate these fns instead of having them global?
Consider conflict between Math.log() and console.log(): two very different meanings of word 'log'.  Which one gets to use the word globally?  Neither; each gets its own context by belonging to diffent toolbox objects.

3. Collection/Index: Object can be a set of names which don't represent thing together, but keep track of a set of things:
var everyone = {Dan:1, Ben,1:, Clarissa:1...  }
(OR substitute objects for individuals...)

====

PROPERTIES vs VARIABLES

Differences:


1. Containment: variables live in a scope; params live in an object.
* vars are used w/o prefix; params must be prefixed with owner object
* vars will look outward to other scopes if not found; params won't

2. Declaration: vars must be declared before use
* vars are created only when declared; params are created when set
* non-existent vars return error when used; non-existent params return _undefined_

3. Deletion: vars cannot be (manually) destroyed; params can

4. Names: vars have name restrictions; params can be named any string

===

REFERENCES and SHARED OBJECTS

```
var myCar = {wheels:4, color:blue, mileage:100000}
var yourCar = myCar;
myCar.mileage+=1000;
yourCar.mileage
```

To see why this object is shared, we first have to understand **references**.  A reference is JS is a _pointer_ or a _citation_.  It is literally a number in memory, stored in a variable like a number primitive, but interpreted to be the address of _another place in memory_.  But we can think of it as an _arrow_ pointing from a variable to an object.  That is, the arrow _is the value_ in a little box, which points to a big box.  Sometimes we'll call the big box the **referent**.
**[Diagram]**
When we make an object with
`new Object()` or `{...}`, we make the big box.  Then when we assign it to a variable, like
`x={...}`, we just put an arrow in the variable (little box) pointing to the object (big box).

Copying a variable _of any type_ does exactly the same thing: it copies the value in one little box into another.  If that value is a reference, the destination variable gets a duplicate reference, pointing to the same, original big box. **[Diagram]**
Therefore myCar is the same object as yourCar.  This is how all objects are copied: by reference.

NULL vs {}
Finally we can understand the meaning of our last mysterious primitive value: **null**.
Null is an invalid arrow to nowhere.  It is understood to be a reference, like NaN is understood to be a number.
`typeof null` is object.  Draw it as a dot or 'X' in the reference (little) box. **[Diagram]**

And notice that _null_ is not the same as {}, an empty object.  **[Diagram empty obj]**  A variable holding an empty object has a valid reference to a big box, though it's empty.  An there can be an unlimited number of distinct empty objects, which are not equal!
But null is a single universal value, a non-arrow, always equal to other nulls.

And remember: null is falsish but an empty object (i.e. a valid reference) is trueish.

IMPLICATIONS of REFERENCES

1. COMPARISON: Object equality means identity:
the equality and identity operators compare the values in two little boxes; they don't follow references.
Comparing objects doesn't compare the big boxes; it doesnt tell you whether they resemble each other, have the same properties.
It only tells you whether two references point to the same object.
`myCar == yourCar` and `myCar === yourCar`
[Only one case where object == and === differ: wrapper objects compared to corresponding primitives.  Discuss later!]

If you want to actually compare the contents of big boxes, in pure JS you have to do the work manually.  There are some supplemental libraries which will help with the job, but it's actually a hard theoretical problem.  [If an object is a huge tree of sub-objects, where do you stop and say close enough?]

2. CLONING: Similarly, if you want to duplicate/clone an object, there is no universal solution b/c problem is hard for deep trees.

3. When you pass an argument as a parameter into a function, you are really just passing a reference.
```
function paint(car,newcolor) {
	car.color= = newcolor;
}
paint(myCar,"red");
**[Diagram]**

If you modify the object inside the function, you are modifying the original.  The variable you use to access it is a local variable, but you are making a change to a shared structure.  So functions can have side effects even when they don't use global variables.
This example function doesn't have a return value, and doesn't need it to do work: it's relying on the side-effect of changing the _referent_


4.  Nested objects aren't actually nested!  No big box lives inside another big box; they're all side-by-side in memory.  But properties which are references connect them and give the appearance of nesting **[Diagram outer.inner]**   Even when you apparently nest objects in literal notation, you are merely linking them.

5. It is possible (and sometimes ideal) to have circular linking:
```
var ernie={}, bert={};
ernie.bff = bert; bert.bff = ernie;
```
Neither object is inside the other; able to say:
`bert.bff.bff.bff.bff.bff.bff`...

6.  No object has an intrinsic name.  Objects may have many names, all equally authentic, or no names at all!
**[Diagram...]**
`var a={key:'value'}, b=a;` has exactly the same result as
`var b={key:'value'}, a=b;`  An alias to an object is not a second-class reference, it's just the same as the first original reference.
And furthermore: the referent (big box) doesn't contain the names, and has no idea how many there might be.

How can object have no name?  It can't in the long term, but it can briefly:
`{a:1,b:2,c:3};` is a valid statement which makes, then abandons, an object which is never named.
It may persist even longer if fed into an expression...
But eventually, like any expression, it's thrown away unless saved to a variable or property.
(And under very particular circumstance it may live beyond that, but we'll see those cases much later.)

7. Deleting a reference doesn't affect the referent, which may have other names.
```
var outer = {inner:{core:1}};
var alias = outer.inner;
delete outer.inner;
alias //still there
```

OBJECT LIFETIMES, GARBAGE COLLECTION

So how do you actually destroy an object?  You can't, but you never need to.
Deleting references and resetting variables is sufficient to detach an object from your program, and you can pretend it doesn't exist anymore.
The only reason to worry about it would be to ensure that the memory it consumes is recycled.  But JS has a wonderful mechanism which takes care of that for you: **garbage collection**.  It works like this:
an object persists as long as there are any names you might use to refer to it.  But when the last remaining name/link to it is gone, the object is automatically destroyed and its memory freed.

[Trade-offs: the more frequent GC happens, the faster memory gets recycled.  But that clean-up takes processor time and slows your program.  So its a hard problem to find ideal recycle rate.  But the programmers implementing JS are the ones who have to deal with it, not you.  For you, a magic Garbage Fairy just comes in the night and takes the unwanted things away.]

BIG PICTURE: OBJECT NETWORK

Let's look again at the difference between properties and variables, but step back to get the big picture:
properties and variables constitute two different networks of data...

The set of all objects (big boxes) are one network.  Properties within objects may be primitives, whose values live completely inside their little boxes nested in the big ones.  Or properties may be references, which links objects together.  Let's call this the object network.
It has the form of a **graph**, a central concept in computer science.  A graph is just a set of **nodes** connected by **arcs** or **links**.
We call it **directed** if at least some of the links are one-way.  In JS, all references are one-way (though any may be reciprocated), so the object network is a directed graph:
 **nodes** are objects and **links** are reference properties (each one-way).  Once you have reference to a node, you can traverse links in the graph by chaining properties...
```
var x={a:{a1:{},a2:{}},b:{b1:{},b2:{}}};
var y=x.b.b2;
y.c = x;//circular ref
```
[Diagram "object_graph": objs/props in color #1, var refs in color #2]

But to get to any node as a starting point, you have to start with a variable, _which is outside that graph_.  Variables don't live in objects, they live in scopes, which form a different kind of graph (we'll explore its structure more later).  Every variable which is not a primitive is an object reference, a link _into the object graph_.

So in any chain, all the terms are reference, but the first term is always a variable, and all the others after are properties!
And if any part of the object graph is cut off, can't be reached by starting with any variable, then it's garbage.

Notice that every object here has as many names as you care to chain together, always starting with _x_ or _y_
`x.b.b2.c.a === y.c
y.c === x`

(Break!)
==== Part 2

PSEUDO-ARRAYS

Suppose we make this object:
```
var obj = {};
obj[0] = 'a';
obj[1] = 'b';
...
obj[25]= 'z';
obj.length = 26;
```
That should look familiar!  It is (seemingly) an array: has a length and elements indexed by number!
Or are they?
What would happen in a language rife with autoconversion if you gave a number to an operator which expects a string?
We would see an ordinary bag-of-words object which appears to be something special, with elements indexed by number!
I.e. we (seem to) get arrays from just objects plus autoconversion.

This can be called a **pseudo-array**, but it's nothing more than an object with some keys which are numeric strings.
Proof:
`var obj['0.0']='aa';
var obj[0]//'a'!  String keys, not numbers

[Draw: semi-segregated box]

REAL ARRAYS
But despite appearances, there is more than that to a Real Array.  Two critical differences in behavior:

1.  Real arrays get an automatic _length_ property, and
*  _length_ automatically grows to L as the highest index is increased to L-1
*  elements are added or deleted to match as _length_ changes

2.  Arrays have extra automatic properties, namely methods (we'll see shortly)

[Draw: fully segregated box + length]

ARRAY CREATION
Literal version:
`var arr = []` //empty array; contrast with empty object {}
`var arr = ['a','b','c'...]`// list only values, since keys 0..N are implicit
Contrast with
`var obj = {0:'a',1:'b',2:'c'...}`//must list keys and values

'new' syntax:
`var arr = new Array();` //empty array
`var arr = new Array('a','b','c','d','e'...)` initialize with arguments!
`var arr = new Array(1,2,3,4...)` //numeric values
`var arr = new Array('2')` //single string value
BUT NOT:
`var arr = new Array(2)`  //single number != [2] but [undefined,undefined]
Treats single numeric argument as length, not value

When an Array is created this way, instead of ordinary object way (new Object... or {...})
JS knows its Array.   The console also knows to display it differently:
['a','b','c']
instead of
{0:'a',1:'b',2:'c'}

But notice its type:
`typeof arr; // "object"`  Still an object!

ARRAYS ARE OBJECTS

*Everything* that was true about an Object is true about an Array:
* can add strings as custom property names at any time just by setting them;
* can delete any property, _even numeric ones_
* non-numeric members referenced by either [] or . operator, chaining
* copied by reference
* last until GC'd
* etc.

Arrays are a special type of Object, the first of several which we'll see.
Objects, unlike Primitives, can have sub-types.
_typeof_ won't differentiate sub-types; it's only for differentiating primary types (primitives vs objects)
There are other tools for that, including a function:
`Array.isArray(obj)`//false for pseudo-array
`Array.isArray(arr)`//true for true Array

ARRAY METHODS

Earlier we said some properties of objects may be functions.  Arrays come with some automatic member-functions, or **methods**.
Methods are called by referencing them as members (by either . or [] operator), then applying the call operator:

`arr.push('z')`
`arr['push'](z)`//clunky but equivalent

What does push function do?  Takes one or more arguments and appends each to end of array, returning new length.

Related:
`arr.pop()`  Takes no arguments, strips away last array element (and decrements length), and returns element.

Related:
`arr.concat(arr2)` returns new array combining both.  DOES NOT change arr itself, unlike push and pop.
Push and pop have side-effects, like (x+=1); concat does not, like (x+1)

I guarantee that sometimes you will forget this and write a statement like _arr.concat(stuff)_ and wonder why nothing is happening.
You mean: _arr = arr.concat(stuff)_, just like you mean _(x=x+1)_.



ARRAY <--> STRING METHODS

ARR.join(delim) converts an array to a string by gluing its elements together with DELIMS.  It's especially convenient for punctuating lists with commas after every item except the last:
`arr.join(',')+'.';`

STR.join...

BUTbutbut... now can a string have a method, since it's a primitive?
Answer...

WRAPPER OBJECTS


Strings pretend to be objects:
string.split()

Strings pretend to be arrays:
string[0]

Don't be decieved; they're always atomic primitives


WRITING METHODS (delay...)

We'll spend a lot more time on functions and methods, but for now one new idea:
Since methods are functions which "belong to" an object, they often use a special keyword _this_
to refer to the object which owns them.  

Let's write one Array method as an example.
First we'll write it as an ordinary function:
```
function evens(arr) {
  var result=[];
  for (var i=1; i<arr.length; i++) {
	result.push(arr[i]);
  }
	return result;
}
//Test:
var alpha= ['a','b','c','d','e','f','g','h','i'];
evens(alpha);
```


Now change it into method:
alpha.evens = function() {
  var result=[];
  for (var i=1; i<this.length; i++) {
    result.push(this[i]);
  }
  return result;
}
//Test:
alpha.evens();
```
