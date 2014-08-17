var nameFunctions = {};

nameFunctions.sayTheName = function (name) {
  console.log('hey there, ' + name);
}

nameFunctions.reverseTheName = function (name) {
  output = name.split("").reverse().join("");
  console.log("your name reversed is: " + output);
}

exports.nameUtilities = nameFunctions;