Practice parsing complex expressions which contain no parentheses
(Need: reference for operator precedence)

----


1) Before testing these expressions in the console, predict what their output will be.  If the output is undetermined, identify the conditions when it will output true.  Assume the cases are independent, and x is reset to an unknown value before each.


* `"1" == 1`  	<!--true-->
* `true == "true"`	<!--false-->
* `false== ""` 	<!--true-->
* `x++ == ++x` 	<!--false-->
* `++x == x++` 	<!--true UNLESS x is non-numeric string-->
* `"1"+x == 1+x`	<!--true when x is any string-->
* `"0"+1 == 1`	<!--true-->
* `(typeof x+1)==(typeof x)`	<!--true if x is number or string-->
* `x-=x? x: (typeof x)`		<!--"number"-->
* `(x*1 == x) || ((typeof x) != "number")`	<!--false when x is NaN-->
* `(x=(typeof (x+(typeof x))))==x`		<!--true-->
* `x=-1,0,-x---1+'0'+x`  <!--"00-2"-->

2) Write a program which generates a string containing the entire lyrics for the song "The Twelve Days of Christmas".  Make sure that your result is grammatically and typographically correct (include line breaks, commas, etc. where needed), but keep redundancy within your program to a minimum.
You may want to use functions, loops, and/or arrays to store repeated elements.
(Hint: within any string, '\n' creates a line break.)



3) Suppose the '&' key on your keyboard is missing, and you want to be able to continue programming without it.

a)  Write a function called "and3" with 3 parameters (a,b,c) which tries to simulate a double-&& operator: it should always return the same result as (a && b && c) for any values of a,b,c.  (But you can't use && itself!)

<!--
`function and3(a,b,c) {
  return a? (b? c: b): a;
}`
-->

b) Now generalize your function to handle any number of values.  You will learn better ways eventually, but for now use an array to store all the values.
Your new function "andN" should accept two parameters: first the length of the values array, then the array itself (as one argument).  Assume the array holds at least as many values as the length specifies.
If your array holds values [a,b,c...z], then your function should return the same result as (a && b && c ... z).
Make sure to handle two special cases: length 0 (then return undefined) and length 1 (then return that single value).
As before, you're not allowed to use &&.

<!--
function andN(n,values) {
  for (var i=0; i<n; i++) {
    if (!values[i])
	return values[i];
  }
  if (n>0)
    return values[n-1];
}
-->


c) You've just realized that your effort was doomed: neither of your functions can replace the && in certain circumstances.  Explain why, and find an example which demonstrates failure.

<!--
The && operator only evaluates its operands as needed, but a function call evaluates all its arguments.  A function call like and3(x=0,x=1,x=2) will leave x different than (x=0 && x=1 && x=2).
-->

4) Write a function to decide whether a given integer (a parameter) is prime. You may need some of these functions/operators:

* function Math.floor(N): truncates any fractional part of a number N (i.e. returns greatest integer <=N)
* function Number.isInteger(N): returns true if is N is an integer
* modulo operator %: x%y returns 0 if x divides evenly by y 

5)  Imagine that a deck of playing cards is sorted by rank and suit: first all the Aces, then the Twos, etc, with the Kings last. Within each rank, the suits are in the order Heart, Diamond, Spade, Club. Number each card in order from 1 to 52 (i.e. 1=Ace of Hearts; 52=King of Clubs), and let that ID number represent the corresponding card.

Following that encoding scheme, write a set of functions to compute different features/relations of the cards:

    _rank(card)_ returns 1-13, representing the card's rank.
    _suit(card)_ returns 1-4, representing the card's suit.
    _cardID(rank,suit)_ returns 1-52, identifying the card of a given rank and suit.
    _color(card)_ returns "red" or "black".
    _name(card)_ returns the full name of the card (e.g. "Four of Diamonds").
    _precedes(cardA,cardB)_ returns true only if cardA is one less in rank than cardB (regardless of suit). Assume rank wrap-around (King precedes Ace precedes Two).
    _sameColor(cardA,cardB)_ returns true only if cardA and cardB have the same color.
    _nextInSuit(cardA)_ returns cardB, the ID number of the card following cardA in the same suit. Assume wrap-around.
    _prevInSuit(cardB)_ returns cardA, the ID number of the card preceding cardB in the same suit. 

Your functions may call each other. Try to reuse their functionality to avoid duplicating code.

a) Initially, assume each function is given valid arguments (i.e. the args are integers in the appropriate range).

b) Now abandon the assumption of valid arguments.  Devise a system for dealing with arguments which are invalid in various ways, and rewrite your functions to tolerate such errors whenever possible.  If you can correct the errors, do so and return as expected; if not, return a falseish value instead.
