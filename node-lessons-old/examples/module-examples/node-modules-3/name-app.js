var names = require("./name-modules/names-list");
var nameUtil = require("./name-modules/name-util");


// These won't work

nameUtil.sayTheName(names.dad);
nameUtil.reverseTheName(names.dad);

console.log('\n');

nameUtil.sayTheName(names.mom);
nameUtil.reverseTheName(names.mom);


// what's in this object anyway?
// console.log(nameUtil);