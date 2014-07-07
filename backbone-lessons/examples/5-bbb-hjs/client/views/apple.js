var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var template = require('../templates/apple.hbs');

module.exports = Backbone.View.extend({

  initialize: function () {
    this.model = new (Backbone.Model.extend({}));
    this.model.on('change', this.render, this);
    this.on('spinner', this.showSpinner, this);
  },
  templateSpinner: '<img src="img/spinner.gif" width="30">',
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
    var appleHtml = template(this.model.attributes);
    $('body').html(appleHtml);
  },
  showSpinner: function(){
    $('body').html(this.templateSpinner);        
  }
});