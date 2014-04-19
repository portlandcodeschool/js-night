*General Questions/ Issues*

###Factory Functions
* build standardized objects
* includes boilerplate object creation and return; take those out to develop...

###Constructors!
* delegate boilerplate steps to another component (_new_), leaving only class-specific initialization
* Factory call `x=makeThing()` vs. Constructor call `x=new Thing()`
* Constructors already used:
  * `{}`  --> `new Object()`
  * `[]`  --> `new Array()`
  * `function fn() {}`  --> `new Function()`
  * Ctors are only way of making objects!
* A Ctor:
  * represents a class/family of similar objects;
  * is function which configures new object to behave like its family;
  * has form of a method (no return val, _this_ is target);
  * can be called as initializer on existing object;
  * is named by CapitalizedNounPhrase;
* Ctor is ordinary function used in special way; becomes constructor when used in context of keyword _new_
* _new_
  * is special idiom; interpret as binary operator: `new _(_)`, not unary `new _` with function call
  * Diagram: steps within `new Ctor(arg)` operation...
  * write _new()_ function, simulating _new_ operator
* Proof that construction is result of _new_, not Ctor definition:
  * use ordinary function: `new add();`
  * use naked Ctor: `x = Thing();`
     * Worse than doesn't work: overwrites global vars!

###Constructors, Converters, and Wrapper Objects
* Why are some build-in constructors ok when naked?
    * EX: `obj = Object()`
* Converting Constructors:
  * convert their arg to corresponding type
      * Number, String, Boolean --> primitive
      * Object --> object
* So what is result with _new_?  Wrapper obj!
  * new String() is object which behaves like string, but with methods
    * `"abcdef".split('')`
  * new Number() is object which behaves like number, but with methods
    * `123456789.0.toExponential()`
    * and properties: `3.1415.flavor="apple"`
  * _valueOf_ method

###Constructor (Class) Methods and Properties
* Familiar examples:
  * `Array.concat(a,b)`
* Instance-counting constructors; singletons
 
###Prototypes
  * Triad/family diagram: Ctor, Prototype, Instance
  * Ctor <--> Inst relation
    * Insts are "children" of Ctor, members of its class
    * _inst.constructor_ (apparent) property
  * Ctor <--> Proto relation
    * Proto is "adopted/honorary firstborn"
      * appears to be child of Ctor, but not made by Ctor
    * mutually linked to Ctor:
      * _Ctor.prototype_ --> Proto
      * _proto.constructor_ --> Ctor
    * created along with Ctor
      * every function has a Proto!
  * Proto <--> Inst relation
    * setting prop always applies to Inst, but getting looks to Proto as backup
      * "Psst!  Proto! Can you help me do X?
    * Proto is "valet": steps in to do jobs on behalf of Inst when Inst can't alone
      * Inst get the credit: appears to have done job itself
      * EX: _inst.constructor_ property actually belongs to Proto
      * operator _in_ is true for inherited properties
      * method _hasOwnProperty()_ reveals difference
  * \_\_proto\_\_ link
    * deprecated/non-standard; you'll see it, but don't use it
    * ambiguity in language when discussing "prototype": down-link or back-link?
      * for our discussion: let "proto" mean backward (as in \_\_proto\_\_); let "prototype" mean downward

  * ways of referencing Proto:
    * `Ctor.prototype`
    * `inst.constructor.prototype`
       * Diagram (sideways, up, down): "Psst! Proto! Ask our constructor for its prototype, i.e. you!"
    * `inst.__proto__`
    * `Object.getPrototypeOf(inst)`

  * Prototype (shared instance) methods and properties
    * all pre-defined methods are really prototype methods!
      * EX: `array.concat(tail)` comes from `Array.prototype`
      * distinguish from Ctor method `Array.concat(array,tail)`
    * _this_ refers to Inst, not Proto (Proto never gets credit!)

### Prototype Exercises:
  * Roman Nvmeral Calcvlator (Number.prototype)

### Inheritance

### Big Picture #2, reprise:
  * Refine earlier cartoon version of Inheritance:
    * Diagram: Inheritance network is additional linkage between objects of Property/Membership Network
    * Special node isn't _global_ (source) but Object.prototype (terminus)

_(To be continued...)_

