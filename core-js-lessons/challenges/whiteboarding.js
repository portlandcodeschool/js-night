/* 
Introduction/rules/advice:

-- You will have 15 minutes to solve a randomly-selected problem as well as you can.  If you finish early, your interviewer may tweak the problem or ask related questions.
After your 15 minutes, the interviewer and/or listeners will have 5 minutes to offer feedback on your presentation.  Listeners should identify:
  * any bugs in your code (briefly!);
  * the strongest aspects of your solution and presentation;
  * aspects of your presentation which could use improvement.

-- You must write actual code, but you don't have to start with it.  You may pseudo-code/sketch/doodle as needed.

-- Whiteboard space management can be difficult; try to anticipate the space needed for your code.

-- You may make any assumptions needed to simplify the problem initially, but explain that you're doing so, and try to relax those assumptions before you're finished.

-- It's OK to pause to think, but keep the audience with you.  Think out loud whenever possible.

-- Everybody will come away with a sense that this test is "unfair",
because you know more than you were able to demonstrate here:
  * you know what to do but can't quite explain it;
  * you can solve it but not that quickly, or not with people watching you;
  * you can solve it quickly if only you had your usual references and examples to refer to;
  * you know All the Things except for this question.
It's true: everybody is better than this test will show.
For everybody, there's a gap between your potential and your performance here, and that gap isn't equal for everyone.  The test isn't fair.  But it is productive.

So let's get it out of our system now.
Everybody repeat: "I am better than this test can show".
Hopefully that will diminish the urge to feel defensive later, so that we can all concentrate on
*closing that gap*.

*/


// ---0---
// Write a function which duplicates an object.

// Simple/shallow copy:
function clone(obj) {
    if ((typeof obj) !== 'object') return obj;//optional check, handles primitives
    var copy = {};
    for (var key in obj) {
	copy[key] = obj[key];
    }
    return copy;
}

// IMPROVEMENT A: Make sure the duplicate inherits the same properties as the original
function clone2(obj) {
    if ((typeof obj) !== 'object') return obj;
    var Ctor = obj.constructor;
    var copy = new Ctor();
    for (var key in obj) {
	copy[key] = obj[key];
    }
    return copy;
}

// IMPROVEMENT B: Make sure the duplicate copies any component objects:
var shallowClone = clone2;
function deeperClone(obj) {
    var Ctor = obj.constructor;
    var copy = new Ctor();
    for (var key in obj) {
	copy[key] = shallowClone(obj[key]);
    }
    return copy;
}

// Recursive:
function deepClone(obj) {
    if ((typeof obj) != 'object') return obj;
    var Ctor = obj.constructor;
    var copy = new Ctor();
    for (var key in obj) {
	copy[key] = deepClone(obj[key]);
    }
    return copy;
}
// IDENTIFY POSSIBLE FAILURE: circular-linked objects!  How might you fix that?


//---1---
// Given two arrays (e.g. 'red' and 'black'), interleave them into one array which has alternating red and black values until one runs out, then the remaining elements of the other color.
// You may start alternation with either array.
// Try to leave the component arrays unchanged.

// EASIER: alternate only until one runs out, then quit.

function interleave1(arrA,arrB) {
    var shorter = arrA;
    var longer = arrB;
    if (longer.length < shorter.length) {
	shorter = arrB;
	longer = arrA;
    }

    var result = [];
    for (var i = 0; i<shorter.length; i++) {
	result.push(arrA[i]);
	result.push(arrB[i]);
    }
    // push remainder:
    for ( ; i<longer.length; i++) {
	result.push(longer[i]);
    }
    // OR:
    //result = result.concat(longer.slice(i));
}

// OR
function interleave2(arrA,arrB) {
    var result = [];
    for (var i=0; (i<arrA.length) || (i < arrB.length); i++) {
	if (i<arrA.length)
	    result.push(arrA[i]);
	if (i<arrB.length)
	    result.push(arrB[i]);
    }
    return result;
}


