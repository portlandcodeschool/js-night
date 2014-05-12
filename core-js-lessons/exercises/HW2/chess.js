/*
var ymin=0;
var ysize=8;
var ymax=ysize+ymin-1;
var xmin=0;
var xsize=8;
var xmax=xsize+xmin-1;
*/



//=============

function makeSpace(n) {
    var space = {};
    space.n = n;
    space.x = xAtN(n);
    space.y = yAtN(n);
    space.piece='';
    space.isBlack = (space.y%2)? n%2: (n+1)%2;
    return space;
}

function makeBoard() {

    var board = [];
    board.xsize = 8;
    board.ysize = 8;
    for (var i=0; i<64; i++) {
        board[i]=makeSpace(n);
    }
    return board;
}

var board = makeBoard();

makeBoard.makeSpace = function(n) {

// Geometry
function pieceAtN(n) {
    return (board[n].piece);
}
function isValidN(n) {
    return (typeof n==='number' && n>=0 && n<64);
}
function yAtN(n) {
    return Math.floor(n/xsize);
}
function xAtN(n) {
    return n%(xsize);
}
function nAtXY(x,y) {
    return 8*y+x;
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
    var lines = string.split('\n');
    string = lines.join('');
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

/*
function canGoN(fromN) {
    return yAtN(fromN)>ymin;
}
function canGoS(fromN) {
    return yAtN(fromN)<ymax;
}
function canGoW(fromN) {
    return xAtN(fromN)>xmin;
}
function canGoE(fromN) {
    return xAtN(fromN)<xmax;
}

function canGoVert(n,dy) {
    if (dy===0) return true;
    return dy<0? canGoN(n):canGoS(n);
}
function canGoHoriz(n,dx) {
    if (dx===0) return true;
    return dx<0? canGoW(n):canGoS(n);
}
 
function goInDir(n,dx,dy) {
    if (canGoVert(n,dy) && canGoHoriz(n,dx))
        return n+dx+(xsize*dy);
    else return;
}

function spacesInDir(here,dx,dy) {
//returns list of all spaces in one dir up to and including first piece found.
    var spaces = [];
    var n=here;
    var piece = false;
    for ( ; isValidN(n=goInDir(n,dx,dy)); ) {
        spaces.push(n);
        if (pieceAtN(n))
            return spaces;
    }
    return spaces;
}

function freeSpacesInDir(here,dx,dy) {
    var spaces = spacesInDir(here,dx,dy);
    if (spaces.length===0)
        return spaces;
    if (pieceAtN(spaces[length-1]))
        spaces.pop();
    return spaces;
}

function containOpponents(n,m) {
    pieceN = pieceAtN(n);
    pieceM = pieceAtM(m);
    if (!pieceN || !pieceM)
        return false;
    NisUpper = ((pieceN.toUpperCase)==pieceN);
    MisUpper = ((pieceM.toUpperCase)==pieceM);
    return (NisUpper !== MisUpper);
}

function firstOpponentSpaceInDir(here,dx,dy) {
    var spaces = spacesInDir(here,dx,dy);
    if (spaces.length===0)
        return;
    var last = spaces[length-1];
    if (containOpponents(here,last))
        return last;
    return;
}

var axialDXs = [0,-1,1,0];
var axialDYs = [-1,0,0,1];
var diagDXs = [-1,1,-1,-1];
var diagDYs = [-1,-1,1,1];

function firstOpponentSpacesInDirSet(here,dxList,dyList) {
    var dx,dy,hit,spaces=[];
    for (var dir=0; dir<4; dir++) {
        dx = dxList[dir];
        dy = dyList[dir];
        hit = firstOpponentSpaceInDir(here,dx,dy);
        if (isValidN(hit))
            spaces.push(hit);
    }
    return spaces;
}

function freeSpacesInDirSet(here,dxList,dyList) {
    var dx,dy,spaces=[];
    for (var dir=0; dir<4; dir++) {
        dx = dxList[dir];
        dy = dyList[dir];
        spaces = spaces.concat(freeSpacesInDir(here,dx,dy));
    }
    return spaces;
}

function bishopCaptures(here) {
    return firstOpponentSpacesInDirSet(here,diagDXs,diagDYs);
}
function rookCaptures(here) {
    return firstOpponentSpacesInDirSet(here,axialDXs,axialDYs);
}
function queenCaptures(here) {
    return bishopCaptures(here).concat(rookCaptures(here));
}

function bishopSpaces(here) {
    return freeSpacesInDirSet(here,diagDXs,diagDYs);
}
function rookSpaces(here) {
    return freeSpacesInDirSet(here,axialDXs,axialDYs);
}
function queenSpaces(here) {
    return bishopSpaces(here).concat(rookSpaces(here));
}
*/

//========= Simpler ==========

function getDelta(fromN,toN) {
    var fromX = xAtN(fromN);
    var fromY = yAtN(fromN);
    var toX = xAtN(toN);
    var toY = yAtN(toN);
    return {dx:(toX-fromX),dy:(toY-fromY)};
}

function isNonzeroDelta(delta) {
    return (delta.dx || delta.dy);
}

function reduceDelta(delta) {
    if (delta.dx>0) delta.dx--;
    else if (delta.dx<0) delta.dx++;
    if (delta.dy>0) delta.dy--;
    else if (delta.dy) delta.dy++;
}

function addDelta(fromN,delta) {
    var fromX = xAtN(fromN), fromY = yAtN(fromN);
    var toX = fromX+delta.dx;
    var toY = fromY+delta.dy;
    return nAtXY(toX,toY);
}

function spacesBetween(fromN,delta) {
    //var delta=getDelta(fromN,toN);
    var result=[];
    if (isDiagonal(delta) || isAxial(delta)) {
        for (reduceDelta(delta); isNonzeroDelta(delta); reduceDelta(delta)) {
            var space = addDelta(fromN,delta);
            result.push(space);
        }
    }
    return result;
}

function spacesAreEmpty(spaces) {
    for (var i=0; i<spaces.length; i++) {
        if (pieceAtN(spaces[i])) return false;
    }
    return true;
}

function emptyBetween(fromN,delta) {
    var spaces = spacesBetween(fromN,delta);
    return spacesAreEmpty(spaces);
}

function isDiagonal(delta) {
    return Math.abs(delta.dx)==Math.abs(delta.dy);
}
function isAxial(delta) {
    return (!delta.dx || !delta.dy);
}
function isL(delta) {
    var dx= Math.abs(delta.dx);
    var dy= Math.abs(delta.dy);
    return (dx===1 || dy===1) &&
            (dx===2 || dy===2);
}
function isRangeOne(delta) {
    var dx= Math.abs(delta.dx);
    var dy= Math.abs(delta.dy);
    var greater = dx>dy? dx:dy;
    return greater===1;
}
function isForward(piece,delta) {
    if (!piece) return false;
    var isUpperTeam = (piece===piece.toUpperCase());
    return isUpperTeam? delta.dy>0: delta.dy<0;
}
    
//function rangeIsClear(fromN,delta) {
    
function pieceColorAtN(fromN) {
    var piece = pieceAtN(fromN);
    if (!piece) return undefined;
    if (piece===piece.toUpperCase())
        return "UP";
    else
        return "DOWN";
}


function canMoveDiagTo(fromN,toN) {
    var delta = getDelta(fromN,toN);
    return isDiagonal(delta) &&
        emptyBetween(fromN,delta) &&
        canOccupyTarget(fromN,toN);
}

function canMoveAxialTo(fromN,toN) {
    var delta = getDelta(fromN,toN);
    return isAxial(delta) &&
        emptyBetween(fromN,delta) &&
        canOccupyTarget(fromN,toN);
}

function canJumpTo(fromN,toN) {
    var delta = getDelta(fromN,toN);
    return isL(delta) &&
        canOccupyTarget(fromN,toN);
}

function canOccupyTarget(fromN,toN) {
    var colorHere = pieceColorAtN(fromN);
    var colorThere= pieceColorAtN(toN);
    if (!colorHere) return false;
    if (!colorThere) return true;
    if (colorHere==colorThere) return false;
    return pieceAtN(toN);
}

//====
board.canMoveB = function(fromN,toN) {
    return canMoveDiagTo(fromN,toN);
}

board.canMoveR = function(fromN,toN) {
    return canMoveAxialTo(fromN,toN);
}

board.canMoveQ = function(fromN,toN) {
    return canMoveDiagTo(fromN,toN) || canMoveAxialTo(fromN,toN);
}

board.canMoveN = function(fromN,toN) {
    return canJumpTo(fromN,toN);
}

board.canMoveK = function(fromN,toN) {
    var delta= getDelta(fromN,toN);
    return isRangeOne(delta) &&
        canOccupyTarget(fromN,toN);
}

board.canMoveP = function(fromN,toN) {
    var delta = getDelta(fromN,toN);
    if (!isRangeOne(delta))
        return false;
    if (!isForward(pieceAtN(fromN),delta))
        return false;
    var canOccupy = canOccupyTarget(fromN,toN);
    if (isAxial(delta) && canOccupy===true)
        return true;
    if (isDiagonal(delta) && (typeof canOccupy==='string'))
        return canOccupy;
    return false;
}

function canMove(fromN,toN) {
    var piece = pieceAtN(fromN);
    if (!piece) return false;
    var fnName = "canMove"+piece.toUpperCase();
    return board[fnName](fromN,toN);
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
/*
canMove(9,17);//true
canMove(9,18);//'p'
canMove(10,18);//false
canMove(18,9);//'P'
canMove(18,10);//false
canMove(18,11);//false
canMove(18,27);//false
canMove(27,18);//'p'
canMove(27,19);//true
canMove(27,28);//false
canMove(28,30);//false
canMove(28,10);//false
canMove(28,49);//'q'
canMove(28,56);//false
canMove(49,28);//'B'
canMove(49,9);//'P'
canMove(49,54);//'N'
canMove(49,7);//false
canMove(49,10);//false
canMove(54,60);//true
canMove(54,62);//false
canMove(62,54);//'N'
canMove(61,63);//false
canMove(61,54);//false
canMove(61,5);//true
*/