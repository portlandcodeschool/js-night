> Typographic conventions:
> 
> `inline JS` for things to demo in console
> ```
> multi-line JS
> for things to type/eval in Scratchpad
> ```
> **boldface for drawing on board or vocabulary**


==== Part 1 ====

CONDITIONALS and BRANCHING

So far, we've seen expressions which always evaluate all their parts and funnel them together; that's just a glorified pocket calculator.

The crucial element of programming languages which separates them from descriptive languages (like mathematics) is the ability to _evaluate conditionally_, like this:
`if (true) (1+1);`
`if (false) (1+1);`
Same expression, different results.  Obviously the preceding _if_ clause makes a decision about whether the result is computed.  And if the conditon is false, the consequent isn't even interpreted:
`if (false) blearg; // no error!`

The pattern is always:
**if (COND) ???**

Only if _COND_ is equivalent to _true_ does JS open the _???_ box.  Otherwise it returns _undefined_.  Going on to open the _???_ and evaluate it is called **branching**, and the surrounding statement is called a **conditional** (vs. the **condition** inside the parentheses, and the **consequent** after).

The parentheses around COND are mandatory, part of the statement template.
They're different from the grouping parens used in expressions.

IF...ELSE

A variant is:
**if (COND) ??A?? else ??B??**
In that conditional, JS always opens one ??? or the other, depending on COND, but never both.

If we pretend that _if...else..._ is an operator, we see that the operation has three inputs (_COND,A,B_), and it does yet another kind of merging, like a super-comma: it really-truly ignores one part and evaluates and returns the other, depending on the third operand. **[Draw _if_  funnel]**
Now in fact _if_ isn't an operator, and an _if_ statement isn't an expression; it can't be nested inside other expressions:
`(if (true) 1)==1 // error`
Can't even put it in parentheses:
`(if (true) 1) // error`
which is something you can do with any expression.
Like _var x_, _if..._ is a **statement** which can contain expressions but not be contained in them. **[Draw Venn: expression < statement]**

BUT: there is an actual operator which does exactly the same job as an expression:
**_?_:_**
It's called the **(ternary) conditional operator**:
**COND ? A : B**
It merges its inputs just like _if...else..._  **[Diagram ?: funnel]**,
returning only one of A,B (and not even interpreting the other).

And you can nest it:
`var x = ((false? 0: 1) == (true? 1: 2)) //true`

TRUTHINESS

If the condition input is literally _true_ or _false_, the outcome is predetermined, so such a conditional is useless.  The value of conditionals is when we substitute a variable (or expression containing a variable) in the condition:

`var rainy=true; if (rainy) "true enough"`

`var x=1, y=2; if (x<y) "true enough"`

Easy to see how this works: the boolean value output by the nested expression is either _true_ or _false_.
But what about this:

`x=1; if (x) "true enough"`

`x=0; if (x) "true enough"// undefined`

Apparently 1 is true enough, but 0 isn't.
Another way of putting it: 1 is **true-ish** or **truthy**, 0 is **false-ish** or **falsey**.
Not identical to _true_ and _false_:
`1 === true //false`
`0 === false //false`
But equivalent:
`1 == true //true`

All of this is explained by our old friend invisible-auto-conversion.  **[ASK: when does auto-convert happen?  When operator expects specific types]**
Like operators -,*,/ which demand actual numbers and auto-convert inputs as needed, the context of a condition
(i.e. operator `if (__)...`) demands an actual boolean value.
And if it doesn't get one, it converts the value it has.
The conversion rule is simple:

