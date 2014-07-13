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
