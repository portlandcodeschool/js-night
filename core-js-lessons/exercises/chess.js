var ymin=0;
var ysize=8;
var ymax=ysize+ymin-1;
var xmin=0;
var xsize=8;
var xmax=xsize+xmin-1;

function nToY(n) {
    return Math.floor(n/xsize);
}
function nToX(n) {
    return n%(xsize);
}
function canGoN(fromN) {
    return nToY(fromN)>ymin;
}
function canGoS(fromN) {
    return nToY(fromN)<ymax;
}
function canGoW(fromN) {
    return nToX(fromN)>xmin;
}
function canGoE(fromN) {
    return nToX(fromN)<xmax;
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
function pieceAtN(n) {
    return (square(n).piece);
}
function validN(n) {
    return (typeof n==='number' && n>=1 && n<=64);
}

function spacesInDir(here,dx,dy) {
//returns list of all spaces in one dir up to and including first piece found.
    var spaces = [];
    var n=here;
    var piece = false;
    for ( ; validN(n=goInDir(n,dx,dy)); ) {
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
    NisUpper = ((pieceN.toUpper)==pieceN);
    MisUpper = ((pieceM.toUpper)==pieceM);
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
        if (validN(hit))
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

//========= Simpler ==========
function canMove(fromN,toN) {
    var piece = pieceAtN(fromN);
    if (piece)
        var fnName = "canMove"+piece.toUpper();
    return board[fnName](fromN,toN);
}

function getDelta(fromN,toN) {
    var fromX = NtoX(fromN), fromY = NtoY(fromN);
    var toX = NtoX(toN), toY = NtoY(toN);
    return [toX-fromX,toY-fromY];
}
    
function isDiagonal(delta) {
    return Math.abs(delta[0])==Math.abs(delta[1]);
}
function isAxial(delta) {
    return (!delta[0] || !delta[1]);
}
function isL(delta) {
    var dx= Math.abs(delta[0]);
    var dy= Math.abs(delta[1]);
    return (dx===1 || dy===1) &&
            (x===2 || dy===2);
}
function isRangeOne(delta) {
    var dx= Math.abs(delta[0]);
    var dy= Math.abs(delta[0]);
    var greater = dx>dy? dx:dy;
    return greater===1;
}
function isForward(piece,delta) {
    if (!piece) return false;
    var isUpperTeam = (piece===piece.upcase());
    return isUpperTeam? delta[1]>0: delta[1]<0;
}
    

function canMoveB(fromN,toN) {
    var delta = getDelta(fromN,toN);
    var plausible = isDiagonal(delta);
    
    