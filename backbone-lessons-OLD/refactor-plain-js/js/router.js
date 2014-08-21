// globals: app, jQuery, $, Backbone, _

(function () {

  app.Router = Backbone.Router.extend({
    routes: {
      '': 'todos',
      'contacts': 'contacts'
    },
    todos: function () {
      var todoMainView = new app.TodoMainView();
      todoMainView.render();
    }
  });

})();