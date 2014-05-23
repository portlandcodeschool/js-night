module.exports = function () {
  var outputArr = [];
  this.ingredients.forEach(function (item, index) {
     outputArr.push('\n ' + (index + 1) + ". " + item);
  });
  return outputArr;
}