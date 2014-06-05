var fs = require('fs');

var listIng = require('./list-ingredients');
var listDir = require('./list-directions');
var listEvery = require('./list-all');
var RecipeCard = require('./recipe-maker'); // bring in recipe card constructor func

var app = {};
app.utils = {};

app.utils.printData = function() {
  console.log(app.allRecipes);
}

RecipeCard.prototype.listIngredients = listIng;

RecipeCard.prototype.listDirections = listDir; 

RecipeCard.prototype.listAll = listEvery;

var fetchAllRecipes = function () {
  fs.readFile('./recipes.json', {encoding: 'utf8'}, function (err, data) {
    if (err) console.error(err);
    app.allRecipes = data;
    app.utils.printData();
  });
}

var makeRecipeCards = function (callback) {
  var output;
  output = arrayOfObjects.map(function (item, index) {
    return new RecipeCard(item.title, item.ingredients, item.directions);
  });
}

console.log();

// app.pbAndJ = new Recipe (title, ingredients, directions);


