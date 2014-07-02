var http = require('http');
var url = require('url');
var TicTacToe = require('./tictactoe-module');


var footer = '';
function sayWinner(trio) {
	footer = trio.winner + ' wins!';
}
var game = new TicTacToe(sayWinner);
//console.log(game.show());


var server = http.createServer(function (req,res) {
	var pathRequested= url.parse(req.url, true).pathname;
	var symbol = pathRequested.slice(1);
	var queryParam = url.parse(req.url, true).query;
	var coordX = parseInt(queryParam.x, 10);
	var coordY = parseInt(queryParam.y, 10);
	var allParams = Object.keys(queryParam);
	var unknowns = allParams.filter(function(key) {
			return (key!=='X') && (key!=='O') && (key!=='clear');
		});
	var trio = unknowns[0];
	if (trio) {
		symbol=trio[0];
		coordX=trio[1];
		coordY=trio[2];
	}

	console.log(queryParam);
	console.log(pathRequested);

	if (req.method === 'GET') {
		res.statusCode = 200;
		res.writeHead({'Content-Type': 'text/plain'});
		switch (symbol) {
			case 'X':
				game.placeX(coordX,coordY);
				break;
			case 'O':
				game.placeO(coordX,coordY);
				break;
			case 'clear':
				game.clear();
		}
		res.end(game.show()+'\n'+footer);
	} else {
		res.statusCode = 400;
		res.end('I have no idea what you mean.');
	};
});


console.log("listening on localhost, port 3000");
server.listen(3000);
