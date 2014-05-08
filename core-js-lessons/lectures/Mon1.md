INTRODUCTIONS & HOUSEKEEPING (Ben?)
* Each class will present information, but there's not enough time for everything.  In-class explanations provide a common foundation, but you need to supplement them with other sources (i.e. Reading list).

* Each class will have at least one intermission/break, but time is short and we will begin promptly at 6 each night.

* Ben and Dan will both lecture frequently, but not every time, and their roles may not be exactly symmetric; we're still sorting out how the team works. (TA roles?)

* Homework is not always turned in or evaluated, but it is always mandatory.  You cannot learn JS without spending hours outside of class beating your head against it.  That's what programming looks like.  We'll talk more about Homework #1 on Wed, but start looking at it after tonight (give URL).

==== Part 1 ==== (Dan?)

CONSOLE
Every browser comes with a JS interpreter built in, and it quietly does its work on any web page which includes JS (which these days is most of them).  But there's also a back door (or a "service counter") at which we can interact directly with that interpreter and speak JS with it [draw JS robot at window]... the **console**.  [Show Tools...Web Developer... Console]  A version of the console is available on every browser, but in here we'll only see two flavors: Chrome's and Firefox's [Show side-by-side FF/CR console].
The console is an application with a (partly graphical) user interface: much of what we see in the console is not intrinsic to JS, but is simply a design choice for what the service counter should look like.  Engineers at Google or Mozilla may have valid differences of opinion about the decor.  But what both tools share identically (almost!) is the language they speak:
put the same phrase in, get the same answer out.  Order a sandwich in a particular way, get the same sandwich every time, at every counter.  The answer may be decorated differently in the interface, but it is the same underlying information.  That consistency is what defines JS as a single language.

The big picture is slightly more complicated: [Draw ecology: overlapping/Venn circles]
each browser implements a particular language, each slightly different on the fringes.  But they have an intersection sharply defined by an independent organization called Ecma (skip long story...), so this common "normalized" language is officially called ECMAScript, now on version 5 (since 2009).  Any behavior of the language which is outside that ECMA-5 circle is a kind of "slang" which, although it might work consistently on a particular browser, shouldn't be used.  But such examples are rare, and we'll be careful not to teach you anything not cleanly within that circle.

