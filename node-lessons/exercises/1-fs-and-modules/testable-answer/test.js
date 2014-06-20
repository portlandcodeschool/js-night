var assert = require('assert');
var testsCompleted = 0;
var recipes = require('./recipes.json');
var printRecipes = require('./print-recipes');
var readRecipes = require('./read-recipes');
var formatIngredients = require('./format-ingredients');
var formatDirections = require('./format-directions');

function testTest () {
  assert.equal(1, 1, "1 should equal 1");
  testsCompleted++;
}

function dataToTextTest (data, textFunction) { 
  data.forEach(function (item, index) {
    var textOutput = textFunction(item);
    assert.equal('string', typeof(textOutput), 'output should be a string');
  });  
  testsCompleted++;
}

function typeOfDataTest (file, dataFunction) {
  dataFunction(file, testFunc);
  function testFunc (err, data) {
    var actual = typeof(data);
    assert.equal('object', actual, 'type of data should be object');
    testsCompleted++;
  }
}

dataToTextTest(recipes, formatIngredients);
dataToTextTest(recipes, formatDirections);

typeOfDataTest('./recipes.json', readRecipes);

testTest();

console.log("Completed " + testsCompleted + " tests");

