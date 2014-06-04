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
		array.sort(sortFn);
	}

	function exploitableMap(convertFn) {
		return array.map(convertFn);
	}

	function safeMap(convertFn) {
		// convertFn might expect 3 params, giving it access to array!
		// Prevent that by wrapping it in a function which allows only one parameter:
		function wrapCallback(val) {
			return convertFn(val);
		}
		return array.map(wrapCallback);
	}

	function cut(offset) {
		var fullLen = array.length;
		if (!offset) offset=0;
		var headLen = Math.floor(fullLen / 2) + offset;
		if (headLen < 0) headLen=0;
		//if (headLen >= fullLen) headLen = (fullLen-1);

		var tail = array.splice(headLen,fullLen);
		array = tail.concat(array);
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
			map : safeMap,
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
