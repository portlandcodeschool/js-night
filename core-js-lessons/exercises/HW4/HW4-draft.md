Homework 4

**1)**

Package your playing-card code into a module; that is, wrapped inside an immediately-invoked function expression (IIFE, or "Iffy").  Your module should return one object: the factory _makeCard_.  As before, calling makeCard(id) should create and return a card object with methods for rank, suit, name, etc, but with two differences:




**2)** 

Your recent implementation of a deque tries to maintain the integrity of its contents by preventing a _push_ or _unshift_ of items not in the original deque.  But a programmer could deliberately or accidentally circumvent your efforts by accessing and changing the deque's array instead of using its methods.

**a)** _[Difficulty: easy when you know how]

Protect your deque instances by rewriting your deque factory using closures to hide the content array from the outside world.  Your deque methods, with their coordinated logic, should be the only way of changing their hidden array.

(Hint: you'll have to give up the strategy of sharing factory methods with instances to avoid redundancy.  Instead, have each call to _makeDeque_ generate a set of methods specific to one deque instance which can access any private arrays associated with it.)

(Hint #2: the private arrays will live in a scope, not in an object.)

**b)** _[Difficulty: moderate]_ One of your deque methods, _map_, (probably) still has a vulnerability!  First, exploit that weakness and figure out a way to slip an extra Ace into your deck of cards even when closures are protecting your deque's content.

Then rewrite your deque's _map_ method to prevent such an exploit.

(Hint: remember that Array.map offers more than one argument to its callback!)

**3)**

Write a user-registration tool, a function which accepts a username and password and generates a user object.
