var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;


//CHALLENGE: "bring in" the appropriate template for this view
var myTemplate = require('../../templates/todo-list.hbs'); //ANSWER

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
