// EXERCISE 1 CHALLENGE 
// Make a new route with a corresponding view

var Router = Backbone.Router.extend({
  routes: {
    // left is route for url: so '' is equal to /  and   'home' is equal to /home
    // right side is rout handler function 
    '': 'home',
    'home': 'home'
  // CHALLENGE: define a route and a route handler function here
  },
  home: function () {
    this.homeView = new HomeView();
    this.homeView.render();
  },
  aboutHandler: function () {

  }
  // CHALLENGE: add a new route handler function here

}); 

var HomeView = Backbone.View.extend({
  el: 'body', // '#some-id' '.some-class'  'p'  // default :  'div'
  render: function () {
    $(this.el).html('<h1>Home page</h1>' + 
                    '<ul><li><a href = "/">Home</a></li>' + 
                    '<li><a href = "/#/about">About</a></li></ul>');
  }
});

// add a new view class here

//$(document).ready(function () {
  //do the things
//});

$(function () {
  window.app = new Router();
  Backbone.history.start();
}); 