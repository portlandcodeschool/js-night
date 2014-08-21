// globals: app, jQuery, $, Backbone, _

(function () {

  app.TodosCollection = Backbone.Collection.extend({
    model: app.TodoModel,
    comparator: 'creationDate'
  });

})();