// BONUS CHALLENGE: generalize to any number of arrays
function interleaveArrays(arrays) {
    var result = [];
    // find longest length:
    var maxlen = 0;
    arrays.forEach(function(arr) {
	    if (arr.length > maxlen)
		maxlen = arr.length;
	});
    // iterate over longest:
    for (var i = 0; i<maxlen; i++) {
	arrays.forEach(function(arr) {
		if (i<arr.length)
		    result.push(arr[i]);
	    });
    }
    return result;
}

// ---2---
// Given two sorted arrays, merge them into one sorted array with the elements of both.
// You may assume the default comparator (or use operator <).
// You may also change the original arrays if needed.

// EASY VERSION:
function merge0(arrA,arrB) {
    var result = arrA.concat(arrB);
    result.sort();
    return result;

// IMPROVEMENT: do it without using sort.  Take advantage of the arrays' initial sorting.

// pseudo-code:
// as long as either A or B has some elements...
//  take element from either A or B, whichever is smaller, and push it onto result.
//  

function merge1(arrA,arrB) {
    // Destroys originals
    var result = [];
    while (arrA.length || arrB.length) {
	if (!arrA.length) //no more As, take from B
	    result.push(arrB.shift());
	else if (!arrB.length)// no more Bs, take from A
	    result.push(arrA.shift());
	else if (arrA[0] < arrB[0]) // A is smaller, take from A
	    result.push(arrA.shift());
	else
	    result.push(arrB.shift());
    }
    return result;
}

function merge2(arrA,arrB) {
    // Preserves originals, uses 2 counters
    var result = [];
    var a=0,b=0;
    while (a < arrA.length || b < arrB.length) {
	if (a >= arrA.length)
	    result.push(arrB[b++]);
	else if (b >= arrB.length)
	    result.push(arrA[a++]);
	else if (arrA[a] < arrB[b])
	    result.push(arrA[a++]);
	else
	    result.push(arrB[b++]);
    }
    return result;
}


// ---3---
// Turn a String Into Title Case:
// Given a string of words, capitalize only the initial letter of each word.
// Exception: certain articles (e.g. 'a' and 'the') are capitalized only when they're first.

function titleizeWord(word,idx) { //idx is word's position
    var lower = word.toLowerCase();
    switch (lower) {
	case 'a':
	case 'the':
	    if (idx) return lower;
    }
    var first = lower[0].toUpperCase();
    return first+lower.substr(1);
}

function titleize(str) {
    var words = str.split(' ');
    return words.map(titleizeWord).join(' ');
}

// EASIER: Capitalize the first letter of any word, without exceptions
// IMPROVEMENT: ??
// VARIANT: Given a paragraph string, capitalize all sentences correctly.

//---4---
// Given a string of words, decide which word occurs most often.
function mostFreqWord(str) {
    var words = str.split(' ');
    var counter = {};
    var mostFreqWord = '';
    var count = 0;
    var maxCount = 0;

    words.forEach(function (word) {
	    if (!counter[word])
		counter[word] = 0;
	    count = ++counter[word];
	    if (count>maxCount) {
		maxCount = count;
		mostFreqWord = word;
	    }
	});
    return mostFreqWord;
}

// EASIER: just build the object representing the count of all words
// IMPROVEMENT: case-insensitivity
// IMPROVEMENT: return list of words in decreasing order of frequency

// ---5---
// Given a string of words, find the first word starting with a vowel.

function startsWithVowel(str) {
    if (typeof str !== 'string') return;
    var init = str[0].toLowerCase();
    return (init=='a' || init=='e' || init=='i' || init=='o' || init=='u' || init=='y');
    //OR:
    switch (init) {
      case a:
      case e:
      case i:
      case o:
      case u: return true;
      default: return false;
    }
}

function firstWithInitVowel(str) {
    var words = str.split(' ');
    for (var i = 0; i<words.length; i++) {
	if (startsWithVowel(words[i]))
	    return words[i];
    }
    return '';
}

// EASIER: find the first word matching 'apple'
// EASIER: assume all lower-case

// IMPROVEMENT: find the LAST word starting with vowel
// IMPROVEMENT: find the first word containing ONLY vowels

// ---6--- 
// Given an array of numbers, find the largest and smallest.
function minMax(nums) {
    if (nums.length < 1) return;
    nums.sort(function(a,b){return a-b});//make sure sort is numeric!
    return {min:nums[0],max:nums[nums.length-1]};
}

//OR
function minMax(nums) {
    var small = Math.min.apply(null,nums);
    var large = Math.max.apply(null,nums);
    return {min:small, max:large};
}

// OR
function minMax(nums) {
    var min = Infinity;
    var max = -Infinity;
    nums.forEach(function(num) {
	    if (num>max) max=num;
	    if (num<min) min=num;
	});
    return {min:min,max:max};
}

// IMPROVEMENT: Find the largest and smallest EVEN numbers.
// IMPROVEMENT: Find the average/mean of the numbers.
// IMPROVEMENT: Return an array representing the difference of each number from their collective mean.

// ---7---
// Find the month and day of the Nth day of the year
// (Assume non-leap year)

// Hint: find just the month
// Hint: one at a time, subtract each completed month

var days = [31,28,31,30,31,30,31,31,30,31,30,31];
function monthDay(n) {
    var month=0;
    while (n > days[month]) {
	n -=  days[month];
	month++;
    }
    return {month:month+1, day:n};
}



// IMPROVEMENT: Conversely, for a given month and day, what is N?
function monthDayToN(month,day) {
    var priorDays = 0;
    while (month>1) {
	priorDays += days[month-1];
    }
    return priorDays + day;
}

// IMPROVEMENT: In both direction (N <-> date), express the month as a name.
// IMPROVEMENT: How many days remain in the current month?

// ---8---
/*
// Given the name of the weekday on the first of the month, produce the name of the weekday of the Nth day of a month
// Test: getDay(3,'Fri') --> 'Sun'

var weekdays = ['Sun','Mon','Tues','Wed','Thu','Fri','Sat'];

function getDay(n,firstDayName) {
    var firstDayIndex = weekdays.indexOf(firstDayName);

    var daynum = (n+firstDayIndex-1)%7;
    return weekdays[daynum];
}

// EXTRA CHALLENGE:
// Given the weekday of the first of month, and the number of days in month,
// return a list of the dates which fall on a given weekday

function getDates(targetDayName,firstDayName,maxDays) {
    var firstDayIndex = weekdays.indexOf(firstDayName);
    var targetIndex   = weekdays.indexOf(targetDayName);
    var firstDate = 1+ targetIndex - firstDayIndex;// might be negative
    if (firstDate<1) firstDate += 7;
    var result = [];
    for (var date = firstDate; date <= maxDays; date+=7) {
	result.push(date);
    }
    return result;
}
*/

// VARIANT:
// Given a weekday name (e.g. "Friday"), find all days of the month which fall on that weekday.
// You may start with any simplifying assumptions.

var weekdays = ['Sun','Mon','Tues','Wed','Thu','Fri','Sat'];

// Assuming each month has 31 days and begins on Sunday:
function getDates(targetDayName) {
    var weekdayNum = weekdays.indexOf(targetDayName);
    var date = weekdayNum+1;
    var result = [];
    while (date <= 31) {
	result.push(date);
	date+=7;
    }
    return result;
}

// Now generalize: provide extra parameters for 1) weekday of first of month, 2) number of days in month.
function getDates(targetDayName, firstOfMonthName, numDays) {
    var weekdayNum = weekdays.indexOf(targetDayName);
    var firstdayNum = weekdays.indexOf(firstOfMonthName);
    var date = weekdayNum+1-firstdayNum;
    if (date<1) date+=7;
    var result = [];
    while (date <= numDays) {
	result.push(date);
	date+=7;
    }
    return result;
}
