app.templates = {};

app.templates.main = _.template(
  '<h1><i class="fa fa-check-square-o"></i> Todos</h1>' +
    '<form class="pure-form pure-form-stacked" id="todo-form">' +
      '<fieldset>' +
        '<div class="pure-control-group">' +
          '<label for="todo-input">Todo Title</label>' +
          '<input id="todo-input" class="form-control" type="text">' +
        '</div>' +
        '<div class="pure-control-group">' +
          '<label for="description-input">Todo Description</label>' +
          '<input id="description-input" class="form-control" type="text">' +                 
        '</div>' +
        '<div class="pure-controls">' +
          '<button id="add-todo" class="pure-button">Add todo</button>' +
        '</div>' +
       '</fieldset>' +
    '</form>' +
    '<br><br>' +
    '<h3>My Todos</h3>' +
    '<ol id="todo-list">' +
    '</ol>');

app.templates.listItem = _.template('<li><strong>{{title}}: </strong>{{description}}</li>');