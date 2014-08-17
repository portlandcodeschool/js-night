// globals: app, jQuery, $, Backbone, _

(function () {

  app.TodoListView = Backbone.View.extend({
    tagName: 'div',
    className: 'list-group',
    initialize: function () {
      this.collection.on('add', this.render, this);
    },
    render: function () {

      var outputHtml = '';

      this.collection.models.forEach(function (item) {
        outputHtml += '<li href="#" class="list-group-item">' +
        '<h4 class="list-group-item-heading">' + item.escape('title') + '</h4>' +
        '<p class="list-group-item-text">' + item.escape('description') + '</p>' +
        '</li>';
      });

      $(this.el).html(outputHtml);
    }
  });

})();