* A few (6) specific values convert to false: ** false, 0, NaN, undefined, "", null** (we'll see later);
* Everything **else --> true**

So we can infer that strings "false" and "undefined" are true-ish:
`if ("false") "yup"`
`if ("undefined") "yup"`

But things with value _false_ and _undefined_ are false-ish:
`var unk; if (unk) bleargh`

<!-- Aside: equality operator == does some auto-conversion (e.g. `1=='1'; 1==true`) but be careful:
`true == "true" //false`
[Leave as exercise! Answer: Not doing either string compare or boolean compare, but converting both to numbers]
-->

BOOLEAN OPERATORS

Let's see two more operators: **&&** and **||**.

We call them boolean operators, because they represent the logic of merging _true_ and _false_.
When they have boolean inputs, their output is what you'd expect: **[ASK:]**
`(true || false) //true`
`(true && false) //false`
`(true && true) //true`

But as you can guess by now, they work similarly with non-boolean truthy values as well:
`(1 || 0) // 1`
`(1 && 0) // 0`
`("a" && "b") // "b"`
These examples reveal something interesting:
while the truthiness of the output always matches the outcome of boolean logic
the actual value is not necessarily _boolean_.  Instead, it's always one of the inputs.
But which input?  Why 'b' instead of 'a'?

To understand that, first we have to recognize that JS is lazy: it never evaluates more than it needs to.  Here's a more vivid example:

**if (doJShomework() || runMarathon()) deserveCookie()**

JS always has to evaluate the first expression, so we do our JS homework and return something true-ish.  Now what?  Must we also run marathon to get a cookie?  No; the conditions have been satisfied already!  So JS exits the || operation early and goes straight to the cookie.

The || operator is really just a special form of the conditional operator:
**(A || B) means (A? A: B)**
If A is truish, return it, so the whole expression will be truish, and never look at B.  Skip the marathon!  (That's called **short-circuit** evaluation, and && and || are sometimes called short-circuit operators.)
And of course, if A is falseish, it's all up to B, and we have to do the work of evaluating B.  But on average, we've saved some effort.

Similarly, consider this condition:
**if (doJShomework() && runMarathon()) deserveCookie()**
Now it seems we have to do both, right?
But imagine the unimagineable: you don't do your JS homework!
So no cookie for you, and running a marathon can't change that.  Don't bother.

**(A && B) means (A? B: A)**
If A is truish, still depends on B.  But if A fails, skip B and just return A's failure!  We still save effort on average.

To recap: it's tempting to think of these operators as merging boolean values, much like * or + merge numeric values.  But really they're just wrappers around the lazy conditional operator, and the boolean logic follows from that as a special case.

You'll see them and use them all the time as statements standing alone.
That wouldn't make sense when interpreting them as funneling boolean values together to nowhere.
But it makes sense when interpretating them as _controlling the branching of expressions with side-effects_.

Here's a mnemonic I use:
> **(treat || trick)**  _//treat, or else!_ e.g. **(openFile || returnError)**
>
> **(work && reward)** e.g. **(openFile && readFile)**

(10m break)

==== Part 2 ====

SCRATCHPAD

The console is great for doing simple science: testing expressions and probing variables to figure out how things work.
But it only affords single-line dialog: we can use semicolons and Shift-Return to send multiple statements at once, but it's ugly and inconvenient.  If we make a typo in long expression, have to redo the whole thing.

When we're testing more complex pieces of code, a better tool is the (Firefox) Scratchpad...
It's an editor within the application which has access to the JS interpreter.
You can open and edit and save files, but also evaluate any portion of them and see the result.
First we'll use it to look at...

BLOCKS

A condtional's **consequent** may be only a single statement, but often you want to do more than one thing.  It's sometimes possible do this in a single expression with commas, like so:
```
var rainy=true, accessory, footwear;
if (rainy) (accessory="umbrella", footwear="galoshes");
```

But sometimes you can't (e.g. if need statement like _var..._), and almost always it's better practice to do this:
```
if (rainy) {
	accessory="umbrella";
	footwear="galoshes";
}
```

The {}'s are critical; they tie the two statements into a **block**,
and the whole block evaluated or skipped together.
If you leave the brackets out like this:
```
if (rainy)
	accessory="umbrella";
	footwear="galoshes";
```
you'll be wearing your galoshes everywhere, because you're really doing this:
```
if (rainy)
	accessory="umbrella";
//regardless:
footwear="galoshes";
```

Indentation doesn't matter to JS; brackets do.
So get in the habit of using blocks, even if they only need to enclose one statement.

Similarly with _if...else..._: if there is more than one statement in either consequent, need an expression or a block to tie them together.  Taste varies, but typical syntax is:
```
if (rainy) {
	accesory="umbrella"; 
	footwear="galoshes";
} else { //one line here
	accessory= "sunscreen";
	footwear = "sandals";
}
```

---
Example of consequent block:

Sometimes we all need a hug, and the way the twitterati do it in lolspeak is:
**(((((Name)))))**

```
var who="Elmo";
var needHugs = 2;
if (needHugs) {//need two steps...
	needHugs--;
	who = '('+who+')';
}
```

What we're doing next will be easier when we can freely edit multi-line statements...

----
LOOPS

Remember that _if..._ is a statement which controls flow, or branching.
It lets us conditionally do something once.
(And if we cheat and re-evaluate by hand, it repeats!)
A similar construct lets us conditionally repeat things: the **while** loop.

Pattern is
**while (COND) BLOCK;**
That will repeat BLOCK as long as COND is true.
(Notice: if COND is true, it will be true FOREVER unless BLOCK includes a side effect which changes COND.  Infinite Loop!  Please avoid.)

So usually the full form is:
**INIT;
while (COND) {
	ACTION;
	CHANGE;
}**

Again, with flourish:
```
var who="Elmo";
var needHugs=5;
while (needHugs--) {//double-duty: change w. cond!
	who='('+who+')';
}
```

[Aside: the keyword _while_, like _var_ and _if_, creates an un-nestable statement.] 

FOR LOOP

A similar pattern uses the same components, but arranged in a specialized idiom with a different keyword: **for**

Pattern is:
**for (INIT; COND; CHANGE) ACTION;**

As with _if_ and _while_, parentheses are mandatory part of template.

You must remember when each clause is evaluated:
> **INIT: Once before loop begins**
> **COND: Before each pass**
> **ACTION: During each pass**
> **CHANGE: After each pass**

A _for_ loop almost always has an **iterator**: a variable which marks the state of progress.
The INIT, COND, and CHANGE usually set and compare that iterator:

```
var who='Elmo';
for (var needHugs = 5; needHugs; needHugs--) {
	who = '('+who+')';
}
```

Or count upward!
[But counting upward makes "needHugs" a bad choice of name, so use "hugsGiven"]
```
for (var hugsGiven = 0; hugsGiven<5; hugsGiven++) {
	who = '('+who+')';
}
```


Or combine COND and CHANGE:
```
for (var hugsGiven = 0; hugsGiven++<5; ) {
	who = '('+who+')';
}
```

Or even incorporate the ACTION [and simplify hugsGiven to i]:
```
for (var i = 0; i++<5; who='('+who+')') {}
```

[But don't really do that; it's much harder to read.]


----

SENDING REPORTS

When using the console, action pauses between each exchange, giving us a change to inspect values and see what's going on.  With loops, and lots of other constructions, we don't get a change to intervene once it starts; have to wait for it to finish.
Sometimes we need a way to spy on it, check progress from within.
Eventually we'll learn **Debugger**, a serious tool for intervening at any stage of a program.
But for now, easiest way to track JS robot on its missions is either...
*alert(msg)*
or better:
*console.log(message)*

Add to loop:
```
for (var i = 0; i<5; i++) {
	console.log("pass #" + i);
	who = '('+who+')';
}
```

Console.log is your new best friend; use it everywhere as you code to track what's happening.

(10m break)

==== Part 3 ====

FUNCTIONS

A **function** is a miniature program, a resuable module with a distinct purpose.
We've already seen some examples:
alert(...)
console.log(...)
isNaN(...)
Number(...)
String(...)

These are all built-in to JS, like operators.  They're similar to operators in several ways:
*  they have inputs
*  they have one output
*  they can be nested
*  can do their work by a combination of funnelling/reducing and side-effects

But with functions, unlike operators, we can add our own!  Let's turn out hugger code into a function:
```
function hug() {
	var who='Elmo';
	for (var needHugs = 5; needHugs; needHugs--) {
		who = '('+who+')';
	}
}
```
That's a start: it defines a function using the **function** keyword, and it gives it a name "hug", and it describes the function's behavior in the {} block.
At this point, we could call the function like this:
`hug()`
But it seems not to do anything!

LOCAL SCOPE

Here's the first problem:
every function creates a new scope, and any variables declared within it are local to that scope, and they shadow any outer variables of that name.
So here variable _who_ is local, distinct from the global _who_, and only the local one is changed in the function.
**[Diagram: local scope nested in global, _who_ shadowing]
[Also: _var needHugs_ is local too!]

Take out the local declaration of _who_:
```
function hug() {
	for (var needHugs = 5; needHugs; needHugs--) {
		who = '('+who+')';
	}
}
hug();
hug();
```
It works, and it's reuseable!
But it works dangerously: it depends on there being a global variable named _who_ which holds the correct value at the time and can safely be changed!
The function works entirely through a **side-effect** of changing a global variable.
That's very fragile, and it also means you can only hug one thing.
The power of functions is that they are reusable not just by doing things more than once,
but doing them in different circumstance, and doing variations on a theme.

PARAMETERS/INPUT

The solution is to **parameterize** the huggee:
```
function hug(who) {
	for (var needHugs = 5; needHugs; needHugs--) {
		who = '('+who+')';
	console.log(who);// add this so we can see what's happening	
	}
}
hug("Elmo");
hug("Barney");
```

It sort-of worked: we can see that the function is wrapping hugs around different values, depending on what we put in the **argument** when we call it.  An argument is an input to the function, analogous to an **operand** for an operator.
And _who_ here is called a **parameter**: it's a local variable which is implicitly declared and initialized to match the corresponding argument.
But the function still doesn't work properly because it's only changing that parameter, a local variable.

RETURN/OUTPUT

So we add one more thing:
```
function hug(who) {
	for (var needHugs = 5; needHugs; needHugs--) {
		who = '('+who+')';
	console.log(who);// add this so we can see what's happening	
	}
	return who;
}
hug("Elmo");
hug("Barney");
```

The **return** keyword tells the function what to use as an output for its funnel.
Remember operators: JS reduces any operations to their output, an "equivalent" irreducible value.  Same idea here: evaluating functions reduces their call expression to the return value, considered an "equivalent" to that particular expression calling the function.

[Aside: two important facts about _return_:
1. it doesn't have to appear at end; can be anywhere in function body, or more than once on different branches.  But it always exits function immediately at that point!
2. if you say just `return;` with no value, or have no return statement at all, the function returns _undefined_ as its output.  In that case, you're depending on side-effects to do work.]

Now our function works with no side-effects at all; it does all of its work by funneling its argument, through some complicated process, into an equivalent value.

`hug("Elmo")` is an expression, and it can be nested anywhere in other expressions:
`(typeof hug("Elmo"))// string`
You can also feed its output back as the argument to a second call:
`hug(hug("Elmo"))`

And like other expressions, the output is just thrown away unless you save it in a variable, so we can preserve the result like so:
`var happyElmo = hug("Elmo");`
`var happyBarney=hug("Barney");`

The function is now reusable, reliable (works under any circumstances), and safe (has no side-effects).

But we can make it even more useful by generalizing it: turn some of its hard-wired behavior into additional parameters:
```
function hug(who, needHugs) {
	for ( ; needHugs; needHugs--) {
		who = '('+who+')';
	}
	return who;
}
hug("Elmo", 5);
hug("Barney", 10);
```

Optional: parameterize '(' and ')' too, to make generalized wrap():
```
function wrap(string,num,left,right) {
  while (num--) {
	string = left+string+right;
  }
  return string;
}
function hug(who, howmany) {
  return wrap(who, howmany, '(', ')');
}
```
**[Diagram: nested funnel, forwarding inputs]**

Now _hug_ is a **wrapper function** for particular kind of wrapping (same word is coincidence of example!).
Can call wrapper without knowing that it delegates most of the work to a helper function:
`hug("Barney",7)`
Or call its helper directly for unusual cases:
`wrap("SpongeBob",4,'[',']'); // SpongeBob needs square hugs`

---

3 INVOCATIONS [Delay until Functions 2...]

There are three distinct ways of referring to a function in code:
1. Definition
2. Call ("Use")
3. "Mention" (e.g. aliasing)


---
DEFENSIVE PROGRAMMING, SAFEGAURDS and ASSERTIONS

What could go wrong with hug()?  Is there a way to make it malfunction?
Suppose we're writing it a resource for others, and we'll turn it loose on the internet for people to call whenever they need a hug.

We can anticipate that some people would try to call it with parameters which don't make sense!  For example: 
what if parameter needHugs is a non-numeric string? [Ans: wraps once]
Or worse: what if needHugs is a negative number?  Or a fractional number? [Ans: Infinite loop!]
The function is still dangerous!

Anytime we write a function we intend for non-trivial use, we should try to anticipate possible mis-calls to it and the relative badness of the outcome, and mitigate those failure.  The is **defensive programming**.  Its more work, but it's an investment well-spent.
And usually the person who miscalls your function is you!  So you're saving your future self time debugging errors which could be prevented with a little discipline.


Let's add **safeguards** to mitigate badness.  Here, basic protection is easy:
```
function wrap(string,num,left,right) {
  while ((num--)>0) {...
```
That will prevent looping on anything except positive numbers, or values which can be converted to them (e.g. '10').
But do you really want the function to accept '10' as a valid input?  What about _true_?
It might seem convenient to be able to have such a versatile input, and sometimes that is a reasonable solution.
But be very careful of choices which let you be lazy!  Sooner or later you'll be lazy in a way you regret.
Probably if your _wrap()_ function is getting _true_ instead of a number, something else has gone wrong and you want to know about it as soon as possible.  Always look for ways to save yourself from yourself.

ASSERTION

So a good practice is: always know what parameter values are normal, and give yourself a warning if they're not.
To that end, we're now going to write another function that you will use (in some form) for the rest of your lives: **assert**.
```
function assert(claim,warning) {
  if (!claim)
   console.error("Warning: "+warning);
  return claim;
} 
```

Use it like this:
```
function wrap(string,num,left,right) {
  assert(Number.isInteger(num) && num>=0),"Parameter num should be non-negative integer");
   ...
}
```

If the condition you require is needed a lot, make it another function:
```
function isNaturalNum(num) {
 return (Number.isInteger(num) && num>=0);
}

function wrap(...) {
  assert(isNatural(num),"...must be natural...");
...
}
```

If you decide that a warning isn't enough and the unmet condition is unacceptable, then abort:
```
function wrap(...) {
  if (!assert(...)) return;
...
```


=====
ARRAYs

So far, all the value types we've seen are atomic; they have no constituent parts.
From now on, we'll include more complex types which are _compound values_ or _objects_, which have distinct components within them.
For now, we'll just preview one such type which is ubiquitous in programming:
the **array**.

An array is just a sequence of values, and for now we'll assume that each of those is a primitive.  The values or **elements** within an array are each identified by an numeric index, and integer which tells the elements position in the sequence.
And in every array, in every programming language including JS, the index of the first element isn't 1 but 0.
Therefore the index of the second element is 1, and so on.
Every array has a length, an integer equal to the number of elements.
The index of the last element is therefore _one less than the length_.

For now, we make an array like this:
var array=[1,2,3];
"array" is the name of the variable, like any other variable.
And for the moment, we can imagine that the entire array, with all its constituent elements, fits inside the variable's little box.

Each element of an array can be independently read and written like a variable, like so:
array[INDEX]
array[0] --> read first element
array[0] = "banana" --> set first element

Later we'll learn how to reset the entire array; for now, avoid saying things like array = 7, which will destroy all its stored values.

====
PRACTICE

Example:
Let's put all our pieces together to write a function which does the following:

given one parameter N from 0-6, generate a string with a list of all the weekday names starting with day N...
weekdayNames(0)  -> "Sunday Monday Tues... Saturday"

First let's store the names in an array:
var names = ['Sun','Mon','Tues'...];

Then put that array inside our function as a local variable:
function listWeekdays(start) {
  var names...
}


Then write a loop to cycle through the index from start back to the one before.
First: devise a plan for dealing with wrapping around!

Solicit Ideas:
* calculate a start and end, then make index track exacly that sequence
* calculate a start but pretend the array repeats
* just count seven things, then figure out which indexes they are
* do two loops: one from start to array length, then another from 0 to start

`function listWeekdaysFrom(start) {
	var i, names=[...];
	var result = "";
	for (i = start; i<7; i++)
	  result += weekday[i];
	for (i=0; i<start; i++)
	  result += weekday[i];
	return result;
}`

Add assertion to check input!

Add another test!
