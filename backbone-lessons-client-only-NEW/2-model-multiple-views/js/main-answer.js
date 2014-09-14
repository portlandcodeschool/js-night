var Todo = Backbone.Model.extend({});

var todo1 = new Todo({
  title: 'mow the lawn',
  description: 'fill the gasoline tank, start the engine, cut all the grass, bag grass'
});

var TodoInputView = Backbone.View.extend({
  el: '#todo-form',
  model: todo1,
  events: {
    'click #add-todo': 'addTodo'
  },
  addTodo: function (event) {
    event.preventDefault();
    var $todoInput = $(this.el).find('#todo-input');
    var $description = $(this.el).find('#description-input'); // ANSWER
    var todoInput = $todoInput.val();
    var descriptionInput = $description.val(); // ANSWER
    this.model.set({title: todoInput, description: descriptionInput}); // ANSWER
    $description.val(''); // ANSWER
    $todoInput.val('');
  }
});

var TodoListView = Backbone.View.extend({
  el: '#todo-list',
  model: todo1,
  initialize: function () {
    this.model.on('change:title', this.render, this); //re-render only on title change of the model
    // this.model.on('change', this.render, this); // re-render on any change of the model
  },
  render: function () {
    $(this.el).html('<li><strong>' + this.model.get('title') + ': </strong>' + 
    this.model.get('description') + '</li>'); // ANSWER
  }
});

$(function () {
  var todoInputView = new TodoInputView();
  todoListView = new TodoListView();
  // no need to render input view, since it doesn't create dom elements
  todoListView.render();
});
