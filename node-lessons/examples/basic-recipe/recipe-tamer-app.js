var listIng = require('./list-ingredients');
var listDir = require('./list-directions');
var listEvery = require('./list-all');
var Recipe = require('./recipe-maker');

var app = {};

app.pbAndJ = new Recipe (
  'Peanut Butter and Jelly',
  ['peanut butter', 'jelly', 'bread'],
  [   
    'lay out two slices of bread', 
    'spread peanut butter', 
    'spread jelly',
    'put sandwich together',
    'eat'
  ]
);

Recipe.prototype.listIngredients = listIng;

Recipe.prototype.listDirections = listDir; 

Recipe.prototype.listAll = listEvery;

console.log(app.pbAndJ.listAll());