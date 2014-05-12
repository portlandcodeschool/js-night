//=============
var chess = {
    xAtN: function(n) {
        return n%8;
    },
    
    yAtN: function(n) {
        return Math.floor(n/8);
    },
    
    nAtXY: function(x,y) {
        return 8*y+x;
    },
    
    isValidN: function(n) {
        return (typeof n==='number' && n>=0 && n<64);
    },
    
    makeSpace: function(n) {
        var space = {};
        space.n = n;
        space.x = this.xAtN(n);
        space.y = this.yAtN(n);
        space.piece='';
        space.isBlack = (space.y%2)? n%2: (n+1)%2;
        return space;
    },

    makeBoard: function() {
        var board = [];
        //board.xsize = 8;
        //board.ysize = 8;
        for (var n=0; n<64; n++) {
            board[n]=this.makeSpace(n);
        }
        return board;
    }
}

var board = chess.makeBoard();

// Part II: Pieces, Input/Output
chess.pieceColor = function(piece) {
    if (!piece) return undefined;
    return piece===piece.toUpperCase()? "UP": "DOWN";
}

board.pieceAtN = function(n) {
    return (board[n].piece);
}

board.pieceColorAtN = function(fromN) {
    var piece = this.pieceAtN(fromN);
    return chess.pieceColor(piece);
}


// input/output:    
board.load = function (input) {
    var pairs = input.split(' ');
    for (var i=0; i<pairs.length; i++) {
        var pair = pairs[i].split(':');
        var piece = pair[1];
        var n = pair[0];
        this[n].piece = piece;
    }
    return i;
}
board.save = function () {
    var pairs=[];
    for (var i=0; i<64; i++) {
        var piece = this[i].piece;
        if (piece) {
            pairs.push(i+':'+piece);
        }
    }
    return pairs.join(' ');
}

board.scan = function (string) {
    //remove newlines
    string = string.replace(/\n/g,'');
    //OR :
    //string = string.split('\n').join('');
    for (i=0; i<64; i++) {
        var piece = string[i];
        if (piece==='.' || piece===',')
            piece = '';
       this[i].piece = piece;
    }
}

board.show = function() {
    var str='';
    for (i=0; i<64; i++) {
        var space= this[i];
        var char = (space.piece ||
            (space.isBlack ? '.' : ','));
        str+=char;
        if ((i%8)===7)
            str+='\n';
    }
    return str;
}


chess.makeDelta = function(fromN,toN) {
    var fromX = this.xAtN(fromN);
    var fromY = this.yAtN(fromN);
    var toX = this.xAtN(toN);
    var toY = this.yAtN(toN);
    return {dx:(toX-fromX),dy:(toY-fromY)};
}

chess.isNonzeroDelta = function(delta) {
    return (delta.dx || delta.dy);
}

chess.reduceDelta = function(delta) {
    if (delta.dx>0) delta.dx--;
    else if (delta.dx<0) delta.dx++;
    if (delta.dy>0) delta.dy--;
    else if (delta.dy) delta.dy++;
}

chess.nPlusDelta = function(fromN,delta) {
    var fromX = this.xAtN(fromN);
    var fromY = this.yAtN(fromN);
    var toX = fromX+delta.dx;
    var toY = fromY+delta.dy;
    return this.nAtXY(toX,toY);
}

chess.spacesBetween = function(fromN,delta) {
    //maybe copy delta first?
    var result=[];
    if (this.isDiagonal(delta) || this.isAxial(delta)) {
        for (this.reduceDelta(delta); this.isNonzeroDelta(delta); this.reduceDelta(delta)) {
            var space = this.nPlusDelta(fromN,delta);
            result.push(space);
        }
    }
    return result;
}

board.spacesAreEmpty = function(spaces) {
    for (var i=0; i<spaces.length; i++) {
        if (this.pieceAtN(spaces[i])) return false;
    }
    return true;
}

board.emptyBetween = function(fromN,delta) {
    var spaces = chess.spacesBetween(fromN,delta);
    return this.spacesAreEmpty(spaces);
}

chess.isDiagonal = function(delta) {
    return Math.abs(delta.dx)===Math.abs(delta.dy);
}
chess.isAxial = function(delta) {
    return (!delta.dx || !delta.dy);
}
chess.isL = function(delta) {
    var dx= Math.abs(delta.dx);
    var dy= Math.abs(delta.dy);
    return (dx===1 || dy===1) &&
            (dx===2 || dy===2);
}
chess.isRangeOne = function(delta) {
    var dx= Math.abs(delta.dx);
    var dy= Math.abs(delta.dy);
    var greater = dx>dy? dx:dy;
    return greater===1;
}

chess.isForward = function(piece,delta) {
    if (!piece) return false;
    var color = this.pieceColor();
    return color==='UP'? delta.dy>0: delta.dy<0;
}

board.canOccupyTarget = function(fromN,toN) {
    var colorHere = this.pieceColorAtN(fromN);
    var colorThere= this.pieceColorAtN(toN);
    if (!colorHere) return false;
    if (!colorThere) return true;
    if (colorHere===colorThere) return false;
    return this.pieceAtN(toN);
}

