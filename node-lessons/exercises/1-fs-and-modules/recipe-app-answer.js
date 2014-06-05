var fs = require('fs');

var RecipeBox = {};

RecipeBox.readRecipeData = function (file, callback) {
  fs.readFile(file, {encoding: 'utf8'}, function (error, data) {
    var outputArray;
    if (error) throw error;
    outputArray = JSON.parse(data);
    console.log(outputArray);
    callback(null, outputArray);
  });
}

RecipeBox.printRecipeTitles = function (error, data) {
  if (error) throw error;
  console.log('\nYOUR RECIPE COLLECTION (just the titles)\n');
  data.forEach( function(item, index) {
    console.log('\t-- ' + item.title + '\n');
  });
  console.log('\n\n');
}

RecipeBox.printRecipeCards = function (error, data) {
  var output = '';
  if (error) throw error;

  console.log('\nYOUR RECIPE COLLECTION\n');

  data.forEach(function (recipeCard) {
    output += '\n' + recipeCard.title + '\n';
    recipeCard.ingredients.forEach(function (item, index) {
      var unitPlural = item.unit + 's';

      if (item.amount > 0)
        output += '\t' + item.amount + ' ';

      if (item.amount > 1) {
        output += unitPlural;
      } else {
        output += item.unit;
      }

      output += ' of ';
      output += item.ingredient + '\n';

    });

    recipeCard.directions.forEach(function (item, index) {
      timeUnitPlural = item.unit + 's';

      output += '\n' + (index + 1).toString() + '. ' + item.direction;
      if (item.duration > 0) {
        output += ' for ' + item.duration + ' ' + item.unit;
      } else if (item.duration > 1) {
        output += ' for ' + item.duration + ' ' + item.unitPlural;
      }

    });

    output += '\n\n';
  });

  console.log(output);

}

RecipeBox.readRecipeData('./recipes.json', RecipeBox.printRecipeTitles);

RecipeBox.readRecipeData('./recipes.json', RecipeBox.printRecipeCards);