var TodoListView = Backbone.View.extend({
  tagName: 'div',
  className: 'list-group',
  initialize: function () {
    this.collection.on('add', this.render, this);
  },
  render: function () {
    var source =  '{{#data}}'+
                    '<a href="#" class="list-group-item">' +
                      '<h4 class="list-group-item-heading">{{title}}</h4>' +
                      '<p class="list-group-item-text">{{description}}</p>' +
                    '<a/>'+
                  '{{/data}}';

    var data = [];

    this.collection.models.forEach(function (item) {
      data.push({title: item.escape('title'), description: item.escape('description') })
    });

    var template = Handlebars.compile(source);

    this.$el.html(template(data))
  }
});
