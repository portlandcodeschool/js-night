var app = {};

app.pbAndJ = new Recipe (
  'Peanut Butter and Jelly',
  ['peanut butter', 'jelly', 'bread'],
  [   'lay out two slices of bread', 
      'spread peanut butter', 
      'spread jelly',
      'put sandwich together',
      'eat']
);

Recipe.prototype.listIngredients = function () {
  var outputArr = [];
  this.ingredients.forEach(function (item, index) {
     outputArr.push('\n ' + (index + 1) + ". " + item);
  });
  return outputArr;
}

Recipe.prototype.listDirections = function () {
  var outputArr = [];
  this.directions.forEach(function (item, index) {
    outputArr.push('\n ' + (index + 1) + '. ' + item);
  });
  return outputArr;
}

Recipe.prototype.listAll = function () {
  var all = '';
  all +=  '\n\nMy Awesome Recipe' + '\n' +
          '\n\nTitle: ' + this.title + '\n' +
          '\n\nIngredients:' + '\n' + this.listIngredients() +
          '\n\nDirections: ' + '\n' + this.listDirections() + '\n';
  return all;
}

console.log(app.pbAndJ.listAll());

//helper functions
function Recipe (title, ingredients, directions) {
  this.title = title;
  this.ingredients = ingredients;
  this.directions = directions;
}
