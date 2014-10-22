Homework #2

---

**1)** _(Easyish)_
Revisit your solution to homework #1, problem 4, which expresses an improper fraction as a proper one.  Encapsulate your solution into a function called "printFraction".  The function should receive 2 parameters (n and d) and return a string.

**a)** First, solve the problem making the same assumptions as before (i.e. n and d are positive integers, with n>d).  For example, `printFraction(7,4)` should return "1 3/4".

**b)** You may have noticed that your output can be simplified in some cases.  For example:

- "0 1/2" could be just "1/2"
- "1 0/3" could be just "1"
- "2 2/4" could be reduced to "2 1/2"

Write another version of your function which simplifies the output string whenever possible.
(_Hint: you'll need some conditionals._)

**c)** Now relax the constraints on parameters n and d.  In addition to working in the ways described above, your function should handle these cases:

- n is less than or equal to d (i.e. the fraction isn't improper).
- either n or d (or both) could be negative.  If quotient _n/d_ is negative, move the negative sign to the front of the string.
- either n or d (or both) isn't an integer.  In this case, let your function return undefined.

(_Hint: on this or any other problem, to check whether a number n is an integer, use `n%1 === 0`._)

---

**2)** _(Easyish)_
Rewrite each block below as a simpler equivalent.  Your equivalent should produce the same final conditions as the original given the same initial conditions.

**a)**

```
var x;
if (a) {
   if (b) {
     x = 0;
   } else {
     x = 1;
   }
} else {
  if (b) {
    x = 1;
  } else {
    x = 2;
  }
}
```

Solutions:
```
if (a && b) {
   x = 0;
} else if (a || b) {
  x = 1;
} else {
  x = 2;
}
```
OR
```
x = (a && b)? 0: ((a||b)? 1: 2);
```
OR
```
x = 0;
if (!a) x++;
if (!b) x++;
```
OR
```
x = (a? 0: 1) + (b? 0: 1);
```
OR
```
x = (!a*1) + (!b*1);
```

---

**b)**
```
var y, xIsFalse = (x? false : true);
if (xIsFalse)
   y = false;
else
   y = x;
```
Solutions:
```
var y = (x? x: false);
```
OR
```
var y = x || false;
```

---

**c)**
```
for (var count = 15 - i ; count < 15 ; count=count+1) {
    i = i-1;
    console.log(i+1)
}
```

Solutions:
```
for ( ; i>0; i--) {
    console.log(i);
}
```
OR
```
while (i>0) {
      console.log(i);
      i--;
}
```
OR
```
while (i>0) {
      console.log(i--);
}
```

---

**d)**
```
var i;
if ((n - Math.floor(n)) >= .5) {
   i = Math.ceil(n);
} else {
  i = Math.floor(n);
}
```
Solution:
```
var i = Math.round(n);
```

---

**3)** _(Moderate)_
Write a program which generates a string containing the entire lyrics for the song "The Twelve Days of Christmas".  Make sure that your result is grammatically and typographically correct (include line breaks, commas, etc. where needed), but keep redundancy within your program to a minimum.
You may want to use functions, loops, and/or arrays to store repeated elements.
(Tip: within any string, '\n' creates a line break.)

If you prefer a non-Christmas option, you may choose a different song with similarly repeating structure, such as "There was an Old Woman Who Swallowed a Fly".

---

**4)** _(Difficult)_
Suppose the '&' key on your keyboard is missing, and you want to be able to continue programming without it.

**a)**
Write a function `and2(a,b)` which tries to simulate the && operator: it should always return the same result as `(a && b)` for any values of _a_ and _b_.  (For example, `and2((0>1),true)` should return _false_.)  But you can't use && itself within your function!

**b)** Write another function `and3(a,b,c)` which tries to simulate a double-&& operator: it should always return the same result as `(a && b && c)` for any values of a,b,c.  (For example, `and3((1>0),(0>1),true)` should return _false_.)  As before, you're not allowed to use &&.

**c)**
Now generalize your function to handle any number of values.  You will learn better ways eventually, but for now use an array to store all the values.
Your new function `andN(n,values)` should accept two parameters: `n` is the length of the array `values`.  Assume the array holds at least `n` values.
If your array argument holds values [a,b,c...z], as in
`andN(26,[a,b,c...z])`, the function should return the same result as `(a && b && c && ... z)`.
Make sure to handle two special cases: length 0 (then return _true_) and length 1 (then return that single value).
Again, don't use &&.

**d)**
You've just realized that your effort was doomed: neither of your functions can replace the && operator in certain circumstances.  Explain why, and find an example which demonstrates failure.

---


**5)** _(Moderate but time-consuming)_

Imagine that a deck of playing cards is sorted by rank and suit: first all the Aces, then the Twos, etc, with the Kings last. Within each rank, the suits are in the order Hearts, Diamonds, Spades, Clubs. Number each card in order from 0 to 51 (i.e. 0=Ace of Hearts; 51=King of Clubs), and let that ID number represent the corresponding card.

Following that encoding scheme, write five related functions to compute different aspects of a card:

* `rank(id)` returns 1-13, representing the card's rank (for an _id_ between 0-51).

* `suit(id)` returns 1-4, representing the card's suit.

* `color(id)` returns "red" or "black".

* `name(id)` returns the full name of the card (e.g. "Four of Diamonds").

* `cardID(rank,suit)` returns 0-51, identifying the card id of a given rank and suit.

Your functions may call each other-- for example: _color_ depends on _suit_. Try to reuse functions to avoid duplicating code.

**a)**
Initially, assume each function is given valid arguments (i.e. the args are integers in the appropriate range).  Write your code into the [template file](cards-template1a.js).  The template also includes a suite of assertions for testing your code.  Make sure you pass all the tests, and write more tests if you have any doubt!

**b)**
Now abandon the assumption of valid arguments and program defensively!  Rewrite each function so that it returns the correct answer when all arguments are valid, but returns NaN if any argument is not an integer in the appropriate range.
You may use the provided [template file](cards-template1b.js), which has extra tests checking the results of invalid arguments.

_(Please note: Problem 5 is the most important one in this homework, because variations of it will recur in several later homeworks.  The cleaner your code is now, the easier it will be to modify later.)_


