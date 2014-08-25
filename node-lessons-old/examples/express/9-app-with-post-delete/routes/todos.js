var items = ["mow the lawn", "do the dishes", "paint the fence", "wax on, wax off"];

module.exports = {
  get: function (req, res) {
    res.render('todos', 
      { items:items,
        partials: { header: '../views/partials/_header', footer: '../views/partials/_footer'}
    });
  }, 
  post: function (req, res) {
    req.accepts('application/json');
    console.log(req.body.todo);
    items.push(req.body.todo);
    res.send(200, 'We added your todo');
  },
  del:  function (req, res) {
    var requestedId = req.params.id; // /todos/:id

    if (isNaN(requestedId)) {
      res.send(400, 'Invalid item id');
    } else if (!items[requestedId]) {
      res.send(404, 'Item not found');
    } else {
      items.splice(requestedId, 1);
      res.send(200, "OK: We deleted todo # " + requestedId);
    }
  }
};

//version 2 

var myToolkit = {};
myToolkit.get = function () {};
myToolkit.post = function () {};
myToolkit.delete = function () {};
module.exports = myToolkit;
