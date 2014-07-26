var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;


var myTemplate = require('../../templates/todo-list-item.hbs');
var TodoListView = Backbone.View.extend({
  el: 'a',
  className: 'list-group-item',
  initialize: function () {
    this.listenTo(this.model,'change', this.render);
  },
  render: function () {

    var data = {title: this.model.escape('title'), description: this.model.escape('description') };

    this.$el.html(myTemplate(data));
  }
});

module.exports = TodoListView;
