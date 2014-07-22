var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;


var myTemplate = require('../../templates/todo-list.hbs');

var TodoListView = Backbone.View.extend({
  tagName: 'div',
  className: 'list-group',
  initialize: function () {
    this.collection.on('add', this.render, this);
  },
  render: function () {

    var data = [];
    window.todosData = data;
    this.collection.models.forEach(function (item) {
      data.push({id: item.get('id'), title: item.escape('title'), description: item.escape('description') });
    });

    this.$el.html(myTemplate({todoData:data}));
  }
});

module.exports = TodoListView;
