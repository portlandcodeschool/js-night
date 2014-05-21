
**4)  Chess!**

In this exercise, you will implement the mechanics (but not the intelligence!) of a chess game.
(Note: These problems could be solved without using as many objects as we propose, but this week is about practicing your object-fu!)

You may create and use two global variables, objects `chess` and `board`.
Each should follow the Toolkit pattern (i.e. each serves as a family of related methods which can call each other).
Methods which apply to chess in general (which don't depend on the configuration of any particular board) should belong to `chess`.  Methods which require configuration details should belong to `board`.

Chess should include at least one method `makeBoard()`, which creates and initializes the empty board:
```
var board = chess.makeBoard();
```

(Hint: if you get stuck solving the problems this way, then start by writing all the global variable and functions you want, but make sure to repackage them all as methods when you're finished.

_[Moderate:]_

**a)** Represent the basic board geometry.
Write a function `chess.makeBoard()` which returns a value for `board`, the object representing the whole 8x8 board.  It should somehow incorporate 64 other objects which each represent one square.
It will be helpful to identify squares and their positions by two different numbering systems:
i) a number N from (0..63) which identifies one square, numbered left to right in rows top to bottom;
ii) a pair of numbers (X,Y) each from 0..7 which together give the unique coordinates of a square.

The object for each square should contain numbers from one or both systems so that its position can be inferred without additional data.

Include the following methods:

* `chess.xAtN(n)`: return the X for a particular N
* `chess:yAtN(n)`: return the Y for a particular N
* `chess.nAtXY(x,y)`: return the N for a particular pair x,y
* `chess.isValidN(n)`:return true only if N is a valid square #
* `chess.isValidXY(x,y)`: return true only is (x,y) is a valid coordinate

<!--
* `board.squareAtN(n)`: return the object for square #n on board
* `board.squareAtXY(x,y)`: return the object for square (x,y)
* `board.getN(square)`: return the N of object square
* `board.getXY(square)`: return the (x,y) of object square
-->

<!--
Omit:
neighborsN(square): return an array of numbers, the N values of each of object square's neighbors.  Consider diagonally-adjacent squares to be neighbors.  The order of the neighbors in the list doesn't matter, but don't repeat any values, and don't leave holes in your array.  Also: squares at the edge of the board won't have neighbors in every direction!  Exclude missing neighbors and shorten the returned array.
Your resulting array should always have a length of 8,5,or 3.
-->

**b)** Populate your board with pieces!
Instead of black and white, let's call the two piece colors "UP" and "DOWN";
UP pieces begin at the top (small Y) of the board and are named with uppercase letters; DOWN pieces begin at the bottom (big Y)  and use lowercase letters.
Name each piece with a one character string, as follows:
king:K/k, queen:Q/q, knight:N/n, bishop:B/b, rook:R/r, pawn:P/p.
When a piece occupies a square, set a property of that square's object to the appropriate string.

You'll represent the board configuration in two formats:
an enumeration of pieces in various positions, and a "snapshot" of the entire board.

Add five methods to your board object:

* `board.pieceAtN(n)`: returns the letter for the piece at square #N, or something falseish if none

* `board.load(positions)`: positions is a single string containing one or more pairs of the form N:P, where P is the one-letter code for one piece (i.e. one of kKqQnNbBrRpP) and N is the number of the square it occupies.
Successive pairs should be separated by a single space.
The method should return the number of pieces placed.
If any pair is invalid in any way, including:
	* doesn't match N:P pattern,
	* invalid P,
	* invalid N,
	* repeated N (multiple pieces sharing square),

then write a warning to console.error, ignore that pair, and continue.
Your method should return the number of pieces successfully placed.
Don't worry about counting pieces; a position string with 64 queens is ok.

* `board.save()`: return a position string representing all the pieces on your board, in the format read by board.load().

For both methods: the order of pairs doesn't matter, but debugging will probably be easier if you order them in a sensible way (e.g. increasing N).  The initial setup of a board is encoded here:
```
//UP:
"0:R 1:N 2:B 3:K 4:Q 5:B 6:N 7:R "+
"8:P 9:P 10:P 11:P 12:P 13:P 14:P 15:P "+
//DOWN: 
"48:p 49:p 50:p 51:p 52:p 53:p 54:p 55:p "+
"56:r 57:n 58:b 59:k 60:q 61:b 62:n 63:r"
```

Next add two more methods for the "snapshot" format:

* `board.scan(grid)` should set up the board from a grid string which includes every square, divided into 8 rows.  Each empty square should be represented with a '.' or ',' and each occupied square with the letter of its piece.
After every 8 characters, expect a '\n'.

