var template = '<h2>Add a Todo</h2>' +
  '<div class="form-group">' +
    '<label for="todo-input">Todo Title</label>' +
    '<input id="todo-input" class="form-control" type="text">' +
    '<br>' +
    '<label for="description-input">Todo Description</label>' +
    '<input id="description-input" class="form-control" type="text">' +
    '<button id="add-todo" class="btn btn-success">Add todo</button>' +
  '</div>' +
  '<br><br>' +
  '<h3>My Todos</h3>' +
  '<div id="todo-list">' +
  '</div>';

var TodoMainView = Backbone.View.extend({
  el: '#my-app',
  listEl: '#todo-list',
  inputEl: '.form-group',
  template: template,
  initialize: function () {
    $(this.el).html(this.template);
    this.collection.on('add', this.render, this);
  },
  render: function () {
    console.log(this);
    var todoListView = new TodoListView({collection: todos});
    todoListView.render();
    $('#todo-list').html(todoListView.$el);

    var todoInputView = new TodoInputView({collection: todos});
    
  }

});