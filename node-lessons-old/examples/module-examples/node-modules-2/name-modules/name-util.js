//variables defined outside of these functions are private

exports.sayTheName = function (name) {
  console.log('hey there, ' + name);
}

exports.reverseTheName = function (name) {
  output = name.split("").reverse().join("");
  console.log("your name reversed is: " + output);
}