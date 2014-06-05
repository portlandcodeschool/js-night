Homework 4

**1)**

Package your playing-card code into a module; that is, wrapped inside an immediately-invoked function expression (IIFE, or "Iffy").  Your module should return one object: the factory _makeCard_.  As before, calling makeCard(id) should create and return a card object with methods for rank, suit, name, etc, but with a structural difference:
the methods shared between instances need not be initially as methods of the factory, but can instead be 'siblings' of it, functions local to the IFFE's scope.


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

**a)** _[Difficulty: moderately difficult] Write a user-registration tool, a function which accepts a username and password and generates a user object.  Once we have a user object we should be able to do two separate things with it: retrieve the username from the object and test to see if a provided password matches the password for the user at object creation. It should not be possible, however, to modify the username or password once created nor to directly see the password. Your solution should somehow use closures to protect the password as a private variable. Ultimately, this means that your user object should have

  + A method .getName() which returns the username
  + A method .validate(str) that takes a string and returns true if the password is correct
  + There is no way to see the password once a user is created
  + There is no way to modify the username or password once is created

**b)** _[Difficulty: difficult] Now that we have our user objects, let's assume that our system needs some notion of a "system log" that will record messages left by different users. This system log, being shared by all user objects created, will contain all the messages that users have recorded. You will need to modify the factory you made above to be a part of a module that has a private variable that holds the system log.

  + Entries can be added to the log with .record(msg), which is a method of the *user* object
    + The log entry should be recorded in the format "username: msg"
    + If no message is provided in the call to .record, then it should return undefined
  + The log should be retrievable by a method .getLog(name) which takes an optional "name" argument
    + .getLog should be a method of the *factory* that creates users, since it is an operation of the system and not something for individual users to use.
    + If the name is provided then it should print out all log entries that were recorded by that user
    + If no name is provided, then it should print out all log entries by all users
    + Log entries should be separated by newlines
  + The log should not be able to be modified other than through the .record method in a user.
