// Make a new subclass (Todo) of Backbone.Model:
var Todo = Backbone.Model.extend({});

// Make a model (one instance of class Todo):
var todo1 = new Todo({
  title: 'mow the lawn'
});

// CHALLENGE: Create a new todo instance

console.log(todo1.attributes);

// CHALLENGE: Log your new todo to the browser console to see its properties

var HomeView = Backbone.View.extend({
  el: '#my-app',
  render: function () {
    $(this.el).html('<h1><i class="fa fa-check-square-o"></i> Todos</h1>' + 
                    '<ol><li>' + todo1.get('title') + '</li>' + //CHALLENGE: add another li 
                    '</ol>');                             // with your new todo's title
  }
});

$(function () {
  var homeView = new HomeView();
  homeView.render();
});


// GROUP CHALLENGE: get into a group and talk about the parts of this code
// that do not make sense to you
