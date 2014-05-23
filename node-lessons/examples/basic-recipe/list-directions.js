module.exports = function () {
  var outputArr = [];
  this.directions.forEach(function (item, index) {
    outputArr.push('\n ' + (index + 1) + '. ' + item);
  });
  return outputArr;
}