///////////////////////////////////////////
// INSTRUCTIONS
// 1. Follow the instructions in the comments
// 2. Test to see that your app works
// 3. Refactor so that each function is in a separate file
///////////////////////////////////////////

// Instructions start here:////////////////

//! bring in the fs module here !

var RecipeBox = {};

RecipeBox.readRecipeData = function (file, callback) {
  //this function should:
  // 1. call a method from node that will read a file asynchronously (hint: fs module)
  //    - this function call should: 
  //      - read the file and check for errors, 
  //        and throw an error if there is one
  //      - use the file parameter/ local variable as a variable to pass in each file 
  //        location (recipes.json is pased in elsewhere)
  // 2. turn the JSON data into a proper Javascript data structure
  //    (e.g. an array with some stuff in it)
  // 3. Call the callback function (using the parameter/variable from above) 
  //    and (in this order)
  //     - pass in null for the first argument 
  //       (this means we are not passing an error object)
  //     - pass in the array of your entire data
}

RecipeBox.printRecipeCards = function (error, data) {
    // this function should:
    // 1. Print the contents of data such that they look something like
    //    output-example.js
    // 2. if there is an error throw one
}

RecipeBox.readRecipeData('./recipes.json', RecipeBox.printRecipeCards);