A scan for the initial setup is here:
```
"RNBKQBNR\n"+
"PPPPPPPP\n"+
".,.,.,.,\n"+
",.,.,.,.\n"+
".,.,.,.,\n"+
",.,.,.,.\n"+
"pppppppp\n"+
"rnbkqbnr\n";
```
 
* `board.show()`: output a string in the same format as scan.  It will have 64 characters plus delimiters.  For empty squares, alternate dots and commas in a checkerboard pattern.


---

_[Difficult:]_

**c)** Verify proposed moves of pieces on a populated board.

Write one more method of the board:

`board.canMove(fromN,toN)` considers a move by the piece currently at space _fromN_ to space _toN_.  The function should return boolean _false_ if the move is impossible for any of these reasons:

* either _fromN_ or _toN_ is invalid, or there is no piece at _fromN_,
* the piece cannot move in that direction and distance,
* the piece is blocked by another piece en route,
* _toN_ holds a piece of the same color.

Otherwise the function should return a truish value:

* boolean _true_ if _toN_ is empty, or
* the name of an opposing piece captured at _toN_.

General simplifications:
You may ignore threats to a king which would disallow certain moves in a real game.
You may ignore "castleing" (if you don't what that is, you're fine).
(What about pawn double-space initial move?)


Hint #1: you'll need at minimum six helper functions, one for each kind of piece.  But there will be lots of similar logic between them, so expect to write many more helper functions which are reused in multiple contexts.
Each helper function should be a method of either _chess_ or _board_.

Hint #2: build lots of tools which answer conceptual questions about the relation between spaces and pieces.  For example:
Is a space empty?
What piece is in a particular space?
What color is a piece?
Are two pieces opponents?
Is a move diagonal or axial (along rows/columns), or neither?
Is a move zero spaces (a non-move), one space, or multiple spaces?
What are the spaces between two spaces which are diagonal or axial?
What are the spaces in a "ray" out from an origin in some direction?
Is a set of spaces completely empty?
Is a move in a "forward" direction for the piece moving?
Regardless of path taken, can a piece occupy a space?

Hint #3: consider using an "delta" object which represents the geometry of a move between two spaces (i.e. a 2-D vector), and then writing functions which answer questions about it.

Hint #4: vectors/deltas which are diagonal or axial are easy to decrement toward zero or extend in the same direction, thereby following a sequence of aligned squares.

Hint #5: Pawns are the hardest; start by writing a rule (in ordinary words if needed) to decide when they can move.  Figure out which functions you'll need to answer that question, then look for ways to reuse those components for deciding other piece moves. 

Hint #6: By the time you've solved Rooks and Bishops (ideally in very similar ways), Queens are trivial!

TESTING

Run assertion test on all aspects of your code.  One set of assertions is included in the [template file](chess-template.js), and your code should pass them all, but add your own as needed.

<!--
NOTES

To solve the next problem, you'll need to build a few more tools.
Design an "delta" object which represents the spatial difference between two squares on the board, and use instances of it in these additional board methods:

getDelta(fromN,toN): return an object representing the translation from square fromN to square toN.
addDelta(fromN,delta): return the N of the square obtained by translating square fromN by delta.
isNonzeroDelta(delta)
reduceDelta(delta)

areDiagonal(fromN,toN)
areAxial(fromN,toN)
isDiagonal(delta)
isAxial(delta)
spacesBetween(fromN,toN)

pieceColor(piece)
pieceColorAt(n)

Hints:

You'll probably want to write at least six functions, one for each type of piece.

You might want to make use of a "delta" object, a pair of numbers describing the relative change in x and y from one space to another.

Look for ways to recycle work.  For example, notice that the moves available to a Queen are the union of those for a Rook and a Bishop.

For pawns: assume that the 'forward' direction is +y for Uppers and -y for lowers.  Assume any pawn which reaches the far side can be replaced with a queen of the same color.

----
Super-hard version:
e) Represent the possible moves of your chess pieces.
Write two more methods of the board:

moves(fromN): return an array of Ns describing all currently-empty squares to which the piece currently at fromN might move.  Its length could be anywhere from 0 to 27.

captures(fromN): return an array of Ns describing all squares where a piece of the opposite color could be captured by the piece currently at fromN.

Hints:
To follow "rays" in different directions, you'll need some representation of each of 8 directions.  Consider using a two-part relative coordinate (dx,dy) where each part is -1, 0, or 1.
-->


