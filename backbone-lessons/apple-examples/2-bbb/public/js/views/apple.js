module.exports = Backbone.View.extend({

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
    }, 2000);
  },
  render: function(appleName){
    var appleHtml = this.template(this.model);
    $('body').html(appleHtml);
  },
  showSpinner: function(){
    $('body').html(this.templateSpinner);        
  }
});