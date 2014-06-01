//-------
// Part a): build a deque factory
function makeDeque(values) {
	// ...
};

makeDeque.top = function() {
	//...
};
makeDeque.bottom = function() {
	//...
};

makeDeque.pop = function() {
	//...
};
makeDeque.push = function(val) {
	//...
};

makeDeque.shift = function() {
	//...
};
makeDeque.unshift = function(val) {
	//...
};

makeDeque.cut = function(offset) {
	//...
};

makeDeque.map = function(convertValFn) {
	//...
};

makeDeque.sort = function(compareValsFn) {
	//...
};

var someCards = /* make array of 52 card objects here, using your code from Problem 1) */;
// At this point, data looks like Fig.1

//-------
// Part b): build a deque instance:
var deckOfCards = makeDeque(someCards);
// sort it:
deckOfCards.sort(/* something here */);
// At this point, data looks like Fig.2

// sort it differently:
deckOfCards.sort(/* something different here */);

//-------
// Part c): build another deque instance:
var someNames = /* make array of student/TA names here */;
var deckOfNames = makeDeque(someNames);
deckOfNames.sort(/* something here */);

