var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var TodoListView = require('./todo-list-view');
var TodoInputView = require('./todo-input-view');

var todoMainTemplate = require('../../templates/todo-main.hbs');

var Todos = require('../collections/todos');

var TodoMainView = Backbone.View.extend({
  el: '#my-app',
  collection: new Todos(),
  initialize: function () {
    window.todoCollection = this.collection;
    this.collection.fetch();

    this.childViews = [];

    $(this.el).html(todoMainTemplate);
  },
  render: function () {
    var self = this;
    this.childViews.forEach(function(childView){
      childView.remove();
    });
    this.childViews = [];

    this.collection.forEach(function(todoModel){
      var todoItemView = new TodoItemView({model: todoModel});
      todoItemView.render();
      self.childViews.push(todoItemView.$el);
    });

    this.childViews.forEach(function(childView){
      $("#todo-list").append(childView);
    });

    var todoInputView = new TodoInputView({collection: this.collection});

  }

});

module.exports = TodoMainView;
