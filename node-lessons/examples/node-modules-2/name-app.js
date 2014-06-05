var names = require("./name-modules/names-list");
var nameUtil = require("./name-modules/name-util");

nameUtil.sayTheName(names.dad);
nameUtil.reverseTheName(names.dad);

console.log('\n');

nameUtil.sayTheName(names.mom);
nameUtil.reverseTheName(names.mom);