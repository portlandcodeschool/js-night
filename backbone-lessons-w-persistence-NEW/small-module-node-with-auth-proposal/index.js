var http = require("http"); // essential
var st = require('st'); // essential
var Router = require("routes-router"); // essential
var pwd = require("pwd");
var redirect = require("redirecter");
var Session = require("generic-session");
var MemoryStore = require("generic-session").MemoryStore;
var sendHtml = require("send-data/html"); // essential, also bring in send-data/json
var formBody = require("body/form"); // essential
var config = require('./config');
var templates = require('./server-templates/compiled-templates');
var db = require('orchestrate')(config.dbKey); //essential

var store = MemoryStore();
var router = Router();

function createUser (user, password) {
  pwd.hash(password, function (err, salt, hash) {
    if (err) {
      throw err
    }
    user.salt = salt;
    user.hash = String(hash);

    db.put('users', user.name, user)
    .then(function (result) {
      console.log("success!")
    })
    .fail(function (err) {
      console.error(err);
    })
  })
}

//uncomment to create a user
//createUser({name: "steve"}, "123"); 

function authenticate(name, password, callback) {
  db.get('users', name)
    .then(function(result){
      var user = result.body;
        if (!user) {
          return callback(new Error("cannot find user"))
        }

      pwd.hash(password, user.salt, function (err, hash) {
        if (err) {
          return callback(err)
        }

        if (String(hash) === user.hash) {
          return callback(null, user)
        }

        callback(new Error("invalid password"))
      })
    })
    .fail(function (err) {
      console.error(err);
    });
}

function restrict(handler) {
  return function (req, res, opts, callback) {
    var session = Session(req, res, store)
    session.get("user", function (err, user) {
      if (err) {
        return callback(err)
      }

      if (!user) {
        return session.set("message", {
          text: "Please enter your login credentials",
          type: "error"
        }, 
        function (err) {
          if (err) {
            return callback(err)
          }
          redirect(req, res, "/login")
        })
      }

      handler(req, res, opts, callback)
    })
  }
}

router.addRoute("/", restrict(function (req, res) {
  var session = Session(req, res, store)
  session.get("user", function (err, user) {
    var message = "Welcome " + user.name.toString();
    sendHtml(req, res, templates.index({message:message}));
  });
}));

router.addRoute("/public/*", st({
  path: __dirname + "/public",
  url: "/public"
}));

router.addRoute("/logout", function (req, res, opts, callback) {
  var session = Session(req, res, store)

  session.destroy(function (err) {
    if (err) {
      return callback(err)
    }

    redirect(req, res, "/login")
  });
});

router.addRoute("/login", {
  GET: function (req, res, opts, callback) {
    var session = Session(req, res, store)

    session.get("message", function (err, doc) {
      if (err) {
          return callback(err)
      }

      var message = ""
      if (doc && doc.type === "error") {
        message = "<p class='msg error'>" + doc.text + "</p>"
      }
      if (doc && doc.type === "success") {
        message = "<p class='msg success'>" + doc.text + "</p>"
      }

      session.del("message", function (err) {
        if (err) {
            return callback(err)
        }

        sendHtml(req, res, templates.login({ message: message }))
      })
    })
  },
  POST: function (req, res, opts, callback) {
    formBody(req, res, function (err, body) {
      if (err) {
        return callback(err)
      }

      authenticate(body.username, body.password, function (err, user) {
        var session = Session(req, res, store)

        if (err || !user) {
          return session.set("message", {
            type: "error",
            text: "Authentication failed, pleace check your " +
              " username and password."
          }, function (err) {
            if (err) {
              return callback(err)
            }

            redirect(req, res, "/login")
          })
      }

      session.del(function (err) {
        if (err) {
            return callback(err)
        }

        session.set("user", user, function (err) {
            if (err) {
              return callback(err)
            }

            session.set("message", {
              type: "success",
              text: "Authenticated as " + user.name +
                  " click to <a href='/logout'>logout</a>. "
            }, function (err) {
              if (err) {
                  return callback(err)
              }

              redirect(req, res, "/")
            })
          })
        })
      })
    })
  }
});

var server = http.createServer(router);
server.listen(3000);
console.log("example auth server listening on port 3000");
