///////////////////////////////////////////
// INSTRUCTIONS
// 1. Follow the instructions in the comments
// 2. Test to see that your app works
// 3. Refactor every function to be a separate file
///////////////////////////////////////////


//! bring in the fs module here !

var RecipeBox = {};

RecipeBox.readRecipeData = function (file, next1, next2) {
  //this function should:
  // 1. read a file asynchronously (hint: fs module)
  // 2. the thing that reads the file should check for errors, 
  //    and throw an error if there is one
  // 3. use the file parameter as a variable to pass in each file 
  //    location (e.g. './file.json')
  // 4. turn the JSON data into a proper Javascript data structure
  //    (e.g. an array with some stuff in it)
  // 5. Call next1 and (in this order)
  //     - pass in null for the first argument
  //     - pass in the array of your entire data
  //     - pass in the local variable/parameter next2 
  });
}

RecipeBox.makeRecipeCards = function (error, arrayOfRecipes, next) {
  //this function should:
  // 1. throw an error if there is one
  // 2. make a new array that
  //    - takes each 
  var newArray;
  if (error) throw error;
  newArray = arrayOfRecipes.map(function (item, index) {
     return new RecipeCard(item.title, item.ingredients, item.directions);
  });
  next(null, newArray);
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

RecipeBox.readRecipeData('./recipes.json', 
                          RecipeBox.makeRecipeCards,
                          RecipeBox.printRecipeTitles);

RecipeBox.readRecipeData('./recipes.json', 
                          RecipeBox.makeRecipeCards,
                          RecipeBox.printRecipeCards);