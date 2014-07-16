var TodoInputView = Backbone.View.extend({

  el: '.form-group',
  events: {
    'click #add-todo': 'addTodo'
  },
  addTodo: function () {
    var $todoInput = $(this.el).find('#todo-input');
    var $description = $(this.el).find('#description-input');

    var todoInput = $todoInput.val();
    var descriptionInput = $description.val();

    this.collection.create({title: todoInput, description: descriptionInput, creationDate: Date.now()}, {validate: true});
    $description.val(''); 
    $todoInput.val('');
  }
  
});
