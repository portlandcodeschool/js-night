<div id="table-of-contents">
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
</div>

# Problem 1

This is a sequence of exercises related to how constructors and prototypes work.
-   First make a constructor for an object that has fields .a and .b and initializes them to 0 and 1 respectively
-   Now, make two objects named obj1 and obj2 using this constructor
-   Now make a new object obj3 this way
    
        var obj3 = {};
        Constructor.call(obj3);
    
    and check its fields.
-   Next, add a field to .c to obj1 with a value of 2
-   What is the value of obj2.c?
-   Now, add a field .d with the value 3 to the prototype for obj1 (how do we access the prototype again?)
-   What are the values of obj1.d, obj2.d, obj3.d? Can you explain the results?

Having understood how the above sequence plays out, now let's get a little more practice. Starting with the following code

    function User(name,pw) {
        var pw = pw;
        var name = name;
        this.getName = function () {return name;};
        this.validate = function (str) {return (pw === str);};
    }
    
    var kynareth = new User("Kynareth","treehugger");
    var talos = new User("Talos","imawes0me");
    var akatosh = new User("Akatosh","password");

We realize that we want to actually make some changes to this so that objects with constructor `User` will have an extra field called .isDislikeable which should be false by default, but set to true for talos.

Finally, let's try one more small exercise showing how prototypes define defaults. Using only object literals fill in the question mark so that you get the indicated answers

    function Constructor(){};
    Constructor.prototype = ?;
    
    var obj1 = new Constructor();
    
    console.log(obj1.a); // should print out 1
    console.log(obj1.b); // should print out "default"

# Problem 2

In this problem, you'll be implementing some of the machinery for a game of tic-tac-toe. Tic-tac-toe takes places on a board which, as you'll recall from your childhood days, has three rows and three columns. Players take turns placing X's and O's until the board is full without anyone winning, which is a draw, or until a player gets three in a row of their piece.
-   Use closures and constructors to implement the 3x3 board as an object. You'll want the internal representation of the board itself to be private, but you'll have a method .showBoard() which should print the board out as a string. Now, there are common ways one can represent a 2d board: the first is to just use a simple array and have the logic of your program understand how to translate that to a 2d interface, and the other is to use an array of arrays, that is an array whose elements are other arrays and in this way represent both the rows and columns. As a hint, the representation as a simple array is probably easier. Pick one of them and make sure you're consistent about it. You'll have to think about how you want to represent, internally, what an X, an O, and a blank space all look like inside your board.
-   Implement methods for your board called .placeX(x,y) and .placeO(x,y) which place, respectively, an X and an O in the spot described by the coordinates (x,y). (0,0) is the lower left corner of the board and (2,2) is the upper right corner of the board. They should return true if they successfully place the mark, and undefined if the square wasn't empty.
-   Implement a method .clear() that will reset the board back to being empty
-   Implement a method .winner() that will check the board and, if there is a winner, return the three coordinates of the squares that made up the win as an array of objects of the form {x: ?, y: ?}. If there are multiple winning configurations on the board, just return one of them. It doesn't matter which.

# Problem 3

<!--In this problem, you'll be exploring object oriented programming in Javascript-->

**a)** _[Easy]_
Change your makeCard factory into a constructor named Card.  If you've finished a version from Homework #4 which lives inside a module (IFFE), leave it as a module which returns a value for Card.

**b)** _[Easy]_
The majority of the methods you've written for the cards (e.g. _rank_, _suit_, _name_, _color_...)  are _instance_ methods, called through each individual card instance.  Implement each of those instance methods using Card's prototype, instead of linking them to each card.

**c)** _[Moderate]_
Include four class methods:
-	cardID(rankNum,suitNum)
-	rank(cardID)
-	suit(cardID)
-	name(cardID)
Your class methods should be attached to the constructor Card, which represents the whole 'class'.  Notice that these class methods:
-    can be called without having any card instances
-    need an id argument, unlike the corresponding instance method.

The corresponding class and instance methods will have very similar code; try to share as much code between them as possible.



**Problem 4)** _[Difficult, but Fun!]_
<!-- This one is still tentative; I need to write solution to make sure it's doable without much work.-->

Create a subclass of Card called Tarot, representing the four suits ("Minor arcana") of a Tarot card deck.
The only differences from normal playing cards are these:
-   The four Tarot suits are called 'Cups', 'Wands', 'Swords', and 'Pentacles'.  Don't worry about how they correspond to the normal suits.
-   A Jack is instead called a 'Knight'.
-   There is one extra rank, 'Page', which follows the 10 and precedes the Knight.

The point of subclassing to extend existing functionality without rewriting it, so try to leave your original playing card implementation unchanged.  If you decide to make changes to the Card module to accomodate the Tarot extension, make sure the playing cards operations still work normally when you're done.

The Tarot subclass needs to duplicate very little code from the Cards; mostly it can work by making use of the Card features.

**a)** Write a constructor Tarot.  When it initializes Tarot instances, it should call Card as an initializer method to do most of the work.  (Hint: use the _call_ method to temporarily 'loan' the Card method to the new instance.)

**b)** Give Tarot a prototype which inherits from Card's prototype.  This will give your Tarot instances all the methods of Card instances.  Then add a few methods to the Tarot prototype's which override the inherited Card prototype methods to represent the differences between the two card sets.
