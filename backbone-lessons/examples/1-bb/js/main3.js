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

  loadApple: function(appleName){
    this.appleView.loadApple(appleName);
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
    }, 5000);
  },
  render: function(appleName){
    var appleHtml = this.template(this.model);
    $('body').html(appleHtml);
  },
  showSpinner: function(){
    $('body').html(this.templateSpinner);        
  }
});



$(function () {
  app = new Router;
  Backbone.history.start();
}); 