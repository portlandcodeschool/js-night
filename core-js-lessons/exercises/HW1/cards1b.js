// Error-detecting version

// Helper function:
function isValid(num,low,high) { // Returns--> NaN, true
    if ((typeof num)!="number") //wrong type
        return NaN;
    if (!Number.isInteger(num)) //non-integer
        return NaN;
    if (num<low || num>high) //out of range
        return NaN;
    return true;
}

// Exercises:
function rank(card) { // --> 1..13, NaN
    return isValid(card,0,51) &&
        Math.floor(card/4)+1;
}

function suit(card) { // --> 1..4, NaN
    return isValid(card,0,51) &&
        (card%4)+1;
}

function cardID(rank,suit) { // --> 0..51, NaN
    return isValid(rank,1,13) &&
            isValid(suit,1,4) &&
            ((rank-1)*4 + (suit-1));
}
function color(card) { // -->"red,"black",NaN
    var theSuit=suit(card);
    if (isNaN(theSuit))
        return NaN;
    return (theSuit<3)? "red": "black";
}

var rankNames = ['','Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
                'Jack','Queen','King'];
var suitNames = ['','Hearts','Diamonds','Spade','Clubs'];

function name(card) { //--> string, NaN
    var theRank = rank(card);
    var theSuit = suit(card);
    return theRank && theSuit && (rankNames[theRank]+' of '+suitNames[theSuit]);
}

function precedes(cardA,cardB) { //-->false,true,NaN
    var diff= rank(cardB)-rank(cardA);
    if (isNaN(diff))
        return NaN;
    return diff==1 || diff==-12;
}
function sameColor(cardA,cardB) { //-->false,true,NaN
    var colorA=color(cardA), colorB=color(cardB);
    if (Number.isNaN(colorA) || Number.isNaN(colorB))
        // must use Number.isNaN() instead of isNaN(), which returns true for non-numeric strings
        return NaN;
    return colorA==colorB;
}
function nextInSuit(cardA) {//--> 0..51,NaN
    nextCard = isValid(cardA,0,51) && cardA+4;
    if (nextCard>51) nextCard-=52;
    return nextCard;
}
function prevInSuit(cardB) {//--> 0..51,NaN
    prevCard = isValid(cardB,0,51) && cardB-4;
    if (prevCard<0) prevCard+=52;
    return prevCard;
}


// TESTING:
function assert(claim,message) {
    if (!claim) console.error(message);
}
assert(rank(0)===1,"Test 1 failed");
assert(rank(3)===1,"Test 2 failed");
assert(rank(51)===13,"Test 3 failed");
assert(suit(0)===1,"Test 4 failed");
assert(suit(5)===2,"Test 5 failed");
assert(suit(51)===4,"Test 6 failed");
assert(cardID(1,1)===0,"Test 7 failed");
assert(cardID(13,4)===51,"Test 8 failed");
assert(cardID(8,3)===30,"Test 9 failed");
assert(color(0)==='red',"Test 10 failed");
assert(color(2)==='black',"Test 11 failed");
assert(name(5)==='Two of Diamonds',"Test 12 failed");
assert(name(51)==='King of Clubs',"Test 13 failed");
assert(!precedes(0,1),"Test 14 failed");
assert(precedes(0,5),"Test 15 failed");
assert(precedes(51,0),"Test 16 failed");
assert(precedes(50,2),"Test 17 failed");
assert(sameColor(0,1),"Test 18 failed");
assert(!sameColor(1,2),"Test 19 failed");
assert(nextInSuit(0)===4,"Test 20 failed");
assert(nextInSuit(51)===3,"Test 21 failed");
assert(nextInSuit(48)===0,"Test 22 failed");
assert(prevInSuit(0)===48,"Test 23 failed");
assert(prevInSuit(3)===51,"Test 24 failed");
assert(prevInSuit(5)===1,"Test 25 failed");

// Extra testing!
assert(!rank(52),"Test 26 failed");
assert(!rank("0"),"Test 27 failed");
assert(!rank(-1),"Test 28 failed");
assert(!suit(52),"Test 29 failed");
assert(!suit(false),"Test 30 failed");
assert(!suit(true),"Test 31 failed");
assert(!cardID(0,1),"Test 32 failed");
assert(!cardID("1",1),"Test 33 failed");
assert(!cardID(1,5),"Test 34 failed");
assert(!cardID(14,1),"Test 35 failed");
assert(!color('apple'),"Test 36 failed");
assert(!name(false),"Test 37 failed");
assert(!precedes(51,52),"Test 38 failed");
assert(!precedes(-1,0),"Test 39 failed");
assert(!sameColor("0","1"),"Test 40 failed");
assert(!nextInSuit(52),"Test 41 failed");
assert(!prevInSuit(52),"Test 42 failed");
