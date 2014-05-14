Homework #1

---

**1)**
Before testing these expressions in the console, predict what their output will be.  If the output is undetermined, identify the conditions when it will output true.  Assume the cases are independent, and x is reset to an unknown value before each.


**a)** `"1" == 1`

**b)** `"1" === 1`

**c)** `true == "true"`

**d)** `false== ""`

**e)** `x++ == ++x`

**f)** `++x == x++`

**g)** `"1"+x == 1+x`

**h)** `"0"+1 == 1`

**i)** `(typeof (x+1))==(typeof x)`

**j)** `(x-=x)? x: (typeof x)`

**k)** `(x*1 == x) || ((typeof x) != "number")`

**l)** `(x=(typeof (x+(typeof x))))==x`

**m)** `x=-1,0,-x---1+'0'+x`

---

**2)**
Write a program which generates a string containing the entire lyrics for the song "The Twelve Days of Christmas".  Make sure that your result is grammatically and typographically correct (include line breaks, commas, etc. where needed), but keep redundancy within your program to a minimum.
You may want to use functions, loops, and/or arrays to store repeated elements.
(Hint: within any string, '\n' creates a line break.)

---

**3)**
Suppose the '&' key on your keyboard is missing, and you want to be able to continue programming without it.

**a)**
Write a function `and3(a,b,c)` which tries to simulate a double-&& operator: it should always return the same result as `(a && b && c)` for any values of a,b,c.  (But you can't use && itself!)

**b)**
Now generalize your function to handle any number of values.  You will learn better ways eventually, but for now use an array to store all the values.
Your new function `andN(n,values)` should accept two parameters: `n` is the length of the array `values`.  Assume the array holds at least `n` values.
If your array argument holds values [a,b,c...z], as in
`andN(26,[a,b,c...z])`, the function should return the same result as `(a && b && c && ... z)`.
Make sure to handle two special cases: length 0 (then return undefined) and length 1 (then return that single value).
As before, you're not allowed to use &&.

**c)**
You've just realized that your effort was doomed: neither of your functions can replace the && operator in certain circumstances.  Explain why, and find an example which demonstrates failure.

---

**4)**
Write a function to decide whether a given integer (a parameter) is prime. You may need one of these functions/operators:

* function `Math.floor(N)` truncates any fractional part of a number N (i.e. returns greatest integer <=N)
* modulo operator %: `x%y` returns 0 if x divides evenly by y 

---

**5)**
Write a function which converts any positive integer into a string of the corresponding Roman Numeral.  For example, `toRoman(2014)` should return 'MMXIV'.  You may want to write a couple of helper functions for subtasks which are repeated with slight variation.

Write a few assertions to test your output.
For example:
```
assert(toRoman(2014)==='MMXIV',"Test 2014 failed");
```

---

**6)**
Imagine that a deck of playing cards is sorted by rank and suit: first all the Aces, then the Twos, etc, with the Kings last. Within each rank, the suits are in the order Hearts, Diamonds, Spades, Clubs. Number each card in order from 0 to 51 (i.e. 0=Ace of Hearts; 51=King of Clubs), and let that ID number represent the corresponding card.

Following that encoding scheme, write a set of functions to compute different features/relations of the cards:

* `rank(card)` returns 1-13, representing the card's rank.

* `suit(card)` returns 1-4, representing the card's suit.

* `cardID(rank,suit)` returns 0-51, identifying the card of a given rank and suit.

* `color(card)` returns "red" or "black".

* `name(card)` returns the full name of the card (e.g. "Four of Diamonds").

* `precedes(cardA,cardB)` returns true only if cardA is one less in rank than cardB (regardless of suit). Assume rank wrap-around (King precedes Ace precedes Two).

* `sameColor(cardA,cardB)` returns true only if cardA and cardB have the same color.

* `nextInSuit(cardA)` returns cardB, the ID number of the card following cardA in the same suit. Assume wrap-around.

* `prevInSuit(cardB)` returns cardA, the ID number of the card preceding cardB in the same suit. 

Your functions may call each other. Try to reuse their functionality to avoid duplicating code.

**a)**
Initially, assume each function is given valid arguments (i.e. the args are integers in the appropriate range).  Write your code into the [template file](template1a-cards.js).  The template also includes a suite of assertions for testing your code.  Make sure you pass all the tests, and write more tests if you have any doubt!

**b)**
Now abandon the assumption of valid arguments.  Devise a system for dealing with arguments which are invalid in various ways, and rewrite your functions to detect such errors whenever possible.  When you detect an invalid argument, return a value which is easily distinguished from all valid function results.
You may use the provided [template file](template1b-cardsVerify.js), which has extra tests checking the results of invalid arguments.

---

