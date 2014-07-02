** Click-Tac-Toe **

Write a single-page client-side application which adds a graphical interface to your Tic-Tac-Toe engine from homework #5.

Your application should comprise two modules with a strict separation between them.
_(By "module", we mean merely "independent component".  You don't need Node for this problem, and client-side JS has no formal module system.)_

* The _game_ module (a.k.a. the "Model") is responsible for maintaining the state and rules of a game.  It knows the logical structure of the board and detects when the abstract marks on it determine a winner.
It might have a text-only representation of the board for console use, but otherwise it has no commitment to any graphical representation.

If you've written a Tic-Tac-Toe engine already, your game module is nearly finished.  If you haven't, for this exercise you may adopt the one in the Homework 5 solution and modify it as directed here.


* The _gui_ module (a.k.a. the "View") knows nothing about the logical structure or rules of the game, but it knows how to draw it in the browser and how to initiate action with clicks.
The _gui_ includes both a _.js_ and a _.css_ file which work together and share certain assumptions about the interface.

The body of your application will be a single HTML file which embeds both modules.  It can be run merely by opening the file in a browser; no server is needed.

---

**a)** Begin with the enclosed file _tictactoe1.html_.  Use the HTML table elements within it as the structure of your interface.  Following the example of [tictactoe-gui-template.js](tictactoe-gui-template.js), write a gui module (an IIFE) which returns a single constructor `TicTacToeGui()` and use it to make a gui instance with the following methods:

* `gui.clear()`: clear the board of all marks.
* `gui.mark(xyObj,symbol)`: add a mark _symbol_ in the cell at position _xyObj_, which has the form `{x:0,y:0}`.

Your _.js_ file should control only semantic changes; write a supplementary _tictactoe-gui.css_ file which decides the display details.

Next, modify the _game_ module so that its constructor accepts two arguments:
`TicTacToeGame(endgameCallback,gui)`
Either argument may be null.  But if a gui is provided, the game instance should call `gui.clear()` and `gui.mark()` as needed to make the gui reflect the game's state.

You may ignore _endgameCallback_ for this exercise; the gui will reflect a win through other means.

<!--
Game API:
placeX()
placeO()
clear()
winner()

GUI API:
mark()
clear()
-->

At this point, the gui is display-only.  But the game can be played through the console, and the gui should track it.

---

**b)** Upgrade the game model the remember whose turn it is.  Pick either player to start first, and toggle after each move.

Add two methods to the game API:

* `game.whoseTurn()` returns either 'X' or 'O'
* `game.takeTurn(x,y)`: calls either placeX(x,y) or placeO(x,y), depending on whoseTurn().

**c)** Replace `tictactoe1.html` with the simpler`tictactoe2.html` and modify the gui constructor to generate the HTML structures needed for display.  Insert that structure within the #tictactoe div.  You should be able to have multiple games running within the page, with a gui instance for each.

Although you may find easier ways of referencing gui elements, for practice, continue the system of locating elements through unique ids.

---

**d)** Make the gui drive the game through clicks!

To maximize flexibility, instead of calling the _game_ directly, the _gui_ should offer a method which lets the _game_ store an action callback.
Write these functions:

* `gui.setAction(callback)` stores a callback of the form `function(x,y){...}` which _gui_ calls whenever there's a click;
* `gui.getAction()` returns that callback.

Modify the _gui_ to call the action function whenever there is a click, passing the coordinates of the clicked cell.

Now your game should be playable from the gui: a click will cause the _gui_ to contact _game_, which may cause _game_ to request a redisplay from _gui_.

---

**e)** The game is awkward to play without seeing which mark will be placed next.
Modify the gui to preview the next mark whenever the mouse is over a blank space.  You may be as creative as you like in how that cue is displayed.

To do so, the _gui_ will need to to maintain a "state" representing whose turn it is.  But since that depends on the game logic, the _game_ should control when and how the _gui_ changes state.

Write two more gui methods:

* `gui.getState()` return the current gui state
* `gui.setState(newstate)` sets a new gui state

The argument _newstate_ should be one of four values:
'X' means the game is in progress and X goes next;
'O' means the game is in progress and O goes next;
null means the same is over in a draw;
array means the game is over with a winner.  Use the array returned by game.winner() as defined in HW5:
a series of three objects {x:_,y:_} and an additional property 'winner' with value 'X' or 'O'.

Modify _game_ to update _gui_'s state as needed.

---

**f)** Have _gui_ do something appropriate when its state changes to one of the game-over states.

---

**g)**

After all the steps above, your _gui_ module should produce instances which implement this minimal interface:

.mark(coord,symbol)
.setAction(function(x,y) {...})
.getAction()
.setState(newstate)
.getState()

Your _game_ instances need no public interface at all (since they initiate contact with gui), although you may include public methods for debugging or playing the game from console.

Since everyone will be adhering strictly to this interface, everyone's modules should be compatible with all others!

After you submit your solutions, download someone else's and substitute one of their modules for one of yours.
Try playing your tictactoe game implementation with their gui, and vice versa.  If your modules aren't compatible, work together to figure out why, and try to standardize both sets.
