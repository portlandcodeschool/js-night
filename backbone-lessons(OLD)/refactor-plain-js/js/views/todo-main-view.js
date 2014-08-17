// globals: app, jQuery, $, Backbone, _
(function (){
  app.todoMainTemplate = '<h1>Todo App</h1>' +
    '<h4>Add a Todo</h4>' +
    '<div class="form-group">' +
      '<label for="todo-input">Todo Title</label>' +
      '<input id="todo-input" class="form-control" type="text">' +
      '<br>' +
      '<label for="description-input">Todo Description</label>' +
      '<input id="description-input" class="form-control" type="text">' +
      '<br>' +
      '<button id="add-todo" class="btn btn-success">Add todo</button>' +
      '<br>' +
    '</div>' +
    '<br><br>' +
    '<h4>My Todos</h4>' +
    '<ul id="todo-list">' +
    '</ul>';

  app.TodoMainView = Backbone.View.extend({
    el: '#my-app',
    collection: new app.TodosCollection(),
    initialize: function () {
      $(this.el).html(app.todoMainTemplate);
    },
    render: function () {
      var todoListView = new app.TodoListView({collection: this.collection});
      todoListView.render();
      $('#todo-list').html(todoListView.$el);

      var todoInputView = new app.TodoInputView({collection: this.collection});

    }

  });
})();