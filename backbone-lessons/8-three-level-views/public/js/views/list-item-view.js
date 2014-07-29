var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;


var listItemTemplate = require('../../templates/todo-list-item.hbs');
var TodoListItemView = Backbone.View.extend({
  tagName: 'a',
  className: 'list-group-item',
  initialize: function () {
    console.log('initializing an item view');
    //this.listenTo(this.model,'all', this.render);
    this.model.on('all', this.render, this);
    this.render();
  },
  events: {
    'click #delete': 'deleteTodo'
  },
  deleteTodo: function () {

    //TODO: figure out how to properly delete model 
    this.remove();
    this.model.destroy();
  },
  render: function () {
    var data = {title: this.model.escape('title'), description: this.model.escape('description') };

    this.$el.html(listItemTemplate(data));
  }
});

module.exports = TodoListItemView;