*General Questions/ Issues*

This course outline is a proposed series of topics and subtopics without regard to duration or segmentation.  Eventually, when all material is listed with duration estimates, it can be mapped onto weeks, nights, and segments with appropriate in-class exercises interspersed.

=== Mon #1 ===
###Icebreaker: expression parsing interactive puzzle! (20)
* Lessons: teamwork, persistence, inference

###JS Interpreter/Console/REPL (10)
* Interaction as conversation
* Precedents: Command line; pocket calculator
* Browser's _Web Console_
* Node's _REPL_ ("Look Ma, no browser!")

###Expressions, Operators, Values (45)
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
(20)
* Plural values and separators (, ;)
  * Always one expression in, one value out
* Generalizations in programming:
  * saving results for later (i.e. Variables)
  * more types of values
  * many more operators, varied templates
     * Example: \_;\_ as joining operator
  * Side Effects
(20)
__Take away:__ well-formed expressions are tree-like; programs do work by transforming values through tree and leaving changes elsewhere

###Variables (the "Elsewhere") (25)
* Represent as named boxes (5)
* Declaration (5)
  * _var_
  * use without declaration dangers
* Assignment vs. Equality (5)
  * assignment operators: = += -+ ++ --
* Identifiers/Names (5)
* Scoping, Shadowing, and Globals (5)
  * variables organized in structure of "nested boxes"
  * each var lives in one box, can be seen from that box or any within
  * outermost box called "global scope"; global vars visible from anywhere
  * BUT: duplicate names in inner boxes hide ("shadow") outer vars
  * Bad practice to use global variables, but we'll start out that way
     * console sees only globals
__Take away:__  named values (vars) can be stored, copied, compared, but not always reached from everywhere

---(10m break)---

###Primitive Types (60)
* JS is "untyped"/"weakly typed": (2)
  * all values have type, but vars can change type
* _typeof_ operator (4)
* _undefined_ (5)
  * not an error, but legitimate type/value
  * certain statements (eg _var_) always return _undefined_
* _number_ (4)
  * Integer vs Float
  * Special values: Infinity, NaN
* _string_   (15)
  * use (identifiers) vs. mention (strings)
  * quotes, nesting, escaping
  * empty string
  * atomic and immutable
  * concatenation: + and += operators
* strings vs numbers... (20)
  * "0" != 0, etc
  * auto conversion
     * _+_ is ambiguous, depends on operand types
     * numeric-string auto-conversion follies...
     * Lesson: high-level automation is helpful but dangerous
* _boolean_ (10)
  * _true_ and _false_
  * assertion operators: ==, ===, !=, <, >...

==== Wed #1====
###Truthiness and Conditionals (35)
* truish values
* falsish values
* _if_...
* _if_... _else_...
(15)
* ternary conditional operator \_?\_:\_ (5)
  * _?:_ is embeddable in expressions, unlike _if..._
* ||, &&, ! as boolean operators (5)
* || and && as generalized short-circuting operators (10)
  * `(A || B)` means `if (A) A else B` ("treat || trick")
  * `(A && B)` means `if (A) B else A` ("win && celebrate")

###New Tool: Scratchpad! (10)
* multi-line evaluation

###Loops (35)
* _while_ (10)
  * continuation condition
  * change to condition
  * infinite loops
* _for_ (10)
  * iterator/counter
  * initialization
  * incrementing
* nested loops (5)
* blocks vs statements vs expressions (10)
  * certain keywords (_if_, _for_, etc) break expression trees

---(20 break+loop exercise)---

###Functions 1: Basics (25)
* mini-program, reusable module, distinct purpose (2)
* generalization of operators (2)
* function names (2)
* output: return values and side-effects (3)
* input: parameters/arguments (4)
   * jargon: parameters are named boxes in receiver; args are values from caller
* 3 kinds of invocation: (5)
   * definition
     * _function_ keyword
   * use/call
     * call operator _()_
   * mention as value
     * Example: aliasing
(18)
* function definition introduces new "frame"/"scope" (7)
  * variables within function are "local", can see outward
  * Define outward... (lexical vs dynamic scoping)?
* (more examples)

###Testing 1: Assertion (20)
* write poor-man's assert()
* sprinkle liberally through all samples following


###Arrays 1: Basics (15)
*  series of values, indexed by number
*  a[i] is one value at position _i_
  * acts like variable: readable, writeable
*  start at 0, end at length-1

###(Practice Loops, Functions, Arrays) (20)

_(To be continued...)_
