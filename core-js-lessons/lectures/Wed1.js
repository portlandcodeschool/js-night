var rainy=true, accessory, footwear;
if (rainy) (accessory="umbrella", footwear="galoshes");



if (rainy) {
	accessory="umbrella";
	footwear="galoshes";
}



if (rainy)
	accessory="umbrella";
	footwear="galoshes";



if (rainy) {
	accesory="umbrella"; 
	footwear="galoshes";
} else { //one line here
	accessory= "sunscreen";
	footwear = "sandals";
}



var who="Elmo";
var needHugs = 2;
if (needHugs) {//need two steps...
	needHugs--;
	who = '('+who+')';
}
who;



// LOOPS!
var who="Elmo";
var needHugs=5;
while (needHugs--) {//double-duty: change w. cond!
	who='('+who+')';
}


// FOR (downward)
var who='Elmo';
for (var needHugs = 5; needHugs; needHugs--) {
	who = '('+who+')';
}


// UPWARD
for (var hugsGiven = 0; hugsGiven<5; hugsGiven++) {
	who = '('+who+')';
}


// SHORTER:
for (var hugsGiven = 0; hugsGiven++<5; ) {
	who = '('+who+')';
}


// EVEN SHORTER:
for (var i = 0; i++<5; who='('+who+')') {}


// REPORT BACK:
for (var i = 0; i<5; i++) {
	console.log("pass #" + i);
	who = '('+who+')';
}


