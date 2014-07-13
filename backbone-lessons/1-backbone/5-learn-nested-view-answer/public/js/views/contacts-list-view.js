var TodoListView = Backbone.View.extend({
  el: '#todo-list',
  initialize: function () {
    this.collection.on('add', this.render, this); // re-render on any change of the model
  },
  render: function () {
    // completely new render function
    var outputHtml = '';

    this.collection.models.forEach(function (item) {
      outputHtml += '<li class="list-group-item"><strong>' + item.get('title') + '</strong></li>';
      outputHtml += '<li class="list-group-item">&nbsp;&nbsp-' + item.get('description') + '</li>';
    });

    $(this.el).html(outputHtml);
  }
});