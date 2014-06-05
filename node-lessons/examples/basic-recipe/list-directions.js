module.exports = function () {
  return this.directions.map(function (item, index) {
    return item = '\n ' + (index + 1) + '. ' + item
  });
}