[Aside: JS evolved in the browser and for the browser, but it has recently graduated and moved out on its own: NodeJS is an environment which implements JS with no browser at all!  We'll use it extensively after Week 5(?). But it still has a service counter which behaves the same way: same language in, same sandwich out.]

Let's look at that dialogue.  Another name for that interaction is **REPL**: "Read, Evaluate, Print Loop".  
That means: you say one thing (type a single expression/statement) and the interpreter evaluates it-- boils it down to a single, irreducible value-- and prints that equivalent value, then waits for another round.  In the course each evaluation, there might also be side-effects, but the REPL will always give back one value.  (For example: (1+2*3)--->7; 7-->7). The conversation is recorded in this log [show console]: one phrase in (left arrow), one equivalent value out (right arrow).

This example should remind you of a REPL you've used forever: a pocket calculator.  You build mathematical expressions incrementally, press =, and it gives you back a single equivalent value and waits for more.
And that's a useful analogy to start with, because JS, and every other programming language, borrows the language of mathematics.
All programming is just a fancy generalization of saying (1+2*3).
The key idea is...

OPERATORS

You all have experience with expressions and operators in arithmetic:  (1+2*3)
Most arithmetic examples are also valid JS, and mean what you expect.
But in programming, we have to generalize that precedent a bit.

Think of an **operator** as: punctuation which acts like a funnel
(draw triangle: wide top, narrow bottom): it somehow merges/combines several inputs into single output.
Inputs are called **operands**; the whole phrase around one operator (2*3) is an **operation**.  And we can nest them: feed the output of one into input of another: (1+(2*3)).  (Draw two-layer funnel.)  The whole phrase, with one or more nested operations, is an **expression**.

Operators vary in number of inputs (usually 1-3):
if 2 inputs, called "binary" operator (not because it uses binary numbers!)
if 1 input, called "unary";
if 3, called "ternary" (rare; "ternary" usually means one particular 3-input op which we'll see next class)

Operators also vary in where they look for their inputs:
Infix: operator sits between inputs (_ + _)
Prefix: operator sits before (- _)
Postfix: operator sits after (factorial \_!, not valid in JS)

Generalize that variability as "operator template", as in _ OP _ .

And of course, ops vary in how they merge their inputs.  We understand some of those merges in arithmetic, but shortly we'll see new kinds of merging.

---
For example, here's a new arithmetic (binary & infix) operator especially useful in programming: modulo division (or "mod").
Any time you divide (e.g. x/y), you get both an integer quotient (how many times y fits in x) and a remainder (what's left over, a fraction of y).
Normal division is concerned with quotient, but _mod_ only cares about remainder.
EX: 10000007 % 10 is 7.  Doesn't care how many times 10 fits evenly in 1 million, only that 7 is left over.
---
Consider this expression:
(4+(-1))*(5-1)/(7%4)
Parse it into a tree! (Diagram...)
You know what order to proceed because of parentheses:
start on the innermost operator: unary -1, which turns 1 into -1...
merge 4 with -1 in a binary addition...
then (5-1)-->4...
then (7%4)-->3...
Now we've satisfied all the parentheses (and * and / get equal priority) so go left to right:
(3*4)->12...
And finally (12/3) --> 4

What happens if you leave out the parentheses? As in:
4+-1*5-1/7%4 [Demo]
Totally different answer!  Interpreted using rules of **operator precedence** as:
(4+((-1)*5))-((1/7)%4)
Every operator has pre-defined precedence level, a number; lower numbers go first.
*, /, and % are level 5; + and - are level 6.  Dozens of other ops come before and after.  You might memorize them all eventually, but use parentheses generously to eliminate doubt.

[Aside: how does JS deal with initial (4+-1...)? [Demo] There is no operator +-,
so there's only one valid interpretation.  But beware: there are operators with multi-character names (e.g. --, which we'll see later), so 4--1 is completely different! [Demo])
Can always insert spaces (4- -1), which resolves ambiguity about which op to use, but not about precedence.]

Summary: JS parses every expression into a tree by unambiguous rules, and reduces it to a single output value!
REPL/Console/JS robot is just an expression-reduction machine: always reduces as far as possible.

---
Another example of merging:  (1+2, 3+4) [Demo]
Comma is a "joining" operator: evaluates left side, then ignores it during merge, outputs only right side.
"Ignores" doesn't mean there's no effect from left; may be numerous changes or side-effects (but not here).  But it doesn't use the final output from left sub-expression in output of whole.

Comma's primary value for us is to do more than one thing in a request to the console.
In rules of the REPL ("one value in, one value out"), we're not allowed to say two things: (1 2) [Demo].  But can join them into one expression: (1, 2) [Demo].  That lets REPL decide how to give just one value back.

---
Another example of merging: (1==2)
The **equality** operator compares left and right.  It doesn't output either, nor any number at all, but instead returns one of two symbols (special non-numeric values): _true_ or _false_, depending on sameness of left and right.
Try this: (1==2)==(3==4) --> true!
[Aside: If instead we say (1==2==3==4), answer depends on whether (false==3).  Answer is unsurprisingly no, but we'll explore exactly why next time.]
---

SIDE EFFECTS

So far, all operations have been entirely self-contained within their own funnel-tree: however they merge values, they do so without changing anything outside the expression.  You can insert (4+(-1)*(5-1)/(7%4)) anywhere, and it will be exactly equivalent to a passive 4.  But other ops are less humble, they leave a mark "elsewhere" on their environment!
Most importantly, the **assignment** operator, as in (x=1).
But first, we need to talk about variables...

VARIABLES (the elsewhere)
You've all seen variables in algebra, where "X represents the unknown".  But in the scope of one algebra problem, X has a constant value.  Variables in (almost) every programming language are different: "variable" means not "unknown" but "mutable".
A **variable** is a _named box_ which holds one value, but can change values at any time.
(x=1, x=2, x=3) is just fine: x is the name of a box holding first 1, then 2, then 3. (Diagram)
The assignment operator = changes the value in the box, and thereby changes its environment and affects other things which use that box.  (Draw funnel with manipulator claw!)  So an expression which contains = somewhere within it will probably not leave things the way it found them.

For example, let's insert a couple of references to variable x within our earlier example:
((4+(-1))*(x=(5-1))/(7%x) == x)
Parse as before, but now:

Whenever we assign (x=_), operator puts the right-hand value into box x (use the claw!) AND outputs it as operation result;
otherwise when we see x, use its current value as an operand.
(Diagram; Trace expression output...)--> (4==4)--> true

---
Another kind of merging: incremental assignment

Before we move away from =, a quick introduction to its cousins: +=, -=, *=, /=, %= ...
Where x=_ just throws away the old value of x, these merge it with the right hand value;
they're shorthand for : (x=(x+_)), (x=(x-_)), etc.  As we expect from the long form, these ops return the new value. [Demo]

Often the right-hand value is +1 or -1, so there are special operators which don't need the operand at all:
++x is (x=(x+1))  (Note template: prefix unary OP_)
--x is (x=(x-1))
Why are they prefix?  Because increment/decrement happens _before_ returning the value.
In constrast, there's another form, where the change is applied (it appears) _after_ returning the value:
x++ is (x=x+1, x-1) (i.e. return OLD x)
x-- is (x=x-1, x+1)
====

VARIABLE DECLARATION and NAMING
To use a variable, we first have to make and name its box by **declaring** it like so:
`var x`
If we want, can **initialize** it (put a value in the box) at the same time:
`var x = 1`
But regardless of whatever initial value we provide, _var always returns **undefined**_.  That's just the definition of its output; it has a side-effect (make and/or fill a box) but no return value.

[Aside: in fact, _var_ isn't technically an operator and can't be embedded in expressions; e.g. ((var x)==undefined) returns an error.  _var_ is a _keyword_ but not an operator, and (var x) is a **statement** which is not a expression.  (Draw Venn diagram)]

NAMES: What can the box be called? Any word which:
1) Contains only letters, numbers, $, or _;
2) doesn't start with a number; and
3) isn't already defined as a **keyword** with built-in meaning.
But culture adds more constraints:
4) camelCaseForMultipleWords
5) initial Capital, _, or $ only for special circumstances, to be explained later

