// EXERCISE 4

var Todo = Backbone.Model.extend({});

var Todos = Backbone.Collection.extend({
  model: Todo,
  comparator: 'cid'
});

var todos = new Todos();

todos.add([
  { title: 'mow the lawn',
    description: 'fill the gasoline tank, start the engine, cut all the grass, bag grass'},
  { title: 'paint the house',
    description: 'paint all the things'},
  { title: 'fix the leaky bathtub faucet',
    description: 'get the seat wrench, turn off water main, unscrew things, get new parts'}
]);

console.log('get one item by it\'s cid :');
console.log(todos.get({cid:'c1'}));
// or console.log(todos.get('cid', 'c1'));

todos.models.forEach(function (item, index){
  console.log('item\'s cid :' + item.cid);
  console.log(todos.get({cid: item.cid}).toJSON());
  // or console.log(todos.get({cid: item.cid}).attributes);
});

var Router = Backbone.Router.extend({
  routes: {
    '': 'home'
    // Todo: new route for contacts
  },
  home: function () {
    console.log(this);
    this.todoInputView = new TodoInputView({collection: todos});
    this.todoListView = new TodoListView({collection: todos});
    this.todoInputView.render();
    this.todoListView.render();
  }
  // Todo: new route handler method for contacts
  // that creates entirely new views with corresponding collections
}); 


var TodoInputView = Backbone.View.extend({
  //no more need for model property, collection handles that now
  el: '.form-group',
  events: {
    'click #add-todo': 'addTodo'
  },
  addTodo: function () {
    var $todoInput = $(this.el).find('#todo-input');
    var $description = $(this.el).find('#description-input');
    console.log('button was clicked');
    var todoInput = $todoInput.val();
    var descriptionInput = $description.val(); 
    // add a new item to the collection
    this.collection.add({title: todoInput, description: descriptionInput});

    $description.val(''); 
    $todoInput.val('');
  }
});

var TodoListView = Backbone.View.extend({
  el: '#todo-list',
  initialize: function () {
    this.collection.on('add', this.render, this); // re-render on any change of the model
  },
  render: function () {
    // completely new render function
    var outputHtml = '';

    this.collection.models.forEach(function (item) {
      outputHtml += '<li class="list-group-item"><strong>' + item.get('title') + '</strong></li>';
      outputHtml += '<li class="list-group-item">&nbsp;&nbsp-' + item.get('description') + '</li>';
    });

    $(this.el).html(outputHtml);
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
}); 