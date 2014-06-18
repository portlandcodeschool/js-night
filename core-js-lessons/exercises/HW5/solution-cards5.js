/* This version includes only the minimal changes needed 
from the solutions of previous weeks.

A more refined version is in solution2-cards5.js,
which will be posted shortly.
*/


var Card = (function () { //begin IIFE...

//-----------------
// Main constructor:
//-----------------
	function Card(id) {
		if (!isValid(id,0,51))
			delete this.id; // make sure it doesn't look like card
		else
			this.id = id;
	};

//-----------------------
// Internal helper fns:
//-----------------------

    function isInteger(n) {
		return (typeof n === 'number') &&
			(n%1 === 0);
	};

// isValid could be linked as an instance method, but it isn't intended for public use.
// Keeping it factory-callable (by not using 'this') allows its use without having any instances
	var isValid = function(num,low,high) { // Returns--> NaN, true
			if ((typeof num)!="number") //wrong type
				return NaN;
			if (!isInteger(num)) //non-integer
				return NaN;
			if (num<low || num>high) //out of range
				return NaN;
			return true;
		};

// Not foolproof, but a basic check for cardness:
	var isCard = function(card) {
		return card &&
			(typeof card === 'object') &&
			('id' in card)
	};

//-----------------------------
// Instance methods are attached to prototype
// ('this' means the instance, not the prototype)
//-----------------------------

// cardID isn't needed by instances, who each have an id property,
// but we'll include it for completeness:
	Card.prototype.cardID = function() {
		return this.id;
	};
	Card.prototype.getID = Card.prototype.cardID; //alias


	Card.prototype.rank = function() { // --> 1..13, NaN
		var card = this.id;
		return isValid(card,0,51) &&
			Math.floor(card/4)+1;
	};

	Card.prototype.suit = function() { // --> 1..4, NaN
		var card = this.id;
		return isValid(card,0,51) &&
			(card%4)+1;
	}

	Card.prototype.color = function() { // -->"red,"black",NaN
		var suit=this.suit();
		if (isNaN(suit))
			return NaN;
		return (suit<3)? "red": "black";
	};

	var rankNames = ['','Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
						'Jack','Queen','King'];
	var suitNames = ['','Hearts','Diamonds','Spades','Clubs'];

	// Return to calling method 'name' instead of cardName,
	// since the prototype has no automatic 'name' property:
	Card.prototype.name = function() { //--> string, NaN
		var rank = this.rank();
		var suit = this.suit();
		return rank && suit && (rankNames[rank]+' of '+suitNames[suit]);
	};

	Card.prototype.precedes = function(cardB) { //-->false,true,NaN
	if (!isCard(cardB)) return NaN;
		var diff= cardB.rank()-this.rank();
		if (isNaN(diff))
			return NaN;
		return diff==1 || diff==-12;
	};
	
	Card.prototype.sameColor = function(cardB) { //-->false,true,NaN
		if (!isCard(cardB)) return NaN;
		var colorA=this.color(), colorB=cardB.color();
		if (Number.isNaN(colorA) || Number.isNaN(colorB))
		// must use Number.isNaN() instead of isNaN(), which returns true for non-numeric strings
			return NaN;
		return colorA==colorB;
	};
	
// Ideally, these functions could return a card object instead of just an id,
// but then we'd need a smarter factory which maintains an index of its instances.

	Card.prototype.nextInSuit = function() {//--> 0..51,NaN
		var nextCardID = isValid(this.id,0,51) && this.id+4;
		if (nextCardID>51) nextCardID-=52;
	   return nextCardID;
	};
	
	Card.prototype.prevInSuit = function() {//--> 0..51,NaN
		var prevCardID = isValid(this.id,0,51) && this.id-4;
		if (prevCardID<0) prevCardID+=52;
		return prevCardID;
	};
	
	// Class methods:
	Card.numRanks = function() {
		return 13;
	}
	Card.numSuits = function() {
		return 4;
	}
	Card.numIDs = function() {
		return 52;
	}
	Card.highID = function() {
		return 51;
	}

	return Card; //constructor, producdt of IIFE
})(); //end IIFE and invoke it now!


// Same old testing suite, with calls in new format:
function assert(claim,message) {
	if (!claim) console.error(message);
}


// instances needed for original assertions:
var card0 = new Card(0);
var card1 = new Card(1);
var card2 = new Card(2);
var card3 = new Card(3);
var card5 = new Card(5);
var card48 = new Card(48);
var card50 = new Card(50);
var card51 = new Card(51);



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



