var ContactsInputView = Backbone.View.extend({
  //no more need for model property, collection handles that now
  el: '.form-group',
  events: {
    'click #add-contact': 'addContact'
  },
  addContact: function () {
    var $firstName = $(this.el).find('#first-name-input');
    var $lastName = $(this.el).find('#last-name-input');
    var $age = $(this.el).find('#age-input')
    console.log('button was clicked');
    var firstNameInput = $firstName.val();
    var lastNameInput = $lastName.val(); 
    var ageInput = $age.val()
    // add a new item to the collection
    this.collection.add({firstName: firstNameInput, lastName: lastNameInput, age: ageInput});

    $firstName.val(''); 
    $lastName.val('');
    $age.val('');
  }
});