Short version: always start with a lowercase letter, unless you have a really good reason not to.
---

USING UNDECLARED VARS...
It sure looks like I can use variables without declaring them!  What if I just skip the declaration?

This is very much like asking: what will happen if I run next to a pool... blindfolded...with scissors?
And the answer is: one of three things will happen.
If you're slightly unlucky: nothing bad will happen; things will work as you expect.  This time.
If you're lucky: you get a sternly worded reprimand from the lifeguard.  In JS, that means the interpreter will find no valid interpretation of what you said, and deliver a Reference Error, and give you a chance to mend your ways.
If you're really unlucky:  the JS interpreter will find a valid interpretation of what you said, but not the one you meant.
And your program will silently malfunction downstream of where the problem is, and you will hate your life.

We'll eventually talk about the details of what can go wrong, but only as we add layers of complexity.

---
SCOPE

If variables are boxes, where do the boxes live?
The world of Javascript is not a single shared environment; it's subdivided in two ways.
First:  each JS process lives in a world isolated from the others.  When JS is in the browser, that means each page (and each tab) is a separate world.  When we open a console, we open it only to one window; different consoles can't talk to each other and can't share variables.  Each such world is called "the global environment", but keep in mind that there are multiple globes.

Second: each world is subdivided in a system of nested "boxes" or **scopes**.  Global scope is the outermost box, but there can be boxes many levels deep, and more than one box at each level.  In other words, it's a tree, and sometimes we'll draw it that way.  Sometimes "outside" (global) will be at the bottom with nested scopes going upwards, sometimes top-downward.  Next class, we'll talk more about how scopes are made (short version: functions make them), but for now you need to remember four things:

1) Every variable lives in one particular scope.  For full understanding, it's not enough to know the name of a variable; also need to know its scope.

2) The console only sees the outer, global scope.  The little JS robot we talk to in the REPL/console is standing in the outer box (draw it!), and we can only talk to it about things in that scope.  There are variables in other scopes which we can never see directly.   But we can send the robot on missions to inner scopes (by calling functions) and have it send reports back, to get indirect evidence of what's going on below.

