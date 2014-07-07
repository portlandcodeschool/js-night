var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var template = require('../templates/apple-item.hbs');

module.exports = Backbone.View.extend({
  tagName: 'li',
  events: {
    'click .add-to-cart': 'addToCart'
  },
  render: function () {
    this.$el.html(template(this.model.attributes));
  },
  addToCart: function () {
    this.model.collection.trigger('addToCart', this.model);
  }
});
