var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var todoEditTemplate = require('../../templates/todo-edit.hbs');
var Todo = require('../models/todo');

var TodoEditView = Backbone.View.extend({
  el: '#my-app',
  titleEl: '#todo-input',
  descriptionEl: '#description-input',
  events: {
    'click: #save-todo' : 'saveTodo',
    'keyup: input': 'setTodo'
  },
  $title: $(this.titleEl),
  $description: $(this.descriptionEl),
  template: todoEditTemplate,
  setTodo: function() {
    this.model.set({title: this.$title.val(), description: this.$description.val()});
    $('#list-title').val(this.data.title);
    $('#list-description').val(this.data.description);
  },
  saveTodo: function(){
    console.log('saving...')
    this.model.save();
    this.render();
  },
  render: function (options) {
    var this.model = new Todo({id: options.id});
    this.model.fetch({success: function (todo){
      var data = {title: todo.escape('title'), description: todo.escape('description') };
      $(this.el).html(this.template(data));
      $(this.titleEl).val(data.title);
      $(this.descriptionEl).val(data.description);
    }});
    console.log(this.model);

  }

});

module.exports = TodoEditView;
