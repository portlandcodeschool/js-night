<!--div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#sec-1">1. Problem 1</a></li>
<li><a href="#sec-2">2. Problem 2</a>
<ul>
<li><a href="#sec-2-1">2.1. Part 1</a></li>
</ul>
</li>
<li><a href="#sec-3">3. Problem 3</a></li>
</ul>
</div>
</div-->

Homework #5

---

 **1)  Constructor basics **

This is a sequence of simple exercises related to how constructors and prototypes work.

**a)** _[easy]_

-   First make a constructor named _Ctor_ for an object that has properties _a_ and _b_ and initializes them to 0 and 1 respectively.
-   Now, make two objects named _obj1_ and _obj2_ using _Ctor_.
-   Now make a new object obj3 this way:
    ```
    var obj3 = {};
    Ctor.call(obj3);
    ```
    and check its properties.
-   Next, add a property _c_ to _obj1_ with a value of 2.  What will be the value of _obj2.c_?
-   Now, add a property _d_ with the value 3 to _obj1_'s "proto" (the object which helps out when _obj1_ can't do something by itself).  Remember that there are at least four ways of referring to that proto object.
-   What are the values of _obj1.d_, _obj2.d_, and _obj3.d_? Can you explain the results?

**b)** _[easy]_
Having understood how the above sequence plays out, now let's get a little more practice. Start with the following code:
```
function User(name,pw) {
    this.getName = function () {return name;};
    this.validate = function (str) {return (pw === str);};
}
var kynareth = new User("Kynareth","treehugger");
var talos = new User("Talos","imawes0me");
var akatosh = new User("Akatosh","password");
```

We realize that we want to make some changes so that objects made with constructor _User_ will have an extra field called _isDislikeable_ which should be false by default, but set to true for talos.  Change the code above as needed.
_(Hint: You could do it by mentioning "Talos" specifically in the constructor, but that generalizes badly.  Find a better way!)_

**c)** _[moderate]_
Finally, let's try one more small exercise using prototypes to define defaults.  Consider this code:
```
function A() {};
//set default values for instances of A:
A.prototype = {num:0, str:'default'};
var objA = new A();

function B() {};
// set default values for instances of B:
B.prototype.num = 0;
B.prototype.str = 'default';
var objB = new B();
```
There is a difference between the behaviors of objA and objB!  Explain.

---
**2) Tic-Tac-Toe**

In this problem, you'll be implementing some of the machinery for a game of tic-tac-toe. Tic-tac-toe takes places on a board which, as you'll recall from your childhood days, has three rows and three columns. Players take turns placing X's and O's until the board is full without anyone winning, which is a draw, or until a player gets three in a row of their piece.

**a)** _[easy]_  Use closures and constructors to implement the 3x3 board as an object.  Specifically, write a constructor TicTacToeBoard which can be used to create a board instance, which will have all the methods needed to play a game.  Keep the board's internal representation private, but write a method _show()_ which prints the board out as a string with three lines, one per row. 

There are several ways to represent a 2D board, but we recommend one of these two:

- Use a simple array and have the logic of your program understand how to translate that to a 2D coordinate system.  _Hint: that logic is very similar to the logic of converting a single card id to a rank and suit._

- OR, use nested arrays: one array whose elements are other arrays, corresponding to a series of rows each containing a series of cells.

Either way, you'll have to decide how to represent blank spaces, X's, and O's, and update that structure as the game is played.

**b)**  _[easy]_ Implement methods for your board called _placeX(x,y)_ and _placeO(x,y)_ which place, respectively, an X and an O in the spot described by the coordinates (x,y). Coordinate (0,0) is the upper left corner of the board and (2,2) is the lower right corner of the board. They should return true if they successfully place the mark, and undefined if the square wasn't empty.

Implement another method _clear()_ that will reset the board back to being empty.

**c)** _[moderate]_  Implement a method .winner() that will check the board and, if there is a winner, return the three coordinates of the squares that made up the win as an array of objects of the form {x: ?, y: ?}. If there are multiple winning configurations on the board, just return one of them; it doesn't matter which.  Give the returned array one extra property named 'winner' indicating which symbol occupies those winning spaces.

