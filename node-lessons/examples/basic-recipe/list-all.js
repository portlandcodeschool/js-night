module.exports = function () {
  var all = '';
  all +=  '\n\nMy Awesome Recipe' + '\n' +
          '\n\nTitle: ' + this.title + '\n' +
          '\n\nIngredients:' + '\n' + this.listIngredients() +
          '\n\nDirections: ' + '\n' + this.listDirections() + '\n';
  return all;
}