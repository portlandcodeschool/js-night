///////////////////////////////////////////
// INSTRUCTIONS
// 1. Follow the instructions in the comments
// 2. Test to see that your app works
// 3. Refactor so that each method of 
//    recipeBox is in a separate file
///////////////////////////////////////////

// Instructions start here:////////////////

//! bring in the fs module here !

var recipeBox = {};

recipeBox.readRecipeData = function (file, callback) {
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

recipeBox.printRecipeCards = function (error, data) {
    // this function should:
    // 1. Print the contents of data such that they look something like
    //    output-example.jpg
    // 2. if there is an error throw one
}

recipeBox.readRecipeData('./recipes.json', recipeBox.printRecipeCards);
// this function call and the options (arguments) passed in should 
// give you a some hints on how the above code should work. 
