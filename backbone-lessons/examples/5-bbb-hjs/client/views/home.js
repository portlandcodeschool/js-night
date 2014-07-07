var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var template = require('../templates/home-template.hbs');

var AppleItemView = require('./apple-item');

module.exports = Backbone.View.extend({
  el: 'body',
  listEl: '.apples-list',
  cartEl: '.cart-box',
  initialize: function () {
    this.$el.html(template);
    this.collection.on('addToCart', this.showCart, this);  
  },
  showCart: function (appleModel) {
    $(this.cartEl).append(appleModel.attributes.name + '<br/>')
  },
  render: function () {
    var view = this;
    this.collection.each(function (apple){
      var appleSubView = new AppleItemView({model: apple});
      appleSubView.render();
      $(view.listEl).append(appleSubView.$el);  
    });
  }
});
