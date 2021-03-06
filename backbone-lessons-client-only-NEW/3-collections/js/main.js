// In the index.html file, you will notice that there is also a description input
// Add the corresponding code below to make this input work the same way
// as todo title. Don't forget to update the application logic and the 
// template (a string of html with your js values added) that gets put into the dom

var Todo = Backbone.Model.extend({});

var Todos = Backbone.Collection.extend({
  model: Todo,
  comparator: 'cid' // or perhaps sort by 'title'
});

var todos = new Todos();

// we can add multiple items to our collection, our collection will instantiate
// them with the appropriate model class, since we told the Collection class which model it uses
todos.add([
  { title: 'mow the lawn',
    description: 'fill the gasoline tank, start the engine, cut all the grass, bag grass'},
  { title: 'paint the house',
    description: 'paint all the things'},
  { title: 'fix the leaky bathtub faucet',
    description: 'get the seat wrench, turn off water main, unscrew things, get new parts'}
]);

// TEST OUR COLLECTIONS BY LOGGING COLLECTION ITEMS TO THE CONSOLE

console.log('get one item by it\'s cid :');
console.log(todos.get({cid:'c1'}));
// or console.log(todos.get('cid', 'c1'));
// we can git the get "getter function" a pair of string parameters instead of passing an object
// in other words, ('key', 'value') instead of ({key: 'value'})

// loop over all the items in the collection, log them and some info about them
todos.models.forEach(function (item, index){
  console.log('item\'s cid :' + item.cid);
  console.log(item);
  console.log(item.toJSON());
});


var TodoInputView = Backbone.View.extend({
  el: '#todo-form',
  events: {
    'click #add-todo': 'addTodo'
  },
  addTodo: function (event) {
    event.preventDefault();
    var $todoInput = $(this.el).find('#todo-input');
    console.log('button was clicked');
    var todoInput = $todoInput.val();
    this.collection.add({title: todoInput}); 
    $todoInput.val('');
  }
});

var TodoListView = Backbone.View.extend({
  el: '#todo-list',
  initialize: function () {
    this.collection.on('add', this.render, this);
  },
  render: function () {
    var outputHtml = '';

    this.collection.models.forEach(function (item) {
      outputHtml += '<li><strong>' + item.get('title') + ':  </strong>' +
      
                    '</li>';
    });

    $(this.el).html(outputHtml);
  }
});

$(function () {
  var todoInputView = new TodoInputView({collection: todos});
  todoListView = new TodoListView({collection: todos});
  todoListView.render();
});
