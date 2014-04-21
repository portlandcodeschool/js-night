*General Questions/ Issues*

=== Mon #2 ===
###Objects (35)
* Summary: Unordered set of properties (2)
* Properties: Key+value (5)
  * Key is any string
  * Value has any type
* Object creation
  * Incremental (5)
      * `var obj=new Object(); obj.prop1=val1; obj.prop2=val2; ...`
  * Literal Notation (6)
      * `var obj = {};`
      * `var obj = {prop1:val1, prop2:val2,...};`
      * Nested
  * Creation Shorthand (2)
      * `var obj = new Object;`
      * `var obj = Object();`
      * NOT: `var obj = Object;`
(20)
* Member access
  * dot operator \_.\_ (5)
  * member/index operator \__[\_]_ (7)
* Delete keyword (3)
* Purpose of Objects (7)
  * group related data
  * namespace for related tools (e.g. _Math_)
  * index/dictionary/associative array: automatic retrieval

###Properties (30)
* Properties vs Variables (13)
* Enumerating properties (10)
  * _in_ operator
  * _for (\_ in \_)_ loops
* Methods: function properties (5)
  * _this_ keyword
* Automatic properties (2)

###Objects as Reference Types (25)
* Introduce Data Diagrams (5)
  * Primitive symbol: little box
  * Object symbol: big box, with incoming arrow (reference) from var
* References (10)
  * assignment is aliasing/shallow copy, not deep copy
  * equality vs identity for reference types
  * objects may be shared
  * "nested" objects not embedded, but linked
  * reference types as arguments are mutable
* Empty object _{}_ vs _null_ (2)
* Object lifetimes and Garbage Collection (8)

(20 break+object exercise)

### Big Picture #1: (10)
* First of three high-level structures: Membership Network/Graph
  * Diagram: object/property network
  * Objs link to objs in directed graph (possibly cyclic)
  * Entry point to graph is global object
     * All global vars are actually properties of global obj

###Arrays 2: as Objects (60)
* pseudo-arrays: objects with numeric properties (10)
  * Not actually numbers, but strings of digits
     * Note: alphabetic sorting of keys will not match numeric sorting
  * Diagram symbol: dashed separator for lower compartment, holding numeric properties
* real Arrays: automated _length_ property (10)
  * _length_ auto-adjusts to follow last element
  * elements auto-populate or truncate to follow _length_
* Data diagram symbol: double box, solid separator, _length_ compartment (5)
* Array creation syntax (5)
  * `var arr = new Array()` OR  `var arr= [];`
  * `var arr = new Array('a','b','c','d')` OR `var arr = ['a','b','c','d'];`
     * more efficient than pseudo-array literal: `var arr = {0:'a',1:'b',2:'c',3:'d'}`
  * `var arr = new Array(1,2,3,4)` OR `var arr = [1,2,3,4];`
  * `var arr = new Array("2")` OR `var arr = ["2"];`
  * BUT BEWARE: `new Array(2)` != `[2]`;
* Element dereference _array[n]_ is special case of _[]_ operator
  * quietly uses num->string auto-convert
* Array properties: as Objects, can have custom props (5)
  * simplay adds named properties (in upper compartment) alongside numeric ones
* Array built-in methods (10)
  * `array.push(elem)`, `array.pop()`, `array.concat(array)`
* Arrays <--> Strings (10)
  * `array.join(delim)`
  * `string.split(delim)`
* Multidimensional Arrays (0; leave for Exercises)
  * Diagram


=== Wed #2 ===

###Functions 2: as Objects (70)
* Functions are objects! (5)
  * can have custom or automatic props
  * _length_ property, which counts expected # of parameters
* Alternate creation syntax: (5)
  * `var add = new Function("x","y","return x+y;");`
* Function symbol in data diagram (2)
* Function methods (13)
  * As Objects, Functions can have methods!
  * `fn.call()`
  * `fn.apply()`
* Three invocations revisited: (10)
  * _definition_ is object creation
  * _use_ applies call operator _()_ to object
  * _mention_ like ordinary value:
     * aliasing functions
     * function name embeddable in expressions
(35)
* Functions as arguments (15)
  * Callbacks
* Anonymous functions (20)
  * Defintions w/o name are embeddable in expressions, arguments
  * Self-executing anonymous functions

###Big picture #2 (10)
* Diagram: Arrays and Functions are subclasses of Object
  * actually cartoon version of structure (Inheritance) we'll see in detail later...

(20 break+function practice)
(@100)
###Functions 3: Evaluation, Timeframes, and Scope
* Execution context/Scope (aka Where Variables Live)
  * Call objects/Scopes/Frames (15)
     * separate call object created for each function call/execution
     * distinct from "permanent" function object
          * call object normally GC'd after function exit
  * Big Picture #3: (10)
    * Second high-level structure: call chain
      * Diagram...
      * Unlike memberhship network, nodes are call objects
      * Chain links are between them, back to global
      * Out-links connect to object network; provide additional points of entry
  * Global object (aka "this") (15)
      * Global obj is a scope
      * Global variables are properties of global obj
      * _this_ within global functions is their owner, global obj
* Timeframes: (15)
  * function objs are made during definition
  * function body is evaluated later at CALL time
     * syntax errors may await
* EXAMPLE: Card pattern #3: Instance-maker (20)

=== Mon #3 ===

* EXAMPLE: Card pattern #4: Factory with Shared (Class) members (20)

* Nested vs. Delegated vs. Member functions (20)
  * Nested function is stored as local variables, only accessible within frame (7)
     * all functions are nested: global functions are nested in global object/scope
     * _this_ refers to global obj
  * Delegated function is stored in another object, made by parent function (7)
     * nested/delegated functions are made when parent is called, and may be evaluated even later
     * _this_ refers to owner object
  * Member function is stored as property of parent function (6)
     * made soon after parent
     * accessible outside function
     * _this_ refers to parent

* Closures (20)
   * nested functions retain access to parent's execution context
   * Application of Closures: private variables
      * Example: makeLoan...; Diagram

(20 break)

###Testing 2 (90)
* Write deferred-assertion module (poor-man's QUnit)

_(To be continued...)_

