module.exports = Backbone.View.extend({
  tagName: 'li',
  template: _.template('\
    <a href="#apples/<%= name %>" target="_blank">\
      <%= name %>\
    </a>&nbsp;<a class="add-to-cart" href="#">Buy</a>'),
  events: {
    'click .add-to-cart': 'addToCart'
  },
  render: function () {
    this.$el.html(this.template(this.model.attributes));
  },
  addToCart: function () {
    this.model.collection.trigger('addToCart', this.model);
  }
});
