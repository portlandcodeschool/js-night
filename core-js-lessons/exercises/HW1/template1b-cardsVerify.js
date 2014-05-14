// Error-detecting version

function rank(card) {
}

function suit(card) {
}

function cardID(rank,suit) {
}

function color(card) {
}

function name(card) {
}

function precedes(cardA,cardB) {
}

function sameColor(cardA,cardB) {
}

function nextInSuit(cardA) {
}

function prevInSuit(cardB) {
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
// These tests check that invalid arguments produce invalid output.
// They may need rewriting for certain error-reporting schemes.
assert(!rank(52),"Test 26 failed");
assert(!rank("0"),"Test 27 failed");
assert(!rank(-1),"Test 28 failed");
assert(!suit(52),"Test 29 failed");
assert(!suit(false),"Test 30 failed");
assert(!suit(true),"Test 31 failed");
assert(isNaN(cardID(0,1)),"Test 32 failed");
assert(isNaN(cardID("1",1)),"Test 33 failed");
assert(isNaN(cardID(1,5)),"Test 34 failed");
assert(isNaN(cardID(14,1)),"Test 35 failed");
assert((typeof color('apple'))!='string',"Test 36 failed");
assert((typeof name(false))!='string',"Test 37 failed");
assert((typeof precedes(51,52))!='boolean',"Test 38 failed");
assert((typeof precedes(-1,0)),"Test 39 failed");
assert((typeof sameColor("0","1"))!='boolean',"Test 40 failed");
assert(isNaN(nextInSuit(52)),"Test 41 failed");
assert(isNaN(prevInSuit(52)),"Test 42 failed");
