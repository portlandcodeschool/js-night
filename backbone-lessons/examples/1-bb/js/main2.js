var app;

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

var Router = Backbone.Router.extend({
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
  loadApple: function (appleName) {
    this.appleView.render(appleName);
  }

}); 

var HomeView = Backbone.View.extend({
  el: 'body',
  template: _.template('Apple Data: <%= data %>'),
  render: function () {
    this.$el.html(this.template({
      data: JSON.stringify(this.collection.models)
    }));
  }
});

var Apples = Backbone.Collection.extend({});


var AppleView = Backbone.View.extend({
  template: _.template('<figure>\
                          <img src="<%= attributes.url %>"/>\
                          <figcaption><%= attributes.name %></figcaption>\
                      </figure>'),
  render: function(appleName){
    var appleModel = this.collection.where({name:appleName})[0];
    var appleHtml = this.template(appleModel);
    $('body').html(appleHtml);
  }
});



$(function () {
  app = new Router;
  Backbone.history.start();
}); 