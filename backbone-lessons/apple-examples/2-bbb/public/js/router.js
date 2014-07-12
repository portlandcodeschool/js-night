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
