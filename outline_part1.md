*General Questions/ Issues*

This course outline is a proposed series of topics and subtopics without regard to duration or segmentation.  Eventually, when all material is listed with duration estimates, it can be mapped onto weeks, nights, and segments with appropriate in-class exercises interspersed.

###JS Interpreter/Console/REPL
* Interaction as conversation
* Precedents: Command line; pocket calculator
* Browser's _Web Console_
* Node's _REPL_ ("Look Ma, no browser!")

###Expressions, Operators, Values
* Precedent: Arithmetic Expressions
* Operations as "Transmogrifiers": Inputs--???--->Output
* Operator templates: 
  * infix:  \_+\_
  * prefix:  -\_
  * postfix: \_!
  * unary vs. binary
* Operand (input) Values
* Return (output) Values
* Expression Nesting, Parse Trees
  * REPL is tree-reduction machine
* Plural values and separators (, ;)
  * Always one expression in, one value out
* Generalizations in programming:
  * saving results for later (i.e. Variables)
  * more types of values
  * many more operators, varied templates
     * Example: \_;\_ as joining operator
  * Side Effects


###Variables
* Represent as named boxes
* Declaration
  * _var_
  * use without declaration dangers
* Assignment vs. Equality
  * assignment operators: = += -+
* Identifiers/Names
* Scoping, Shadowing, and Globals (quick intro)

###Primitive Types
* JS is "untyped"/"weakly typed":
  * all values have type, but vars can change type
* _typeof_ operator
* _undefined_
  * not an error, but legitimate type/value
  * certain statements (eg _var_) always return _undefined_
* _number_
  * Integer vs Float
  * Special values: Infinity, NaN
* _string_    
  * use (identifiers) vs. mention (strings)
  * quotes, nesting, escaping
  * empty string
  * atomic and immutable
  * concatenation: + and += operators
* strings vs numbers...
  * "0" != 0, etc
  * auto conversion
     * _+_ is ambiguous, depends on operand types
     * numeric-string auto-conversion follies...
     * Lesson: high-level automation is helpful but dangerous
* _boolean_
  * _true_ and _false_
  * assertion operators: ==, ===, !=, <, >...

###Truthiness and Conditionals
* truish values
* falsish values
* _if_...
* _if_... _else_...
* ternary conditional operator \_?\_:\_
* ||, &&, ! as boolean operators
* || and && as generalized short-circuting operators
  * (A || B) means _if (A) A else B_ ("treat || trick")
  * (A && B) means _if (A) B else A_ ("win && celebrate")

###New Tool: Scratchpad!
* multi-line evaluation

###Loops
* _while_
  * continuation condition
  * change to condition
  * infinite loops
* _for_
  * iterator/counter
  * initialization
  * incrementing
* nested loops
* blocks vs statements vs expressions
  * certain keywords (_if_, _for_, etc) break expression trees

###Functions 1: Basics
* mini-program, reusable module, distinct purpose
* generalization of operators
* function names
* output: return values and side-effects
* input: parameters/arguments
* 3 kinds of invocation:
   * definition
     * _function_ keyword
   * use/call
     * call operator _()_
   * mention as value
     * Example: aliasing

###Arrays 1: Basics
*  series of values, indexed by number
*  a[i] is one value at position _i_
  * acts like variable: readable, writeable
*  start at 0, end at length-1

###(Practice Loops, Functions, Arrays)

to be continued...