3) Although the robot can't see inward, it can always see outward.  If we send it down 3 levels, from there it can see not only the variables living in that level-3 scope, but all the variables in the scopes above it, all the way back to global.
(Diagram...) For example, if _var x_ is global (in A), and _var y_ is down one (in B), and _var z_ is down two (in C), then from C, JS can see x,y,and z.  Putting 'x' in expressions will use x from A, and putting 'x=_' will SET it in A.

4) BUT: scopes reserve the right to redeclare variables locally.  So C can also create _var x_, which lives in C.  And if you do that, 'x' now refers to the local variable, not the global one.  There's no longer any way to talk about global x.  We call this **shadowing**; global x is in the "shadow" of local x and we can't see it anymore from C.

But that's a GOOD thing, one of the best things in programming!  It means C doesn't have to know the names of things above it; it can use whatever variable names it wants to do its work, and still be a reuseable module which works in multiple contexts.  It can call something x without worrying about all the x's which might be above it.

And this illustrates the first Very Bad Thing which can happen if you don't declare variables: you may inadvertently refer to a variable in an outer scope which has nothing to do with what you mean!  That's a _failure_ to shadow.  Shadowing is your friend.

----
Summary of Part 1:
JS programs are composed of expressions nested within expressions, and each such component does its work in two ways:
by merging anonymous values through a tree of expression-funnels to a single output, and by "side-effects": writing and reading values from variables organized in a heirarchy of scopes.  Learn to recognize those two streams of information.

(Break!)

==== Part 2 === (Ben?)
PRIMITIVE TYPES

We know that values are funnelled through expressions and stored in variables, but what exactly is a value?  We know they must include numbers at least, and we've seen an example of a non-numeric value (_true_ and _false_).  Let's map out the possible types of values.

But first: you may have heard that JS is a "typeless" language, or at least "weakly typed".  What does that mean?
It doesnt mean there aren't clear distinctions between types; on the contrary: every value in every expression and variable is exactly one type at all times.  It means that variables are equal opportunity: any variable can hold any value, and change types when it changes value.  In a variable "named-box" you can put first a number, then a word, then a list, then a banana.

Time for a new operator: _typeof_
You can test the type of a literal value (show `typeof 1`...)  or a variable: `var x =1; typeof x;`
_typeof_ is a (unary, prefix) operator which accepts single operand and outputs the name of its type.

NUMBERS
What qualifies as a "number"?  Pretty much what you'd expect.  JS makes no type distinction between integers and real (fractional) numbers, called "floats" in other languages.  So `typeof 1 == typeof -1.0000 == typeof 3.14159"`  In addition to what we think of as numbers, there are a couple of special values which are also of type 'number':

Infinity:
1/0--> Infinity; typeof 1/0->'number'  Infinity is a legitimate number; so is -Infinity.  They have the relationships you'd expect.
Infinity / -2 == -Infinity, 10000000/Infinity== 0, etc.
And if you're concerned about getting Infinity as a result, you're probably also concerned about -Infinity.  Therefore there's a special check for both at the same time: isFinite(N) is a function(!) which returns true for non-infinite numbers and false otherwise.

NaN:
Math.sqrt(1)==1 but Math.sqrt(-1)== NaN.  It stands for "Not a number", but it is an honorary number: `typeof NaN`=='number'.
NaN is a placeholder in the "number" family for illegitimate results.  EX: "banana"/2-> NaN.  A number, not half a banana: operator '/' is defined to always return some number.  But / can't divide 'banana', so NaN is the best result it can manage.
And because NaN is always imprecise/uncertain, NaN equals nothing, not even itself: NaN != NaN.  Since we can't detect NaN using equality, it too has a special detector function: isNaN() which returns true for both NaN and things which aren't of type 'number' at all (mostly)...

