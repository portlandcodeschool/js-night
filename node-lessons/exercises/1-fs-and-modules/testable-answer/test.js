var assert = require('assert');
var testsCompleted = 0;
var printRecipes = require('./print-recipes');
var readRecipes = require('./read-recipes');


function printTest () {
  var testJSON = [{"key": "value"},{"key": 1}];

  assert.equal()
  testsCompleted++;
}

function testTest () {
  assert.equal(1, 1, "1 should equal 1");
  testsCompleted++;
}

testTest(function () {
  console.log("Completed " + testsCompleted + " tests");
});

