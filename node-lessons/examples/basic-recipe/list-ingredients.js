module.exports = function () {
  return this.ingredients.map(function (item, index) {
    return item = '\n ' + (index + 1) + ". " + item;
  });
}
