var readRecipes = require('./read-recipes');
var printRecipes = require('./print-recipes');

var recipeBox = {};

recipeBox.readRecipeData = readRecipes;

recipeBox.printRecipeCards = printRecipes;

recipeBox.readRecipeData('./recipes.json', recipeBox.printRecipeCards);