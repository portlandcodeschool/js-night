1.  Write a function equivalent(a,b) to compare the equivalence of two distinct objects a and b.


2.  Social network


3.  Chess!
In this exercise, you will implement the mechanics (but not the intelligence!) of a chess game.
(Note: These problems could be solved without using as many objects as we propose, but this week is about practicing your object-fu!)

a) Represent the board.
Write a function makeBoard which returns a single object representing the whole 8x8 board.  It should somehow incorporate 64 other objects which each represent one square.
It will be helpful to identify squares and their positions by two different numbering systems:
i) a number N from (0..63) (or 1..64 if you prefer) which identifies one square,
ii) a pair of numbers (x,y) each from 0..7 (or 1..8) which together give the unique coordinates of a square.

The object for each square should contain numbers from one or both systems so that its position can be inferred without additional data.

Give your board object the following methods:
squareN(n): return the object for square #n
squareXY(x,y): return the object for square (x,y)
getN(square): return the N of object square
getXY(square): return the (x,y) of object square

neighborsN(square): return an array of numbers, the N values of each of object square's neighbors.  Consider diagonally-adjacent squares to be neighbors.  The order of the neighbors in the list doesn't matter, but don't repeat any values, and don't leave holes in your array.  Also: squares at the edge of the board won't have neighbors in every direction!  Exclude missing neighbors and shorten the returned array.
Your resulting array should always have a length of 8,5,or 3.


b) Populate your board with pieces!  Represent each piece with a one character string, as follows:
K=king, Q=queen, N=knight, B=bishop, R=rook, P=pawn.
Rather than remember black and white, let's call the colors "UPPER" and "lower"; use upper case for UPPER pieces and lower case for lower pieces.
When a piece occupies a square, set a property of that square object to the appropriate string.

Add two methods to your board object:

load(positions): positions is a single string containing one or more pairs each of the form N:P, where P is the code for one piece (i.e. one of kKqQnNbBrRpP) and N is the number of the square it occupies.
Successive pairs should be separated by a single space.
The method should return the number of pieces placed.
If any pair is invalid in any way, including:
-- doesn't match N:P pattern,
-- invalid P,
-- invalid N,
-- repeated N (multiple pieces sharing square),
then write a warning to console.error, ignore that pair, and continue.
Your method should return the number of pieces successfully placed.
Don't worry about counting pieces; a position string with 64 queens is ok.

save(): return a valid position string representing all the pieces on your board.

For both methods: the order of pairs doesn't matter, but debugging will probably be easier if you order them in a sensible way.

The initial setup of a board is encoded here:
//UPPERS:
"1:R 2:N 3:B 4:K 5:Q 6:B 7:N 8:R "+
"9:P 10:P 11:P 12:P 13:P 14:P 15:P 16:P "+
//lowers: 
"49:p 50:p 51:p 52:p 53:p 54:p 55:p 56:p "+
"57:r 58:n 59:b 60:k 61:q 62:b 63:n 64:r"

c) Similarly, add two more methods which work in a more human-friendly format:
scan(positions) should set up a board from a positions string which includes every space, divided into 8 rows.
Each empty space should be represented with a 'dot',
each filled space with the letter of its piece.
After 8 spaces, expect a '\n' and a new line.
 

show(): output a string in the same format as scan.  It will have 64 character plus delimiters.

=== Hard ====

d) Verify proposed moves of your chess pieces.
Write one more method of the board:
canMove(fromN,toN) considers a move by the piece currently at space fromN to space toN.
The function should return false if the move is impossible for one of these reasons:
-- either fromN or toN is invalid, or there is no piece at fromN
-- the piece cannot move in that direction and distance
-- the piece is blocked by another piece en route
-- toN holds a piece of the same color
Otherwise the function should return one of two truish values:
-- the opposing piece captured at toN, if any
-- boolean _true_ if toN is empty

Hints:

You'll probably want to write at least six functions, one for each type of piece.

You might want to make use of a "delta" object, a pair of numbers describing the relative change in x and y from one space to another.

Look for ways to recycle work.  For example, notice that the moves available to a Queen are the union of those for a Rook and a Bishop.

For pawns: assume that the 'forward' direction is +y for Uppers and -y for lowers.  Assume any pawn which reaches the far side can be replaced with a queen of the same color.

You may ignore threats to a king which would disallow certain moves in a real game.

You may ignore "castleing" (if you don't what that is, you're fine).



=== Super Hard version:===
c) Represent the possible moves of your chess pieces.
Write two more methods of the board:

moves(fromN): return an array of Ns describing all currently-empty squares to which the piece currently at fromN might move.  Its length could be anywhere from 0 to 27.

captures(fromN): return an array of Ns describing all squares where a piece of the opposite color could be captured by the piece currently at fromN.

Hints:
look for ways to recycle work.  For example, notice that the moves available to a Queen are the union of those for a rook and a bishop.

You may ignore threats to a king which would invalidate certain moves in a real game.

You may ignore "castleing" (if you don't what that is, you're fine).

Create six additional functions, one for each type of piece:
pawn,rook,knight,bishop,queen, and king; then call the appropriate one for the piece at fromN

To follow "rays" in different directions, you'll need some representation of each of 8 directions.  Consider using a two-part relative coordinate (dx,dy) where each part is -1, 0, or 1.



