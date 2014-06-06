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
-   Implement methods for your board called .placeX(x,y) and .placeO(x,y) which place, respectively, an X and an O in the spot described by the coordinates (x,y). (0,0) is the lower left corner of the board and (2,2) is the upper right corner of the board. They should return true if they succesfully place the mark, and undefined if the square wasn't empty.
-   Implement a method .clear() that will reset the board back to being empty
-   Implement a method .winner() that will check the board and, if there is a winner, return the three coordinates of the squares that made up the win as an array of objects of the form {x: ?, y: ?}. If there are multiple winning configurations on the board, just return one of them. It doesn't matter which.

# Problem 3

In this problem, you'll be exploring object oriented programming in Javascript
