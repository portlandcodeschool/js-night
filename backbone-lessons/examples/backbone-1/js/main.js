var app;

var Router = Backbone.Router.extend({
  routes: {
    '': 'home'
  },
  initialize: function () {

  },
  home: function () {
    this.homeView = new HomeView;
    this.homeView.render();
  }
}); 

var HomeView = Backbone.View.extend({
  el: 'body',
  template: _.template('Hello World'),
  render: function () {
    this.$el.html(this.template({}));
  }
});

$(function () {
  app = new Router;
  Backbone.history.start();
}); 