var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var TodoMainView = require('./views/todo-main-view'); 
var TestView = require('./views/test-view');

var Router = Backbone.Router.extend({
  routes: {
    '': 'todos',
    'test': 'test'
  },
  todos: function () {
    this.todoMainView = new TodoMainView();
    this.todoMainView.render(); 
  },
  test: function () {
    this.testView = new TestView();
    this.testView.render();
  }

});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});
