*General Questions/ Issues*

###Objects
* Summary: Unordered set of properties
* Properties: Key+value
  * Key is any string
  * Value has any type
* Object creation
  * Incremental
      * `var obj=new Object(); obj.prop1=val1; obj.prop2=val2; ...`
  * Literal Notation
      * `var obj = {};`
      * `var obj = {prop1:val1, prop2:val2,...};`
  * Creation Shorthand
      * `var obj = new Object;`
      * `var obj = Object();`
      * NOT: `var obj = Object;`
* Member access
  * dot operator \_.\_
  * member/index operator \__[\_]_
* Delete keyword
* Purpose of Objects
  * group related data
  * namespace for related tools (e.g. _Math_)
  * index/dictionary/associative array: automatic retrieval

###Properties
* Properties vs Variables
* Enumerating properties
  * _in_ operator
  * _for (\_ in \_)_ loops
* Methods: function properties
  * _this_ keyword
* Automatic properties

###Objects as Reference Types
* Introduce Data Diagrams
  * Primitive symbol: little box
  * Object symbol: big box, with incoming arrow (reference) from var
* References
  * assignment is aliasing/shallow copy, not deep copy
  * equality vs identity for reference types
  * objects may be shared
  * "nested" objects not embedded, but linked
  * reference types as arguments are mutable
* Empty object _{}_ vs _null_
* Object lifetimes and Garbage Collection

### Big Picture #1:
* First of three high-level structures: Membership Network/Graph
  * Diagram: object/property network
  * Objs link to objs in directed graph (possibly cyclic)
  * Entry point to graph is global object
     * All global vars are actually properties of global obj

###Arrays 2: as Objects
* pseudo-arrays: objects with numeric properties
  * Not actually numbers, but strings of digits
     * Note: alphabetic sorting of keys will not match numeric sorting
  * Diagram symbol: dashed separator for lower compartment, holding numeric properties
* real Arrays: automated _length_ property
  * _length_ auto-adjusts to follow last element
  * elements auto-populate or truncate to follow _length_
* Data diagram symbol: double box, solid separator, _length_ compartment
* Array creation syntax
  * `var arr = new Array()` OR  `var arr= [];`
  * `var arr = new Array('a','b','c','d')` OR `var arr = ['a','b','c','d'];`
     * more efficient than pseudo-array literal: `var arr = {0:'a',1:'b',2:'c',3:'d'}`
  * `var arr = new Array(1,2,3,4)` OR `var arr = [1,2,3,4];`
  * `var arr = new Array("2")` OR `var arr = ["2"];`
  * BUT BEWARE: `new Array(2)` != `[2]`;
* Element dereference _array[n]_ is special case of _[]_ operator
  * quietly uses num->string auto-convert
* Array properties: as Objects, can have custom props
  * simplay adds named properties (in upper compartment) alongside numeric ones
* Array built-in methods
  * `array.push(elem)`, `array.pop()`, `array.concat(array)`
* Arrays <--> Strings
  * `array.join(delim)`
  * `string.split(delim)`
* Multidimensional Arrays (left for Exercises?)
  * Diagram

###Functions 2: as Objects
* Functions are objects!
  * can have custom or automatic props
  * _length_ property, which counts expected # of parameters
* Alternate creation syntax:
  * `var add = new Function("x","y","return x+y;");`
* Function symbol in data diagram
* Function methods
  * As Objects, Functions can have methods!
  * `fn.call()`
  * `fn.apply()`
* Three invocations revisited:
  * _definition_ is object creation
  * _use_ applies call operator _()_ to object
  * _mention_ like ordinary value:
     * aliasing functions
     * function name embeddable in expressions
* Functions as arguments
  * Callbacks
* Anonymous functions
  * Defintions w/o name are embeddable in expressions, arguments
  * Self-executing anonymous functions

###Big picture #2
* Diagram: Arrays and Functions are subclasses of Object
  * actually cartoon version of structure (Inheritance) we'll see in detail later...

###Functions 3: Evaluation, Timeframes, and Scope
* Execution context/Scope (aka Where Variables Live)
  * Call objects/Scopes/Frames
     * separate call object created for each function call/execution
     * distinct from "permanent" function object
          * call object normally GC'd after function exit
  * Big Picture #3:
    * Second high-level structure: call chain
      * Diagram...
      * Unlike memberhship network, nodes are call objects
      * Chain links are between them, back to global
      * Out-links connect to object network; provide additional points of entry
  * Global object (aka "this")
      * Global obj is a scope
      * Global variables are properties of global obj
      * _this_ within global functions is their owner, global obj
* Timeframes:
  * function objs are made during definition
  * function body is evaluated later at CALL time
     * syntax errors may await
* Nested vs. Delegated vs. Member functions
  * Nested function is stored as local variables, only accessible within frame
     * all functions are nested: global functions are nested in global object/scope
     * _this_ refers to global obj
  * Delegated function is stored in another object, made by parent function
     * nested/delegated functions are made when parent is called, and may be evaluated even later
     * _this_ refers to owner object
  * Member function is stored as property of parent function
     * made soon after parent
     * accessible outside function
     * _this_ refers to parent
* Closures
   * nested functions retain access to parent's execution context
   * Application of Closures: private variables
      * Example: makeLoan...; Diagram

###Testing 2
* Write deferred-assertion module (poor-man's QUnit)

_(To be continued...)_

