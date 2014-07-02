module.exports = function() { //module returning constructor:

	// Specification of lines shared by all boards; each 2-digit pair 'xy' refers to grid space (x,y),
	//   which in this implementation is a character within the private 'marks' string
	var lines = ['00 01 02',  '10 11 12',  '20 21 22', //columns
				 '00 10 20',  '01 11 21',  '02 12 22', //rows
				 '00 11 22',  '02 11 20']; //diagonals

	var cleanMarks = '...\n...\n...'; //initial marks for all boards
	var emptyMark = '.';

	// Class-wide (shared) helper functions without access to instance closure (i.e. board-specific marks):

	//xy is 2-digit string, e.g. '21'
	function xyToObj(xy) { //return coord obj
		return {x:xy[0],y:xy[1]};
	}

	function xyToN(xy) { // return mark index 
		return 1*xy[0] + 4*xy[1]; // with newline after each row, needs y*4 not y*3
	}

	function makeTrio(lineStr,winner) { // return winning cells (3 coord objs)
		var result = lineStr.split(' ').map(xyToObj);
		result.winner=winner; //'X' or 'O'
		return result;
	}

	// These two functions could equally well be placed within Board
	//   and therefore have access to function getMark without needing it as parameter:

	function checkLine(lineStr,getMarkFn) { // return truish ('X' or 'O') if line wins, else false
		// callback getMarkFn is needed to extract mark from specific board instance
		var marksOnLine = lineStr.split(' ').map(getMarkFn).join(''); //turn each xy pair into symbol
		if (marksOnLine==='XXX' || marksOnLine==='OOO')
			return marksOnLine[0];
		return false;
	}
	
	function checkWinner(getMarkFn) {
		for (var i=0, winner; i<lines.length; i++) { // check each line...
			winner = checkLine(lines[i],getMarkFn); //-->false,'X','O'
			if (winner) {
				return makeTrio(lines[i],winner);
			}
		}
		return false;
	}

	// ========= Board constructor: ==========

	function Board(endGameFn,gui) {
		var marks = cleanMarks; 
		//private data, specific to one board; represents 9 spaces.
		// Could be array, but simpler to use string: each char is ' ','X','O', or newline
		var numMarks = 0; //count of non-blank marks

		//----Private helper functions ----
		// (each with access to marks)

		function getMark(xyStr) {
		// getMark can be passed as callback to shared functions
		//   to give them read access to marks
			return marks[xyToN(xyStr)];
		}

		function placeMark(x,y,mark) {
			var n = xyToN(x+''+y);
			// check if empty:
			if (marks[n] != emptyMark) return false;
			// leave mark:
			numMarks++;
			marks =  //string equivalent of marks[n]=mark :
					marks.substr(0,n) + // preceding chars
					mark +  // replace single char
					marks.substr(n+1); // following chars
			// update gui:
			if (gui) gui.mark({x:x,y:y},mark);


			// if endGame callback, check for winner:
			var triple = (endGameFn && checkWinner(getMark));
			if (triple || numMarks==9)
				endGameFn(triple);

			return mark;
		}

		// --- Public methods: ---

		this.placeX = function(x,y) {
			return placeMark(x,y,'X');
		}

		this.placeO = function(x,y) {
			return placeMark(x,y,'O');
		}

		this.clear = function() {
			marks = cleanMarks;
			numMarks = 0;
			if (gui) gui.clear();
		}

		this.show = function() {
			// storing the marks as one string makes this trivial:
			return marks;
		}

		this.winner = function () {
			return checkWinner(getMark);
		}

	} // end constructor

	return Board; //return the constructor as module's product
}()



