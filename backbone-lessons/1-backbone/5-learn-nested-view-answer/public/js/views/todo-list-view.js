var TodoListView = Backbone.View.extend({
  tagName: 'div',
  className: 'list-group',
  initialize: function () {
    this.collection.on('add', this.render, this); // re-render on any change of the model
  },
  render: function () {
    // completely new render function
    var outputHtml = '';
    console.log(this);
    this.collection.models.forEach(function (item) {
      outputHtml += '<a href="#" class="list-group-item">'
      outputHtml += '<h4 class="list-group-item-heading">' + item.get('title') + '</h4>';
      outputHtml += '<p class="list-group-item-text">' + item.get('description') + '</p>';
      outputHtml += '<a/>'
    });

    $(this.el).html(outputHtml);
  }
});