var app = {};

function Recipe (title, ingredients, directions) {
  this.title = title;
  this.ingredients = ingredients;
  this.directions = directions;
}

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
  return this.ingredients.map(function (item, index) {
    return item = '\n ' + (index + 1) + ". " + item;
  });
}


Recipe.prototype.listDirections = function () {
  return this.directions.map(function (item, index) {
    return item = '\n ' + (index + 1) + '. ' + item
  });
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


