(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = Backbone.Collection.extend({});

},{}],2:[function(require,module,exports){
var Router = require('./router');

window.app = new Router();
Backbone.history.start();

},{"./router":3}],3:[function(require,module,exports){
var HomeView = require('./views/home');
var AppleView = require('./views/apple');
var Apples = require('./collections/apples');
var appleData = [
  {
    name: "fuji",
    url: "img/fuji.jpg"
  },
  {
    name: "gala",
    url: "img/gala.jpg"
  }      
];

module.exports = Backbone.Router.extend({
  routes: {
    '': 'home',
    'apples/:appleName': 'loadApple'
  },
  initialize: function () {
    var apples = new Apples();
    apples.reset(appleData); //Backbone automatically creates models
                             //inside of our collection when we use
                             //reset or fetch
    this.homeView = new HomeView({collection: apples});
    this.appleView = new AppleView({collection: apples});
  },
  home: function () {
    this.homeView.render();
  },

  loadApple: function(appleName){
    this.appleView.loadApple(appleName);
  }

});

},{"./collections/apples":1,"./views/apple":5,"./views/home":6}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
module.exports = Backbone.View.extend({

  initialize: function () {
    this.model = new (Backbone.Model.extend({}));
    this.model.on('change', this.render, this);
    this.on('spinner', this.showSpinner, this);
  },
  templateSpinner: '<img src="img/spinner.gif" width="30">',
  template: _.template('<figure>\
                          <img src="<%= attributes.url %>"/>\
                          <figcaption><%= attributes.name %></figcaption>\
                      </figure>'),
  loadApple: function (appleName) {
    this.trigger('spinner');
    var view = this;
    setTimeout(function () {
      view.model.set(view.collection.where({
        name: appleName
      })[0].attributes);
    }, 2000);
  },
  render: function(appleName){
    var appleHtml = this.template(this.model);
    $('body').html(appleHtml);
  },
  showSpinner: function(){
    $('body').html(this.templateSpinner);        
  }
});
},{}],6:[function(require,module,exports){
var AppleItemView = require('./apple-item');

module.exports = Backbone.View.extend({
  el: 'body',
  listEl: '.apples-list',
  cartEl: '.cart-box',
  template: _.template('\
    Apple data: \
      <ul class="apples-list">\
      </ul>\
    <div class="cart-box"></div>'),
  initialize: function () {
    this.$el.html(this.template);
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

},{"./apple-item":4}]},{},[2])