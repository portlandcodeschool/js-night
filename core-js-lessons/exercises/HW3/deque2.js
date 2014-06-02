function makeDeque(values) {
		deque = {array:[],
				absent:[],
				readmit: makeDeque.readmit,
				sort : makeDeque.sort,
				cut : makeDeque.cut,
				shuffle : makeDeque.shuffle,
				push : makeDeque.push,
				pop : makeDeque.pop,
				shift : makeDeque.shift,
				unshift : makeDeque.unshift,
				list : makeDeque.list
			};

			deque.array = values.slice();

			return deque;
}

makeDeque.readmit = function(val) {
	var foundAt = this.absent.indexOf(val);
	if (foundAt<0) return false;
	// else found; excise from absent array
	this.absent.splice(foundAt,1);
	return true;
}

makeDeque.pop = function() {
	var val = this.array.pop();
	if (val !== undefined)
			this.absent.push(val);
	return val;
}

makeDeque.push = function(val) {
	return this.readmit(val) && this.array.push(val);
}

makeDeque.shift = function() {
	var val = this.array.shift();
	if (val !== undefined)
			this.absent.push(val);
	return val;
}

makeDeque.unshift = function(val) {
	return this.readmit(val) && this.array.unshift(val);
}

makeDeque.sort = function(sortFn) {
	//if (!sortFn) sortFn = this.sortFn;
	this.array.sort(sortFn);
}

makeDeque.cut = function(offset) {
	var fullLen = this.array.length;
	if (!offset) offset=0;
	var headLen = Math.floor(fullLen / 2) + offset;
	if (headLen < 0) headLen=0;
	//if (headLen >= fullLen) headLen = (fullLen-1);

	var tail = this.array.splice(headLen,fullLen);
	this.array = tail.concat(this.array);
}

makeDeque.list = function(stringFn,delim) {
	return this.array.map(stringFn).join(delim);
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

}
// Card-specific:

function compareCards(a,b) {
	return a.id()-b.id;
}

function makeCard(id) {
	return {id:id, name:function() {return this.id} };
}
function makeCards(from,to) {
	to = Math.floor(to);
	var result = [];
	for ( ; from <= to; from++) {
		result.push(makeCard(from));
	}
	return result;
}

var deck = makeDeque(makeCards(0,51));
deck.list(function(it) it.name());
var hand = [];
hand.push(deck.pop());
deck.push('a');