**d)** _[moderately difficult]_  Add an optional parameter to the TicTacToeBoard constructor providing a callback function which, if available, is called whenever the game ends, either in a win or a draw.  You may decide what the callback does in each case, but a message to console.log would be an easy choice.

---
**3) Cards Schmards **

_(Note: If you're fed up with the cards, you don't have to write all the methods.  Just do a few to make sure you understand how to attach and call them in the constructor pattern.)_

**a)** _[Easy]_
Change your makeCard factory into a constructor named Card.  If you've finished a version from Homework #4 which lives inside a module (IIFE), leave it as a module which returns constructor Card.

**b)** _[Easy]_
The majority of the methods you've written for the cards (e.g. _rank_, _suit_, _name_, _color_...)  are _instance_ methods, called through each individual card instance.  Implement each of those instance methods using Card's prototype, instead of linking them to each card.  Make sure each method uses 'this' to refer to the card instance.

**c)** _[Moderate]_
Include four class methods:

-	_cardID(rankNum,suitNum)_
-	_cardRank(cardID)_
-	_cardSuit(cardID)_
-	_cardName(cardID)_

These class methods should be attached to the constructor Card, which represents the whole 'class'.  Notice that these class methods:

-    can be called without having any card instances;
-    need arguments, unlike the corresponding instance method.

The corresponding class and instance methods will have very similar code; try to share as much code between them as possible.
If you're using an IIFE module, it can contain private helper functions useable by both _Card_ and _Card.prototype_, or the prototype methods can make use of the class methods.

---
**4) Simple Subclassing **

_(OPTIONAL:  If you didn't understand the brief explanation of inheritance in class, don't worry about this one.  If you think you get it and want some practice, give it a try!)_

_[Easyish]_ Implement a simple taxonomy of four related classes, using a constructor for each:

- Animal: every instance of an Animal should inherit a method called _move()_.  For basic animals, this just returns the string "walk".
- Bird: A subclass of Animal.  Every Bird instance should return "fly" instead of "walk" when asked to _move()_.  All Birds also have a property _hasWings_ which is true.
- Fish: Another subclass of Animal.  A Fish instance will "swim" instead of "walk".
- Penguin: A subclass of Bird.  Penguins cannot fly, so they should return "swim" when moving.

You should see these behaviors:
```
new Animal().move();// 'walk'
new Fish().move();// 'swim'
new Bird().move();// 'fly'
var pengo = new Penguin();
pengo.move();  //'swim'
pengo.hasWings; //true;
pengo instanceof Bird; //true
pengo instanceof Animal; //true
```

_Bonus: see if you can make Penguins move() by sharing code with Fish, even though Penguins are Birds._







<!--
If you've found this problem in the comment, and want to try it, go for it!

**Problem 5)** _[Difficult, but Fun!]_

Create a subclass of Card called Tarot, representing the four suits ("Minor arcana") of a Tarot card deck.
The only differences from normal playing cards are these:
-   The four Tarot suits are called 'Cups', 'Wands', 'Swords', and 'Pentacles'.  Don't worry about how they correspond to the normal suits.
-   A Jack is instead called a 'Knight'.
-   There is one extra rank, 'Page', which follows the 10 and precedes the Knight.

The point of subclassing to extend existing functionality without rewriting it, so try to leave your original playing card implementation unchanged.  If you decide to make changes to the Card module to accomodate the Tarot extension, make sure the playing cards operations still work normally when you're done.

The Tarot subclass needs to duplicate very little code from the Cards; mostly it can work by making use of the Card features.

**a)** Write a constructor Tarot.  When it initializes Tarot instances, it should call Card as an initializer method to do most of the work.  (Hint: use the _call_ method to temporarily 'loan' the Card method to the new instance.)

**b)** Give Tarot a prototype which inherits from Card's prototype.  This will give your Tarot instances all the methods of Card instances.  Then add a few methods to the Tarot prototype's which override the inherited Card prototype methods to represent the differences between the two card sets.

-->