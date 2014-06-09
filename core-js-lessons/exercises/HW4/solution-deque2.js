function makeDeque(values) {
	var array = values.slice();
	var absent = [];

	function readmit(val) { //internal function only, do not attach to instances
		var foundAt = absent.indexOf(val);
		if (foundAt<0) return false;
		// else found; excise from absent array
		absent.splice(foundAt,1);
		return true;
	}

	//instance methods:
	function top() {
		if (array.length)
			return array[array.length-1];
	}
	function bottom() {
		if (array.length)
			return array[0];
	}

	function pop() {
		var val = array.pop();
		if (val !== undefined)
			absent.push(val);
		return val;
	}
	function push(val) {
		return readmit(val) && array.push(val);
	}

	function shift() {
		var val = array.shift();
		if (val !== undefined)
			absent.push(val);
		return val;
	}

	function unshift(val) {
		return readmit(val) && array.unshift(val);
	}

	function sort(sortFn) {
		//don't return:
		array.sort(sortFn);
	}

	function exploitableMap(convertFn) {
		return array.map(convertFn);
	}

	// preventing map exploit (part b), three solutions:

	function safeMap1(convertFn) {
		// convertFn might expect 3 params, giving it access to array!
		// Prevent that by wrapping it in a function which allows only one parameter:
		function wrapCallback(val) {
			return convertFn(val);
		}
		return array.map(wrapCallback);
	}
	function safeMap2(convertFn) {
		return array.slice().map(convertFn); // do map on copy of array
	}

	function safeMap3(convertFn) { // emulate map by looping:
		var result = [];
		for (var i=0; i<array.length; i++) {
			result.push(convertFn(array[i]));
		}
		return result;
	}

	function cut(offset) {  // returns non-zero integer if success, else false
		if (!offset || (typeof offset !== 'number'))
			offset=0;
		offset = Math.floor(offset);  //ensure integer

		var fullLen = array.length;
		var headLen = Math.floor(fullLen / 2) + offset;
		if (headLen <= 0) return false;  		// no head, therefore no change
		if (headLen >= fullLen) return false; 	// no tail, therefore no change

		var tail = array.splice(headLen,fullLen);
		array = tail.concat(array);
		return tail.length; //returns # elements moved from upper half to lower (>0)
	}

	function shuffle() {
	// Knuth-Fisher-Yates, modified from http://bost.ocks.org/mike/shuffle/
		var end = array.length, temp, i;
  			// While there remain elements to shuffle…
		while (end>1) {
   			// Pick a remaining element…
   			i = Math.floor(Math.random() * end--);
   			// And swap it with the current element.
   			temp = array[end];
   			array[end] = array[i];
		    array[i] = temp;
 		}
 	}

	deque = {// export each public method by linking an instance property to it:
			sort : sort,
			map : safeMap1, //or safeMap2 or safeMap3
			exploitableMap : exploitableMap, //linked to show exploit
			cut : cut,
			shuffle : shuffle,
			top : top,
			bottom : bottom,
			push : push,
			pop : pop,
			shift : shift,
			unshift : unshift
	};

	return deque;
}


// Part b), exploit:
function duplicateAces(card,i,array) {
	// adds one extra of each Ace to top of deque
	if (i<52 && (card.rank()==1)) {
		array.push(makeCard(card.id));
	}
	return card;
}

var deck = makeDeque(make52cards);
deck.exploitableMap(duplicateAces);

// Part b) prevention is above as one of safeMap1-3
