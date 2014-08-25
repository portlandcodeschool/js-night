var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var todoEditTemplate = require('../../templates/todo-edit.hbs');

var TodoEditView = Backbone.View.extend({
  data: {id: this.model.get('id'), title: this.model.escape('title'), description: this.model.escape('description') };,
  el: '#my-app',
  titleEl: '#todo-input',
  descriptionEl: '#description-input',
  events: {
    'click: save-todo' : 'saveTodo',
    'keyup: input': 'setTodo'
  },
  $title: $(this.titleEl),
  $description: $(this.descriptionEl),
  template: todoEditTemplate,
  initialize: function (){
    this.listenTo(this.model, 'change', this.render);
    window.thisModel = this.model;
  },
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
  render: function () {
    $(this.el).html(this.template(this.data));
    $(this.titleEl).val(this.data.title);
    $(this.descriptionEl).val(this.data.description);
  }

});

module.exports = TodoEditView;
