function installTicTacToe() {
	// consider making these global during debugging...
	var gui = new TicTacToeGui();
	var game = new TicTacToeGame(null, //optional endgame callback
								 gui); //optional game interface
	return game;
});


window.addEventListener("load", installTicTacToe);// runs when all HTML has loaded

// you should be able to call installTicTacToe manually
//   to install more games in the same window!
