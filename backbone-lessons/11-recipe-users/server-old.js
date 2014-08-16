var fs = require('fs');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config.js');
var consolidate = require('consolidate');
var Handlebars = require('handlebars');

var db = require('orchestrate')(config.dbKey);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/server-templates');

var partials = "./server-templates/partials/";
fs.readdirSync(partials).forEach(function (file) {
  var source = fs.readFileSync(partials + file, "utf8"),
      partial = /(.+)\.html/.exec(file).pop();

  Handlebars.registerPartial(partial, source);
});

// express routes

app.get('/', function (req, res) {
  res.render('./index.html');
});

//db.deleteCollection('recipes');
//db.deleteCollection('users');

app.get('/api/recipes', function (req, res) {
  var recipes = [];
  db.list('recipes')
  .then(function (result) {
    result.body.results.forEach(function (item){
      recipes.push(item.value);
    });
    res.json(recipes);
    console.log(recipes);
  })
  .fail(function (err) {
    console.error(err);
  });
});

app.get('/api/recipes/:id', function (req, res) {
  db.get('recipes', req.params.id)
  .then(function (result) {
    var recipe = result.body;
    console.log(recipe);
    res.json(recipe);
  })
  .fail(function (err) {
    console.error(err);
  });
});


app.post('/api/recipes', function (req, res){
  req.accepts('application/json');
  console.log(req.body);
  var recipe = req.body;
  db.put('recipes', recipe.id, recipe)
  .then(function (){
    console.log(req.body);
    res.send(200, 'ok, we added your recipe');
  })
  .fail(function (err) {
    console.error(err);
  });
});

app.put('/api/recipes/:id', function (req, res){
  req.accepts('application/json');
  var recipe = req.body;
  console.log(recipe);
  db.put('recipes', recipe.id, recipe)
  .then(function (){
    console.log(req.body);
    res.send(200, 'ok, we added your recipe');
  })
  .fail(function (err) {
    console.error(err);
  });
});

app.delete('/api/recipes/:id', function (req, res) {
  db.remove('recipes', req.params.id)
  .then(function(){
    res.send(200, 'ok, deleted the recipe' + req.params.id);
  })
  .fail(function(){
    console.error(err);
  })
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 4444);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port # ' + app.get('port'));
});
