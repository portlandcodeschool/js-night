function makeDeque(domain,domainFn,orderFn) {
		deque = {array:[],
				sortFn : orderFn,
				sort : makeDeque.sort,
				cut : makeDeque.cut,
				shuffle : makeDeque.shuffle,
				push : makeDeque.push,
				pop : makeDeque.pop,
				shift : makeDeque.shift,
				unshift : makeDeque.unshift,
				list : makeDeque.list
			};
			// Set up domain
			if (domain instanceof Array) {
				deque.array = domain;
			} else if ((typeof domain ==='number') && domain>0) {
				for (var i=0; i<domain; i++) {
					deque.array[i]=i;
				}
			} else {
				return null;
			}
			if (domainFn)
				deque.array = deque.array.map(domainFn);
			return deque;
}

makeDeque.pop = function() {
	return this.array.pop();
}

makeDeque.push = function(val) {
	return this.array.push(val);
}

makeDeque.shift = function() {
	return this.array.shift();
}

makeDeque.unshift = function(val) {
	return this.array.unshift(val);
}

makeDeque.sort = function(sortFn) {
	if (!sortFn) sortFn = this.sortFn;
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

makeDeque.list = function(stringFn) {
	return this.array.map(stringFn).join();
}

function compareCards(a,b) {
	return a.cardID()-b.cardID();
}

function makeCard(id) {
	return {id:id, cardID:function() {return this.id}, name:function() {return this.id} };
}

var deck = makeDeque(52,makeCard,compareCards);
deck.list(function(it) it.name());
