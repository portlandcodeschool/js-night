*General Questions/ Issues*
=== Mon #3 ===

###Factory Functions (review)
* build standardized objects
* includes boilerplate object creation and return; take those out to develop...

###Constructors! (30)
* delegate boilerplate steps to another component (_new_), leaving only class-specific initialization (3)
* Factory call `x=makeThing()` vs. Constructor call `x=new Thing()`
* Constructors already used: (3)
  * `{}`  --> `new Object()`
  * `[]`  --> `new Array()`
  * `function fn() {}`  --> `new Function()`
  * Ctors are only way of making objects!
* A Ctor: (5)
  * represents a class/family of similar objects;
  * is function which configures new object to behave like its family;
  * has form of a method (no return val, _this_ is target);
  * can be called as initializer on existing object;
  * is named by CapitalizedNounPhrase;
* Ctor is ordinary function used in special way; becomes constructor when used in context of keyword _new_
* _new_ (10)
  * is special idiom; interpret as binary operator: `new _(_)`, not unary `new _` with function call
  * Diagram: steps within `new Ctor(arg)` operation...
  * write _new()_ function, simulating _new_ operator
* Proof that construction is result of _new_, not Ctor definition: (9)
  * use ordinary function: `new add();`
  * use naked Ctor: `x = Thing();`
     * Worse than doesn't work: overwrites global vars!

###Constructors, Converters, and Wrapper Objects (20)
* Why are some build-in constructors ok used without _new_?
    * EX: `obj = Object()`
* Special converting Constructors: (5)
  * convert their arg to corresponding type
      * Number, String, Boolean --> primitive
      * Object --> object
* So what is result with _new_?  Wrapper obj! (10)
  * new String() is object which behaves like string, but with methods
    * `"abcdef".split('')`
  * new Number() is object which behaves like number, but with methods
    * `123456789.0.toExponential()`
    * and properties: `3.1415.flavor="apple"`
  * _valueOf_ method

###Constructor (Class) Methods and Properties (15)
* Familiar examples:
  * `Array.concat(a,b)`
* Instance-counting constructors; singletons
 
(20 break)

###Prototypes (35)
  * Triad/family diagram: Ctor, Prototype, Instance (3)
  * Ctor <--> Inst relation (3)
    * Insts are "children" of Ctor, members of its class
    * _inst.constructor_ (apparent) property
  * Ctor <--> Proto relation (4)
    * Proto is "adopted/honorary firstborn"
      * appears to be child of Ctor, but not made by Ctor
    * mutually linked to Ctor:
      * _Ctor.prototype_ --> Proto
      * _proto.constructor_ --> Ctor
    * created along with Ctor
      * every function has a Proto!
  * Proto <--> Inst relation (10)
    * setting prop always applies to Inst, but getting looks to Proto as backup
      * "Psst!  Proto! Can you help me do X?
    * Proto is "valet": steps in to do jobs on behalf of Inst when Inst can't alone
      * Inst get the credit: appears to have done job itself
      * EX: _inst.constructor_ property actually belongs to Proto
      * operator _in_ is true for inherited properties
      * method _hasOwnProperty()_ reveals difference
  * \_\_proto\_\_ link (5)
    * deprecated/non-standard; you'll see it, but don't use it
    * ambiguity in language when discussing "prototype": down-link or back-link?
      * for our discussion: let "proto" mean backward (as in \_\_proto\_\_); let "prototype" mean downward

  * ways of referencing Proto: (5)
    * `Ctor.prototype`
    * `inst.constructor.prototype`
       * Diagram (sideways, up, down): "Psst! Proto! Ask our constructor for its prototype, i.e. you!"
    * `inst.__proto__`
    * `Object.getPrototypeOf(inst)`

  * Prototype (shared instance) methods and properties (5)
    * all pre-defined methods are really prototype methods!
      * EX: `array.concat(tail)` comes from `Array.prototype`
      * distinguish from Ctor method `Array.concat(array,tail)`
    * _this_ refers to Inst, not Proto (Proto never gets credit!)

<!-- Prototype Homework:
* Roman Nvmeral Calcvlator (Number.prototype) -->

### Inheritance & Subclassing (35)
* Purpose: subclasses inherit but modify behavior; (5)
   * produces variant of complex programming without changing original or re-implementing
* Testing inheritance: \_instanceof\_ operator (5)
* Creating custom subclass (Diagram): (15)
   * superclass constructs new instance
   * subclass adopts it as new prototype, discarding old
   * Example: Tarot Card Deck (10)
* Ad hoc Inheritance: _Object.create()_ (10)

### Big Picture #2, reprise: (20)
  * Refine earlier cartoon version of Inheritance:
    * Diagram: Inheritance network is additional linkage between objects of Property/Membership Network
    * Special node isn't _global_ (source) but Object.prototype (terminus)

_(To be continued...)_