BOOLEANS
We've seen the two special values _true_ and _false_.  Their type is "boolean" (named after mathematician Boole), and they're the only possible values of that type... (show `typeof true`)
Boolean values validate "claims" or "assertions".
Certain operators always return type "boolean", especially comparison operators:
  _==_ (equality, as we've seen)
  _===_ (identity: super-duper equal.  Later we'll see examples when identity differs from equality.)
  != (inequality), !== (in-identity)
  <,>,<=,>=
Another operator is ! (not): flips true and false, but always returns type "boolean"

Booleans are just values, like numbers, so we can store them in variables: `var x = false; var y = !x; var same = (x==y);`

UNDEFINED
Revisit this variable declaration: `var x;`
What goes in a variable's box once it's declared but before it's initialized?  A special value: _undefined_.
Thats's the value returned by certain keywords like _var_.
Getting a result of _undefined_ isn't an error; it's a legitimate value and can be stored or compared:
`var p; var q; p==q;`-->true
[Aside: you can't say things like ((var x)==_undefined_) or (x=(var y)) because (var...) is a statement, not an expression, and can't be nested inside an expression.]

What is the type of _undefined_? "undefined".  `var q; q; typeof q;`
Same for symbol never even declared as variable: `typeof blerg`
Typeof makes it safe to explore undefined vars:  blerg ---> Error  but `typeof blerg`-->"undefined"

STRINGS
What will this return: `typeof typeof ___`?  Always "string", regardless of ___.
typeof is an operator defined to return type "string", just as / is defined to return type "number"

A string is any sequence of zero or more chars (so "", the **empty string**, counts).  We know what a character is, but JS doesn't: letter 'a' is just another string.
Console always displays strings with "", and demands that they be wrapped in "" or '' when expressed literally.
Single and double-quote are equivalent, but must match; can use either to wrap strings including the other:
"'quoted'", '"quoted"'
If necessary, use backslash to include one quote mark within itself: "'"=='\''

USE vs. MENTION
What's the difference between _x_ and 'x'?  Like the difference between saying "Stop" and saying "I said 'Stop'".
_x_ is used, but 'x' is mentioned.  _x_ is an **identifier**, while 'x' is a string.
JS attempts to evaluate/reduce _x_ to its value, but 'x' _is_ a value, and JS can't reduce it any further.  

N vs. 'N' and AUTOCONVERSION
What about this: `'1' == 1`?
Notice: `typeof 1`--> "number"; `typeof '1'`-->"string"; `1==='1'`-->false.  They're not the same thing, but JS thinks they're close enough for equality.
Here's what's happening:  the equality operator == needs its operands to be the same type, so to satisfy ==, JS forces them to be the same.  It changes the number to a string, 1-->'1', then compares the strings, and they're the same.
(Diagram: == operand auto-convert)

This auto-conversion happens all the time in JS, and can be both convenient and disastrous.

CONCATENATION (+)

Let's look at one last operator: _+_ for strings.
Look what happens when we say "Hello"+" "+"class".  Three strings in, one out.  Actually, its a combo of binary ops (draw + op funnel), just like 1+2+3.
Are there two seperate operators both named _+_, and strings trigger one, or is it just one operator that behaves differently depending on its operand types?  Either/or, choose your own interpretation.
But understand that saying + in an expression is different from saying -,*,/,%.

It's easy to predict the results when both operands are same type, but what about one of each?
`1+'1'` --> '11'  We can infer that it auto-converted the number to a string and concatenated.
That's really handy in cases like this:
var numStudents=20; var numHelpers=4; "There are "+(numStudents+numHelpers)+" people in the room"
Auto-conversion to strings makes it very easy to format the results of numeric computations, and you'll use it all the time.
But watch out:
`"There are "+numStudents+numHelpers+" people in the room"` -->204
(Draw chain of binary + merges).  When each component is merged in one at a time, as a string, the two numbers never have a chance to be added numerically.

And it gets worse.  There you have an obvious string at hand to remind you of danger.
But what if you're trying to do a numeric addition and one operand is invisibly a string:
`var x='1';
var y = 2;
//intervening stuff...
var sum = x+y;//'12'!`

And it gets still worse:
var y;
y=x+1-1;//10
typeof y;//number
y=x-1+1;//1
typeof y;//number

And it gets even more worse:
var small=9;
var big=10
small< big;//true
x+small < x+big;//false!
Alphabetic comparison ("19"<"110") doesn't agree with numeric comparison!

Lesson: with + and auto-conversion, things can always get worse.

Summary: JS is a "high-level" language, which means it tries to automate certain minutiae to save the programmer work.
Sometimes that helps; sometimes that explodes.
Being "weakly typed" or fluidly-typed does make JS convenient for many things.  But you can never afford to forget about types entirely.
