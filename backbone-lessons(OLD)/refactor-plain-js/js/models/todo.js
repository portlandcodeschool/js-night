// globals: app, jQuery, $, Backbone, _

(function () {

  app.TodoModel = Backbone.Model.extend({
    validate: function (attrs) {
      if (attrs.title.length < 1) {
        alert("no title provided");
        return "no title provided";
      }
      if (attrs.description.length < 1) {
        alert("no title provided");
        return "no description provided"; 
      }
    }
  });

})();