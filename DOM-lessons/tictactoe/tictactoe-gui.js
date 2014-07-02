//var game = null;
var TicTacToeGui = function() {

	function getGameSpace() { //return element on page which will hold games
		return document.getElementById('tictactoe');
	}

	function mark(cell,symbol) {
		if (!cell) return false;
		cell.classList.remove("blank");
		return (cell.innerHTML = symbol);
	}

	function unmark(cell) {
		if (!cell) return false;
		cell.classList.add("blank");
		var oldmark = cell.innerHTML;
		cell.innerHTML = '';
		return oldmark;
	}

	function getCells(name) {
		return document.getElementsByName(name);
	}

	function prepareCell(board,cell,x,y) {
		// id is unique to each cell on the page, includes coords:
		cell.setAttribute('id',board.xyToId({x:x,y:y}));
		// name is shared by all cells of this board:
		cell.setAttribute('name',board.getId());

		cell.classList.add('blank'); //CSS class for empty cells
		// additional classes needed for grid lines:
		if (!x) cell.classList.add('leftmost');
		if (!y) cell.classList.add('topmost');

		cell.addEventListener('click',function() {
			board.getAction()(x,y);
		});

		cell.addEventListener('mouseover',function() {
			var symbol = board.getState();
			if (typeof symbol !== 'string')
				symbol = '';
			cell.setAttribute('symbol',symbol); // special attribute for CSS to use in 
		});
	}

	function addBoard(board) { // add another board in the game space
		var table = document.createElement('table');
		getGameSpace().appendChild(table);
		var tr,td;
		for (var y=0; y<3; y++) {
			tr = document.createElement('tr'); //make new row
			table.appendChild(tr); //add row to table
			for (var x=0; x<3; x++) {
				td = document.createElement('td'); //make new cell
				prepareCell(board,td,x,y); //prep it
				tr.appendChild(td); //add cell to row
			}
		}
		return table;
	}

	var boardID = 0;

	function TicTacToeGui() {
		var myid = 'board' + boardID++;
		this.getId = function() {return myid;}

		var action = null;
		this.getAction = function() {return action;}
		this.setAction = function(callback) {action = callback;}

		var state = undefined;
		this.getState = function() {return state;}
		this.setState = function(newstate) {
			state = newstate;
			if (typeof newstate === 'object') {
				this.showWinner(newstate);
			}
		}

		this.table = addBoard(this);
	}

	TicTacToeGui.prototype.xyToId = function(xyObj) {
		return this.getId()+'x'+xyObj.x+'y'+xyObj.y;
	}

	TicTacToeGui.prototype.mark = function(xyObj,symbol) {
		var id = this.xyToId(xyObj);
		var td = document.getElementById(id);
		return mark(td,symbol);
	}
	TicTacToeGui.prototype.clear = function() {
		var cells = getCells(this.getId());
		cells.forEach(unmark);
	}
	function showWinningCell(id) {
		var td = document.getElementById(id);
		//console.log(id,td);
		if (!td) return;
		td.classList.add('winner');
	}

	TicTacToeGui.prototype.showWinner = function(trio) {
		var me = this;
		trio.map(function(xyObj){
				return me.xyToId(xyObj)})
			.forEach(showWinningCell);
	} 

	return TicTacToeGui;
}();
