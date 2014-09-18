app.TodoModel = Backbone.Model.extend({});

app.TodosCollection = Backbone.Collection.extend({
  model: app.TodoModel,
  comparator: 'cid'
});

app.todosCollection = new app.TodosCollection();

app.todosCollection.add([
  { title: 'mow the lawn',
    description: 'fill the gasoline tank, start the engine, cut all the grass, bag grass'},
  { title: 'paint the house',
    description: 'paint all the things'},
  { title: 'fix the leaky bathtub faucet',
    description: 'get the seat wrench, turn off water main, unscrew things, get new parts'}
]);

app.TodoMainView = Backbone.View.extend({
  el: '#my-app',
  render: function () {
    this.$el.html(app.templates.main);
    app.todoInputView = new app.TodoInputView({collection: this.collection});
    app.todoListView = new app.TodoListView({collection: this.collection});
    app.todoListView.render();
  }
});

app.TodoInputView = Backbone.View.extend({
  el: '#todo-form',
  events: {
    'click #add-todo': 'addTodo'
  },
  addTodo: function (event) {
    event.preventDefault();
    var $todoInput = $(this.el).find('#todo-input');
    var $description = $(this.el).find('#description-input');
    console.log('button was clicked');
    var todoInput = $todoInput.val();
    var descriptionInput = $description.val();
    this.collection.add({title: todoInput, description: descriptionInput});
    $description.val('');
    $todoInput.val('');
  }
});

app.TodoListView = Backbone.View.extend({
  el: '#todo-list',
  initialize: function () {
    this.collection.on('add', this.render, this);
  },
  render: function () {
    var outputHtml = '';
    this.collection.models.forEach(function (item) {
      var data = {};
      data.title = item.get('title');
      data.description = item.get('description');
      outputHtml += app.templates.listItem(data);
    });

    $(this.el).html(outputHtml);
  }
});

$(function () {
  app.todoMainView = new app.TodoMainView({collection: app.todosCollection});
  app.todoMainView.render();
});
