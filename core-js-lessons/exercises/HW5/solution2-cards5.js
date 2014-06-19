/* In addition to repackaging the card functions using constructors and prototypes,
	this version makes some additional refinements which HW5 did not require.
	These changes include:
	1) protecting a card's id field as a private variable
		with a public getter but no setter;
	2) Removing the hard-wired 'magic numbers' specific to a 52-card deck
		from the functions' logic and into easily-changeable constants.

*/

var Card = (function() {
	// basic constants:
	var lowID = 0;
	var lowRank = 1;
	var lowSuit = 1;
	var numRanks = 13;
	var numSuits = 4;
	// derived constants:
	var numIDs = numRanks*numSuits;
	var highID = numIDs + lowID - 1;
	var highRank = numRanks + lowRank - 1;
	var highSuit = numSuits + lowSuit - 1;

	// name arrays don't need initial offset anymore:
	var rankNames = ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
						'Jack','Queen','King'];
	var suitNames = ['Hearts','Diamonds','Spades','Clubs'];
	// color() presumes red suits are first

	// Internal validation functions:
	function isValid(num,low,high) {
		if ((typeof num)!="number") //wrong type
			return NaN;
		if (num%1 != 0)  //non-integer
			return NaN;
		if (num<low || num>high) //out of range
			return NaN;
		return true;
	};

	function isValidID(num) {
		return isValid(num,lowID,highID)
	};
	function isValidRank(num) {
		return isValid(num,lowRank,highRank);
	};
	function isValidSuit(num) {
		return isValid(num,lowSuit,highSuit);
	};

	//------------
	// Constructor
	// -----------
	function Card(id) {
		// Instance needs only one property: a getter fn for private id
		this.getID = function() {return id;}
		// Everything else can be inherited from Card.prototype
	}

	// -------------
	// Class methods
	// -------------

	Card.isCard = function(obj) {
		return (obj instanceof Card) &&
			isValidID(obj.getID());
	}
	Card.cardRank = function(id) {
		return isValidID(id) && 
				Math.floor((id-lowID)/numSuits) + lowRank;
	}
	Card.cardSuit = function(id) {
		return isValidID(id) &&
				((id-lowID) % (numSuits)) + lowSuit;
	}
	Card.cardID = function(rank,suit) {
		return isValidRank(rank) &&
				isValidSuit(suit) &&
				(rank-lowRank)*numSuits + (suit-lowSuit) + lowID;
	}
	Card.cardName = function(id) {
		var rank = Card.cardRank(id);
		var suit = Card.cardSuit(id);
		return isValidRank(rank) && isValidSuit(suit) &&
			(rankNames[rank-lowRank]+' of '+suitNames[suit-lowSuit]);
	}

	//---------------
	// Shared prototype/inherited methods
	//---------------

	// Some use the class methods:
	Card.prototype.isCard = function() {
		return Card.isCard(this);
	}

	Card.prototype.rank = function() {
		return Card.cardRank(this.getID());
	}

	Card.prototype.suit = function() {
		return Card.cardSuit(this.getID());
	}

	Card.prototype.name = function() {
		return Card.cardName(this.getID());
	}

	// Some could also be class methods themselves:
	Card.prototype.color = function() {
		var suit = this.suit();
		if (isNaN(suit))
			return NaN;
		return (suit < ((numSuits/2)+lowSuit))? "red": "black";
	}

	Card.prototype.precedes = function(cardB) { //-->false,true,NaN
	if (!Card.isCard(cardB)) return NaN;
		var diff= cardB.rank()-this.rank();
		if (isNaN(diff))
			return NaN;
		return (diff==1 || diff == 1-numRanks);
	};

	Card.prototype.sameColor = function(cardB) { //-->false,true,NaN
		if (!Card.isCard(cardB)) return NaN;
		var colorA=this.color(), colorB=cardB.color();
		if (Number.isNaN(colorA) || Number.isNaN(colorB))
		// must use Number.isNaN() instead of isNaN(), which returns true for non-numeric strings
			return NaN;
		return colorA==colorB;
	};
	
// Ideally, these functions could return a card object instead of just an id,
// but then we'd need a smarter factory which maintains an index of its instances.

	Card.prototype.nextInSuit = function() {//--> 0..51,NaN
		var nextCardID = this.getID()+numSuits;
		if (nextCardID>highID) nextCardID -= numIDs;
	   return nextCardID;
	};
	
	Card.prototype.prevInSuit = function() {//--> 0..51,NaN
		var prevCardID = this.getID()-numSuits;
		if (prevCardID<lowID) prevCardID += numIDs;
		return prevCardID;
	};
	
	return Card;
})();



// Same old testing suite, with some calls in new format:
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
assert(card0.getID()===0,"Test 7 failed");
assert(card51.getID()===51,"Test 8 failed");

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

assert((typeof card51.precedes(52))!='boolean',"Test 38 failed");
assert((typeof card0.precedes(null))!='boolean',"Test 39 failed");
assert((typeof card0.sameColor("1"))!='boolean',"Test 40 failed");

// Some optional card validity tests:
var badCard52 = new Card(52);
var badCard0 = new Card('0');
var badCard1 = new Card(-1);
// The homework didn't ask for a method isCard, so don't worry if
// you don't have one implemented:
assert(!badCard52.isCard(),"Test 26 failed");
assert(!badCard0.isCard(),"Test 27 failed");
assert(!badCard1.isCard(),"Test 28 failed");

// Proof that methods are shared:
assert(card0 !== card1, "Test 50 failed"); //first prove different cards
assert(card0.rank === card1.rank, "Test 51 failed");
assert(card0.suit === card1.suit, "Test 52 failed");
assert(card0.name === card1.name, "Test 53 failed");
//etc...



