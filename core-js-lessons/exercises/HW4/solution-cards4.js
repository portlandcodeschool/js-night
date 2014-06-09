var makeCard = (function () {


//-----------------------
// Methods to be called through factory:
//-----------------------

// isValid could be linked as an instance method, but it isn't intended for public use.
// Keeping it factory-callable (by not using 'this') allows its use without having any instances
    var isValid = function(num,low,high) { // Returns--> NaN, true
            if ((typeof num)!="number") //wrong type
                return NaN;
            if (!Number.isInteger(num)) //non-integer
                return NaN;
            if (num<low || num>high) //out of range
                return NaN;
            return true;
        };

// Not foolproof, but a basic check for cardness:
    var isCard = function(card) {
        return card && (typeof card === 'object') && ('id' in card);
    }

//-----------------------------
// Methods called though instances (where 'this' means the instance):
//-----------------------------

// cardID isn't needed by instances, who each have an id property,
// but we'll include it for completeness:
    var cardID = function() {
        return this.id;
    };


    var rank = function() { // --> 1..13, NaN
        var card = this.id;
        return isValid(card,0,51) &&
            Math.floor(card/4)+1;
    };

    var suit = function() { // --> 1..4, NaN
        var card = this.id;
        return isValid(card,0,51) &&
            (card%4)+1;
    };
   
    var color = function() { // -->"red,"black",NaN
        var suit=this.suit();
        if (isNaN(suit))
            return NaN;
        return (suit<3)? "red": "black";
    };

    var rankNames = ['','Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
                        'Jack','Queen','King'];
    var suitNames = ['','Hearts','Diamonds','Spades','Clubs'];

    var cardName = function() { //--> string, NaN
        var rank = this.rank();
        var suit = this.suit();
        return rank && suit && (rankNames[rank]+' of '+suitNames[suit]);
    };

    var precedes = function(cardB) { //-->false,true,NaN
    if (!isCard(cardB)) return NaN;
        var diff= cardB.rank()-this.rank();
        if (isNaN(diff))
            return NaN;
        return diff==1 || diff==-12;
    };
    
    var sameColor = function(cardB) { //-->false,true,NaN
    if (!isCard(cardB)) return NaN;
        var colorA=this.color(), colorB=cardB.color();
        if (Number.isNaN(colorA) || Number.isNaN(colorB))
        // must use Number.isNaN() instead of isNaN(), which returns true for non-numeric strings
            return NaN;
        return colorA==colorB;
    };
    
// Ideally, these functions could return a card object instead of just an id,
// but then we'd need a smarter factory which maintains an index of its instances.

    var nextInSuit = function() {//--> 0..51,NaN
        var nextCardID = isValid(this.id,0,51) && this.id+4;
        if (nextCardID>51) nextCardID-=52;
        return nextCardID;
    };
    
    var prevInSuit = function() {//--> 0..51,NaN
        var prevCardID = isValid(this.id,0,51) && this.id-4;
        if (prevCardID<0) prevCardID+=52;
        return prevCardID;
    };

    function makeCard(id) {
        if (!isValid(id,0,51))
            return null;
        return {id:id,
            cardID : cardID,
            getID : cardID, //alias same method with better name 'getID'
            rank : rank,
            suit : suit,
            color: color,
            name : cardName, //NOTE: functions have a built-in property 'name',
        //so you'll need a different key (e.g. cardName) for the factory method
            precedes :  precedes,
            sameColor:  sameColor,
            nextInSuit: nextInSuit,
            prevInSuit: prevInSuit
        };
    };

    return makeCard;
})(); //end IIFE


// Same old testing suite, with calls in new format:
function assert(claim,message) {
    if (!claim) console.error(message);
}


// instances needed for original assertions:
var card0 = makeCard(0);
var card1 = makeCard(1);
var card2 = makeCard(2);
var card3 = makeCard(3);
var card5 = makeCard(5);
var card48 = makeCard(48);
var card50 = makeCard(50);
var card51 = makeCard(51);



assert(card0.rank()===1,"Test 1 failed");
assert(card3.rank()===1,"Test 2 failed");
assert(card51.rank()===13,"Test 3 failed");
assert(card0.suit()===1,"Test 4 failed");
assert(card5.suit()===2,"Test 5 failed");
assert(card51.suit()===4,"Test 6 failed");
assert(card0.cardID()===0,"Test 7 failed");
assert(card51.cardID()===51,"Test 8 failed");

assert(card0.color()==='red',"Test 10 failed");
assert(card2.color()==='black',"Test 11 failed");
assert(card5.name()==='Two of Diamonds',"Test 12 failed");
assert(card51.name()==='King of Clubs',"Test 13 failed");
assert(!card0.precedes(card1),"Test 14 failed");
assert(card0.precedes(card5),"Test 15 failed");
assert(card51.precedes(card0),"Test 16 failed");
assert(card50.precedes(card2),"Test 17 failed");
assert(card0.sameColor(card1),"Test 18 failed");
assert(!card1.sameColor(card2),"Test 19 failed");
assert(card0.nextInSuit()===4,"Test 20 failed");
assert(card51.nextInSuit()===3,"Test 21 failed");
assert(card48.nextInSuit()===0,"Test 22 failed");
assert(card0.prevInSuit()===48,"Test 23 failed");
assert(card3.prevInSuit()===51,"Test 24 failed");
assert(card5.prevInSuit()===1,"Test 25 failed");

// Some of the original argument validity tests...
assert(!makeCard(52),"Test 26 failed");
assert(!makeCard("0"),"Test 27 failed");
assert(!makeCard(-1),"Test 28 failed");

assert(!makeCard(false),"Test 30 failed");
assert(!makeCard(true),"Test 31 failed");

assert((typeof card51.precedes(52))!='boolean',"Test 38 failed");
assert((typeof card0.precedes(null))!='boolean',"Test 39 failed");
assert((typeof card0.sameColor("1"))!='boolean',"Test 40 failed");


// Proof that methods are shared:
assert(card0 !== card1, "Test 50 failed"); //first prove different cards
assert(card0.rank === card1.rank, "Test 51 failed");
assert(card0.suit === card1.suit, "Test 52 failed");
assert(card0.name === card1.name, "Test 53 failed");
//etc...



