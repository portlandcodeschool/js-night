var $ = require('jquery-untouched');
var Backbone = require('backbone');
Backbone.$ = $;

var Router = require('./router');

$(function () {
  window.app = new Router();
  Backbone.history.start();
});
