*General Questions/ Issues*

###Objects
* Summary: Unordered set of properties
* Properties: Key+value
  * Key is any string
  * Value has any type
* Object creation
  * Incremental
      * var obj=new Object(); obj.prop1=val1; obj.prop2=val2;...
  * Literal Notation
      * var obj = {};
      * var obj = {prop1:val1, prop2:val2,...};
  * Creation Shorthand
      * var obj = new Object;
      * var obj = Object();
      * NOT: var obj = Object;
* Member access
  * dot operator \_.\_
  * member/index operator \__[\_]_
* Delete keyword
* Purpose of Objects
  * group related data
  * namespace for related tools (e.g. Math)
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
  * Object symbol: big box
  * Primitive symbol: little box
* References
  * assignment is aliasing/shallow copy, not deep copy
  * equality vs identity for reference types
  * objects may be shared
  * "nested" objects not embedded, but linked
  * reference types as arguments are mutable
* Empty object {} vs _null_
* Object lifetimes and Garbage Collection

###Arrays 2: as Objects
* pseudo-arrays: objects with numeric properties
* real Arrays: automated _length_ property
* Array creation syntax
  * var arr = new Array() OR  var arr= [];
  * var arr = new Array('a','b','c','d') OR var arr = ['a','b','c','d'];
  * var arr = new Array(1,2,3,4) OR var arr = [1,2,3,4];
  * BUT BEWARE: new Array(n) != [n];
* Element dereference _arr[n]_ is special case of _[]_ operator
  * secretly uses num->string auto-convert
* Data diagram symbol: double box
* Array properties: as Objects, can have custom props
* Array methods
  * push, pop, concat
* Strings & Arrays
  * Array.join
  * String.split
* Multidimensional Arrays

###Functions 2: as Objects
* Functions are objects!
  * can have custom or automatic props
  * _length_ property
* Alternate creation syntax:
  * var add = new Function("x","y","return x+y;");
* Function symbol in data diagram
* Function methods
  * As Objects, Functions can have methods!
  * fn.call()
  * fn.apply()
* Three invocations revisited:
  * definition is object creation
  * use applies call operator to object
  * mention/alias like ordinary value
    * function name embeddable in expressions
* Functions as arguments
  * Callbacks
* Anonymous functions
  * Defintions w/o name are embeddable in expressions, arguments
  * Self-executing anonymous functions

###Big picture
* Diagram: Arrays and Functions are subclasses of Object
* Diagram: membership/reference graph, global obj. at root


###Functions 3: Evaluation, Timeframes, and Scope
* Execution context/Scope (aka Where Variables Live)
  * Call objects/Scopes/Frames
  * Global object (aka "this")
      * Global obj is a scope
      * Global variables are properties of global obj
      * _this_ within global functions is their owner, global obj
* Timeframes:
  * function objs are made during definion
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

###Testing 2
* Write deferred-assertion module (poor-man's QUnit)

###Factory Functions
* build standardized objects
* includes boilerplate object creation and return; take those out to develop...

###Constructors!
* delegate boilerplate steps to another component (_new_), leaving only class-specific initialization
* Factory call (_x=makeThing()_) vs. Constructor call (_x=new Thing())
* Constructors already used:
  * {}  --> new Object()
  * []  --> new Array()
  * function fn() {}  --> new Function()
  * Ctors are only way of making objects!
* A Ctor:
  * represents a class/family of similar objects;
  * is function which configures new object to behave like its family;
  * has form of a method (no return val, _this_ is target);
  * can be called as initializer on existing object;
  * is named by CapitalizedNounPhrase;
* Ctor is ordinary function used in special way; becomes constructor when used in context of keyword _new_
* _new_
  * is special idiom; interpret as binary operator: new \_(\_), not unary _new \__ with function call
  * Diagram: steps within _new Ctor(arg)_ operation...
  * write _new()_ function, simulating _new_ operator
* Proof that construction is result of _new_, not Ctor definition:
  * use ordinary function: _new add()_;
  * use naked Ctor: x = Thing();
    * Worse than doesn't work: overwrites global vars!

###Constructors, Converters, and Wrapper Objects
* Why are some build-in constructors ok when naked?
    * EX: obj = Object()
* Converting Constructors:
  * convert their arg to corresponding type
      * Number, String, Boolean --> primitive
      * Object --> object
  * So what is result with _new_?  Wrapper obj!
  * new String is object which behaves like string, but with methods
    * split()
  * new Number
  * valueOf

###Constructor (Class) Methods and Properties
* Familiar examples:
  * Array.concat(a,b)
* Instance-counting constructors; singletons
 
###Prototypes
  * Triad/family diagram: Ctor, Prototype, Instance
  * Ctor <--> Inst relation
    * Insts are "children" of Ctor, members of its class
    * _inst.constructor_ (apparent) property
  * Ctor <--> Proto relation
    * Proto is "adopted/honorary firstborn"
      * appears to be child of, but not made by Ctor
    * mutually linked to Ctor:
      * ctor.prototype
      * proto.constructor
    * created along with Ctor
      * every function has a Proto!
  * Proto <--> Inst relation
    * setting prop always applies to Inst, but getting looks to Proto as backup
      * "Psst!  Proto! Can you help me X?
    * Proto is "valet": steps in to do jobs on behalf of Inst when Inst can't alone
      * Inst get the credit: appears to have done job itself
      * EX: _inst.constructor_ property actually belongs to Proto
      * _in_ true for inherited properties
      * _hasOwnProperty()_ reveals difference
  * \_\_proto\_\_ link
    * deprecated/non-standard; you'll see it, but don't use it
    * ambiguity in language when discussing "prototype": down-link or back-link?
      * for our discussion: let "proto" mean backward (a la __proto__), let "prototype" mean downward

  * ways of referencing Proto:
    * Ctor.prototype
    * inst.constructor.prototype
      * Diagram (sideways, up, down): "Psst! Proto! Ask our constructor for its prototype, i.e. you!"
    * inst.\_\_proto\_\_
    * Object.getPrototypeOf(inst)

  * Prototype (shared instance) methods and properties
    * all pre-defined methods are really prototype methods!
      * EX: array.concat(tail)
      * distinguish from Ctor method Array.concat(array,tail)
    * _this_ refers to Inst, not Proto (Proto never gets credit!)

### Prototype Exercises:
  * Roman Nvmeral Calcvlator (Number.prototype)

### Inheritance

_(To be continued...)_
