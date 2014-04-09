This course outline is a proposed series of topics and subtopics without regard to duration or segmentation.  Eventually, when all material is listed with duration estimates, it can be mapped onto weeks, nights, and segments with appropriate in-class exercises interspersed.

JS Interpreter/Console/REPL
  Interaction as conversation
  Precedent: Pocket Calculator
  Web Console
  Node REPL

Expressions, Operators, Values
  Precedent: Mathematical Expressions
  Operations as "Transmogrifiers": Inputs--???--->Output
  Operator templates: 
   infix:  __+__
   prefix:  -__
   postfix" __!
   unary vs. binary
  Operand (input) Values
  Return (output) Values
  Expression Nesting, Parse Trees
    REPL is tree-reduction machine
  Plural values and separators (,;)
  Generalizations in Programming:
    saving results for later (i.e. Variables)
    more types of values
    many more operators, varied templates
      Example: __;__
    Side Effects


Variables
  Represent as named boxes
  Declaration
    _var
    use without declaration dangers
  Assignment vs. Equality
    assignment operators: _= _+= _-+
  Identifiers/Names
  Scoping, Shadowing, and Globals (quick intro)

Primitive Types
  JS is "untyped"/"weakly typed":
    all values have type, but vars can change type
  _typeof operator
  _undefined
   not an error, but legitimate type/value
  _number
    Integer vs Float
    Special values: Infinity, NaN
  _string    
    use (identifiers) vs. mention (strings)
    quotes, nesting, escaping
    empty string
    atomic and immutable
    concatenation: _+ _+= operators
  (_strings vs _numbers)...
     "0" != 0, etc
     auto conversion
       _+ depends on operand type
       numeric-string auto-conversion follies
       Lesson: JS is helpful but dangerous
  _boolean
     _true and _false
     assertion operators: ==, ===, <, >...

Truthyness and Conditionals
  truish values
  falsish values
  _if...
  _if... _else...
 ternary __ _? __ _: __ operator
 _||, _&&, _! as boolean operators
 _|| and _&& as generalized short-circuting operators
   (A _|| B) means _if (A) A else B
   (A _&& B) means _if (A) B else A

New Tool: Scratchpad!
  multi-line evaluation

Loops
  _while
     continuation condition
     change to condition
     infinite loops
  _for
     iterator/counter
     initialization
     incrementing
  blocks vs statements vs expressions

Functions 1: Basics
  mini-program, reusable module, distinct purpose
  function names
  return values and side-effects
  parameters/arguments/inputs
  3 kinds of invocation:
    definition
      _function keyword
    use/call
      call operator _()
    mention as value
      aliasing

Arrays 1: Basics
  series of values, indexed by number
  a[i] is one value
  start at 0, end at length-1

(Practice Loops, Functions, Arrays)

to be continued...
