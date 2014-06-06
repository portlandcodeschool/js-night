// Full version of deque factory, including parts a), e) ,and f)

function makeDeque(values) {
	deque = {
		array  : values.slice(), //copies values array
		absent  : [],// part f)
		readmit : makeDeque.readmit, //part f)
		top : makeDeque.top,
		bottom : makeDeque.bottom,
		push : makeDeque.push,
		pop : makeDeque.pop,
		shift : makeDeque.shift,
		unshift : makeDeque.unshift,
		sort : makeDeque.sort,
		cut : makeDeque.cut,
		map : makeDeque.map,
		shuffle : makeDeque.shuffle, //part e)
	};
	return deque;
}

// Instance methods ('this' means deque instance):

makeDeque.readmit = function(val) { // part f) only...
	var foundAt = this.absent.indexOf(val);
	if (foundAt < 0) return false;
	// else found; excise from absent array
	this.absent.splice(foundAt,1);
	return true;
}

makeDeque.top = function() {
	return this.array[this.array.length-1];  // may be undef if len 0
}

makeDeque.bottom = function() {
	return this.array[0]; //may be undef if len 0
}

makeDeque.pop = function() {
	var val = this.array.pop();
	if (val !== undefined)
		this.absent.push(val);  //part f)
	return val;
}

makeDeque.push = function(val) {
	return this.readmit(val) && //part f)
		this.array.push(val);
}

makeDeque.shift = function() {
	var val = this.array.shift();
	if (val !== undefined)
		this.absent.push(val); //part f)
	return val;
}

makeDeque.unshift = function(val) {
	return this.readmit(val) && //part f)
		this.array.unshift(val);
}

makeDeque.sort = function(sortFn) {
	return this.array.sort(sortFn);
}

makeDeque.cut = function(offset) {  // returns non-zero integer if success, else false
	if (!offset || (typeof offset !== 'number'))
		offset=0;
	offset = Math.floor(offset);  //ensure integer

	var fullLen = this.array.length;
	var headLen = Math.floor(fullLen / 2) + offset;
	if (headLen <= 0) return false;  		// no head, therefore no change
	if (headLen >= fullLen) return false; 	// no tail, therefore no change

	var tail = this.array.splice(headLen,fullLen);  //remove tail from array
	this.array = tail.concat(this.array);  //swap tail and remaining head
	return tail.length; //returns # elements moved from upper half to lower (>0)
}

makeDeque.map = function(convertFn) {
	return this.array.map(convertFn);
}

makeDeque.shuffle = function () {
	// Knuth-Fisher-Yates, modified from http://bost.ocks.org/mike/shuffle/
	var end = this.array.length, temp, i;

  	// While there remain elements to shuffle…
  	while (end>1) {

    	// Pick a remaining element…
    	i = Math.floor(Math.random() * end--);

    	// And swap it with the current element.
    	temp = this.array[end];
    	this.array[end] = this.array[i];
    	this.array[i] = temp;
  	}
  	// always successful; no return val needed
}
// Part b)

function make52Cards() {
	var result = [];
	for (var i=0 ; i<52; i++) {
		result.push(makeCard(i));
	}
	return result;
}
var someCards = make52Cards();



// Part c)
function assert(claim,warning) {
	if (!claim) console.log(warning);
}


var deckOfCards = makeDeque(someCards);
function compareByCardID(cardA,cardB) {return cardA.id - cardB.id};
deckOfCards.sort(compareByCardID);
deckOfCards.cut(1);
assert(deckOfCards.top().name() === 'Seven of Spades', 'Failed Seven of Spades test');
// Original assertion in HW3 said "Ace of Spades", which was incorrect for the described sort and cut.
// My mistake, sorry! --Dan

function compareByCardName(cardA,cardB) {return (cardA.name() < cardB.name()) ? -1 : 1};
deckOfCards.sort(compareByCardName);
assert(deckOfCards.bottom().name() === 'Ace of Clubs', 'Failed Ace of Clubs test');
assert(deckOfCards.top().name() === 'Two of Spades', 'Failed Two of Spades test');

// Part d)

var everyname = ['Abe','Adam','Chad','Charity','Christian','Danielle','Esha','Geoff','Hanna','Jesse','Joshua',
'Kellen','Kyle','Liam','Lori','Matt','Nathan','Shawna','Tom','Abby','Amanda','Chris','Clarissa','Jhenna'];
var everyone = makeDeque(everyname);
function compareBySecondLetter(strA,strB) {return (strA[1]<strB[1]) ? -1 : 1};
everyone.sort(compareBySecondLetter);
assert(everyone.top() === 'Kyle', "Failed name test");


// Part e)
/*
// Example of bad way:
function compareByRandom(a,b) {return (Math.random()-.5);}
makeDeque.shuffle = function () {
	this.array.sort(compareByRandom);
}
*/

// Correct way: see full makeDeque version above
deckOfCards.shuffle();
console.log(deckOfCards.map( function(card) {return card.id} ));
console.log(deckOfCards.map( function(card) {return card.name()} ));

// Part f)

// See full makeDeque version above
