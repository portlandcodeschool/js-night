**1) Still more Playing Cards!**

**a)** _[moderate]_
Revisit your playing card functions from homework #2 and repackage them in a Factory pattern.  You will have a single master function
`makeCard(id)` (the Factory) which, with each call, makes and returns an object representing a single card.  Each card object remembers its own _id_ and has methods to calculate its other attributes and relations.
Try to avoid redundant copies of the various methods.  To share methods between card instances, make them methods of the factory itself and link instance properties to them.

Certain helper functions (e.g. for validating arguments) may belong only to _makeCard_ and not any instances.

Because each card knows its own id, your functions need fewer arguments.  Change their signatures as follows:
rank() --> 1..4
suit() --> 1..4
cardID() --> 0..51
color()--> string
name() --> string
precedes(cardObj) --> bool
sameColor(cardObj)--> bool
nextInsuit() --> 0..51
prevInSuit() --> 0..51

**b)** _[easy]_ For each function, write 2 assertions to test it.  You may adapt the assertions from earlier templates.

**c)** _[easy]_ Write a few more assertions proving that your methods are shared between instances.


**2) Stacking the Deque**

"Deque" (pronounced "deck") is an acronym for "double-ended queue", a sequential data structure similar to an Array but with different rules of access.  While an Array is random-access (i.e. any element is accessible), a Deque can only be accessed at either of its ends (like a roll of mints with both ends open).  Let the two ends be called "top" and "bottom".

**a)** _[moderate]_
Implement a deque with the following methods:

* `top()`: return the element on top

* `bottom()`: return the element on bottom

* `push(val)`: add an element to the top

* `pop()`:  remove and return the top element

* `shift()`: remove and return the bottom element

* `unshift(val)`: add an element to the bottom

* `cut(offset)`: split the deque near the middle, then swap the two halves.  The new top element will have been previously just below the split.  Use parameter _offset_ to decide the split point as follows:
	*  if _offset_ is falseish: split at midpoint if the number of elements is even, otherwise just above the middle element;
	*  if _offset_ is non-zero integer: adjust split by _offset_ elements toward top if positive, toward bottom if negative.
Make sure to handle reasonably all possible combinations of offset and deque length.

<!-- riffle:  split as with a cut, using _offset_ the same way, then interleave the two halves by these rules...  -->

* `sort(compareFn)`: reorder all elements of deque according to the comparison defined by the function _compareFn_.
`compareFn(a,b)` should return a negative number whenever _a_  belongs somewhere below _b_ in the sorted result, and a positive number whenever _a_ belongs above _b_.  (Zero means they're equivalent: either may come first.)

* `list(delim, toStringFn)`: list the contents of the deque as a single string, using function _toStringFn_ to convert each element to a string and _delim_ to seperate them.

You'll use a deque to simulate a deck of cards, but your deque implementation should be completely general, able to handle any number of any type of element.

Although it would be possible to implement a deque as an array, for this exercise make it an object which *contains* an array.

Each deque should be created with a factory function `makeDeque(values)` where _values_ is an array with the deque's content.
Be sure to **copy** the _values_ array into the deque instead of using the original; you don't want anyone messing with the deque's content through another reference.


**b)** _[Easy]_
Use function _makeDeque_ to create _deck_, a deque of cards, each of which is an card object from exercise #1 above.
Write a comparison function to sort _deck_ by card ID, with card 51 (King of Clubs) on top.
Make sure the sorted deck passes the tests below:
```
var deck = makeDeque(/*something*/);
deck.sort(/*something*/);
deck.cut(1);
assert(deck.top().name() === 'Ace of Spades', 'Failed Ace of Spades test');
```

Now sort the deck by card name, alphabetically from bottom to top.   (Hint: You'll need to write a new comparison function.)
```
deck.sort(/* something new*/);
assert(deck.bottom().name() === 'Ace of Clubs', 'Failed Ace of Clubs test');
assert(deck.top().name() === 'Two of Spades', 'Failed Two of Spades test');

```

**c)** _[Easy]_
Without changing your deque implementation, create another deque which holds the names of all 19 students in this class, plus 5 TAs (yes, we're very mean, making you remember all your teammates!)

<!--OK, fine:
Abe,Adam,Chad,Charity,Christian,Danielle, 
Esha,Geoff,Hanna,Jesse,Joshua,Kellen,
Kyle,Liam,Lori,Matt,Nathan,Shawna,Tom,
Abby,Amanda,Chris,Clarissa,Jhenna -->

Sort the names alphabetically, bottom to top, by the SECOND letter of the name (e.g. "Dan" would precede "Ben" because 'a'<'e').
```
var everyone = makeDeque(/*something*/);
everyone.sort(/*something*/);
var theFinalName = '/*someone*/';
assert(everyone.top() === theFinalName, 'Failed name test');
```

**d)** _[Easy]_ 
Add a deque method `shuffle()` which shuffles the elements into a random order.
First, try the easy (but slow and ineffective) way by using Array.sort() with a comparison function returning a random result.

Then do it properly using the [in-place Knuth-Fisher-Yates algorithm](http://bost.ocks.org/mike/shuffle/).

**e)** _[Moderate]_
Improve your deque implementation to ensure that no one can add unauthorized elements to it (e.g. extra Aces).
Change anything necessary so that `push(val)` and `unshift(val)` only add _val_ if it was part of the original deque and is currently missing (via `pop()` or `shift()`).
