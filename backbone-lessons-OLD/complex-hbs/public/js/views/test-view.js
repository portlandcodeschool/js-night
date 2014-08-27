var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var testTemplate = require('../../templates/test.hbs');

var Todos = require('../collections/todos');

var adventureData = [
  [ {address: 'blah', img: 'blah', name: 'blah', phone: 503},
    {address: 'wah', img: 'wah', name: 'wah', phone: 626}],
  [ {address: 'nah', img: 'nah', name: 'nah', phone: 503},
    {address: 'ah', img: 'ah', name: 'ah', phone: 714}]
];

var TodoMainView = Backbone.View.extend({
  el: '#my-app',
  initialize: function () {

  },
  render: function () {
    var wholeTemplate = '';
    adventureData.forEach(function (item){
      wholeTemplate += testTemplate({adventure: item});
    });
    this.$el.html(wholeTemplate);
  }

});

module.exports = TodoMainView;
