var fs = require('fs');

var listIng = require('./list-ingredients');
var listDir = require('./list-directions');
var listEvery = require('./list-all');
var RecipeCard = require('./recipe-maker'); // bring in recipe card constructor func

var app = {};

RecipeCard.prototype.listIngredients = listIng;

RecipeCard.prototype.listDirections = listDir; 

RecipeCard.prototype.listAll = listEvery;


function readRecipeData (cb) {
  var output;
  fs.readFile('./recipes.json' , {encoding: 'utf8'}, function (err, data) {
    if (err) console.error(err);
    output = JSON.parse(data);
    cb(null, output, print);
  });
}

function makeRecipeCards (err, arrayOfRecipes, cb) {
  var newArray = arrayOfRecipes.map(function (item, index) {
     return new RecipeCard(item.title, item.ingredients, item.directions);
  });

  cb(newArray);
}

function print(data) {
  console.log(data);
}

readRecipeData(makeRecipeCards);


// app.pbAndJ = new Recipe (title, ingredients, directions);


