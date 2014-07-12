// EXERCISE 3

var Todo = Backbone.Model.extend({});

var todo1 = new Todo({
  title: 'mow the lawn'
});

console.log(todo1.attributes);

var Router = Backbone.Router.extend({
  routes: {
    '': 'home'
  },
  home: function () {
    this.homeView = new HomeView();
    this.homeView.render();
  }

}); 

var HomeView = Backbone.View.extend({
  el: 'body',
  model: todo1,
  initialize: function () {
    this.model.on('change:title', this.render, this); //re-render only on title change of the model
    // this.model.on('change', this.render, this); // re-render on any change of the model
  },
  render: function () {

    $(this.el).html('<h1>Todos</h1>' + 
                    '<ol><li>' + this.model.get('title') + '</li></ol>');
    //console.log('changed the page without a reload');
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
}); 