// Check moves
board.canMoveDiagTo = function(fromN,toN) {
    var delta = chess.makeDelta(fromN,toN);
    return chess.isDiagonal(delta) &&
        this.emptyBetween(fromN,delta) &&
        this.canOccupyTarget(fromN,toN);
}

board.canMoveAxialTo = function(fromN,toN) {
    var delta = chess.makeDelta(fromN,toN);
    return chess.isAxial(delta) &&
        this.emptyBetween(fromN,delta) &&
        this.canOccupyTarget(fromN,toN);
}

board.canJumpTo = function(fromN,toN) {
    var delta = chess.makeDelta(fromN,toN);
    return chess.isL(delta) &&
        this.canOccupyTarget(fromN,toN);
}

//====
board.canMoveB = function(fromN,toN) {
    return this.canMoveDiagTo(fromN,toN);
}

board.canMoveR = function(fromN,toN) {
    return this.canMoveAxialTo(fromN,toN);
}

board.canMoveQ = function(fromN,toN) {
    return this.canMoveDiagTo(fromN,toN) || this.canMoveAxialTo(fromN,toN);
}

board.canMoveN = function(fromN,toN) {
    return this.canJumpTo(fromN,toN);
}

board.canMoveK = function(fromN,toN) {
    var delta= chess.makeDelta(fromN,toN);
    return chess.isRangeOne(delta) &&
        this.canOccupyTarget(fromN,toN);
}

board.canMoveP = function(fromN,toN) {
    var delta = chess.makeDelta(fromN,toN);
    if (!chess.isRangeOne(delta))
        return false;
    if (!chess.isForward(this.pieceAtN(fromN),delta))
        return false;
    var canOccupy = this.canOccupyTarget(fromN,toN);
    if (chess.isAxial(delta) && canOccupy===true)
        return true;
    if (chess.isDiagonal(delta) && (typeof canOccupy==='string'))
        return canOccupy;
    return false;
}

board.canMove = function(fromN,toN) {
    if (!chess.isValidN(toN))
        return false;
    var piece = this.pieceAtN(fromN);
    if (!piece) return false;
    var fnName = "canMove"+piece.toUpperCase();
    return this[fnName](fromN,toN);
}

var setupStr =
//UPPERS:
"0:R 1:N 2:B 3:K 4:Q 5:B 6:N 7:R "+
"8:P 9:P 10:P 11:P 12:P 13:P 14:P 15:P "+
//lowers: 
"48:p 49:p 50:p 51:p 52:p 53:p 54:p 55:p "+
"56:r 57:n 58:b 59:k 60:q 61:b 62:n 63:r";

var setupScan = 
"RNBKQBNR\n"+
"PPPPPPPP\n"+
"........\n"+
"........\n"+
"........\n"+
"........\n"+
"pppppppp\n"+
"rnbkqbnr\n";

//board.load(setupStr);

//canMove(6,21)
//canMove(6,23)

var testingStr =
"9:P 10:P 18:p 27:K 28:B 49:q 54:N 61:r 62:k";

var testingScan =
"........\n"+
".PP.....\n"+
"..p.....\n"+
"...KB...\n"+
"........\n"+
"........\n"+
".q....N.\n"+
".....rk.\n";

board.scan(testingScan);

//TESTING:
function assert(claim,message) {
    if (!claim) console.error(message);
}

assert(board.canMove(9,17)===true,  "Failed Move Test #1");
assert(board.canMove(9,18)==='p',   "Failed Move Test #2");
assert(board.canMove(10,18)===false,"Failed Move Test #3");
assert(board.canMove(18,9)==='P',   "Failed Move Test #4");
assert(board.canMove(18,10)===false,"Failed Move Test #5");
assert(board.canMove(18,11)===false,"Failed Move Test #6");
assert(board.canMove(18,27)===false,"Failed Move Test #7");
assert(board.canMove(27,18)==='p',  "Failed Move Test #8");
assert(board.canMove(27,19)===true, "Failed Move Test #9");
assert(board.canMove(27,28)===false,"Failed Move Test #10");
assert(board.canMove(28,30)===false,"Failed Move Test #11");
assert(board.canMove(28,10)===false,"Failed Move Test #12");
assert(board.canMove(28,49)==='q',  "Failed Move Test #13");
assert(board.canMove(28,56)===false,"Failed Move Test #14");
assert(board.canMove(49,28)==='B',  "Failed Move Test #15");
assert(board.canMove(49,9)==='P',   "Failed Move Test #16");
assert(board.canMove(49,54)==='N',  "Failed Move Test #17");
assert(board.canMove(49,7)===false, "Failed Move Test #18");
assert(board.canMove(49,10)===false,"Failed Move Test #19");
assert(board.canMove(54,60)===true, "Failed Move Test #20");
assert(board.canMove(54,62)===false,"Failed Move Test #21");
assert(board.canMove(62,54)==='N',  "Failed Move Test #22");
assert(board.canMove(61,63)===false,"Failed Move Test #23");
assert(board.canMove(61,54)===false,"Failed Move Test #24");
assert(board.canMove(61,5)===true,  "Failed Move Test #25");
