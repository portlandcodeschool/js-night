var Todo = Backbone.Model.extend({
  validate: function (attrs) {
    if (attrs.title.length < 1) {
      alert("no title provided");
      return "no title provided";
    }
    if (attrs.description.length < 1) {
      alert("no title provided");
      return "no description provided";  // need to return something for validation to stop bad inputs
                                        // don't return anything when things are good 
    }
  }
});
      
var Todos = Backbone.Collection.extend({
  model: Todo,
  url: '/api/todos',
  comparator: 'creationDate'
});

var todos = new Todos();

var Contact = Backbone.Model.extend({
  validate: function (attrs) {
    if (attrs.firstName.length < 1) {
      alert("no first name provided");
      return "no first name provided";
    }
    if (attrs.lastName.length < 1) {
      alert("no last name provided");
      return "no last name provided";
    }
    if (attrs.age.length < 1) {
      alert("no age provided");
      return "no age provided";
    }
  }
});

var Contacts = Backbone.Collection.extend({
  model: Contact,
  comparator: 'age'
});

var contacts = new Contacts();

contacts.add([
  { firstName: 'Ben',
    lastName: 'Verble',
    age: 31 },
  { firstName: 'Jon',
    lastName: 'Bon Jovi',
    age: 52 },
  { firstName: 'Ella',
    lastName: 'Marija Lani Yelich-O\'Connor (aka Lorde)',
    age: 18 }
]);

// contacts.models.forEach(function (item, index){
//   console.log('item\'s cid :' + item.cid);
//   console.log(item);
//   console.log(item.toJSON());
// });

var Router = Backbone.Router.extend({
  routes: {
    '': 'todos',
    'contacts': 'contacts'
  },
  todos: function () {
    this.todoMainView = new TodoMainView({collection: todos});
    this.todoMainView.render();
  }, 
  contacts: function () {
    this.contacstMainView = new ContactsMainView({collection: contacts});
    this.contacstMainView.render();
  }

}); 

$(function () {
  window.app = new Router();
  Backbone.history.start();
}); 