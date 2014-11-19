// Experimental; under construction!

var http = require("http"); // essential
var st = require('st'); // essential
var Router = require("routes-router"); // essential
//var pwd = require("pwd");
//var redirect = require("redirecter");
//var Session = require("generic-session");
//var MemoryStore = require("generic-session").MemoryStore;
var sendHtml = require("send-data/html"); // essential, also bring in send-data/json
var formBody = require("body/form"); // essential
var config = require('./config');
//var templates = require('./server-templates/compiled-templates');
var db = require('orchestrate')(config.dbKey); //essential
//var store = MemoryStore();
var stringify = require('json-stringify-safe');
var router = Router();




router.addRoute("/foo", function (req, res) {
    res.end("hello!")
})

router.addRoute("/bars/:barName", function (req, res, opts) {
    res.end("you request bars " + opts.params.barName)
})

/*
router.addRoute("/foos/:fooName", function (req, res, opts, cb) {
    db.get(opts.params.fooName, function (err, value) {
        if (err) return cb(err)

        res.end(JSON.stringify(value))
    })
})
*/

router.addRoute("/put/:key",function (req,res,opts,cb) {
    var key = opts.params.key;
    db.put('zifnab', key, {
        "value": key
    })
    .then(function (result) {
        console.log('key = '+key);
    })
    .fail(function (err) {
        console.log('kaboom');
    });
})

router.addRoute("/zifnab/:key",function (req,res,opts,cb) {
    db.get('zifnab',opts.params.key)
        .then(function(result){
            //var str = stringify(result);
            //console.log("result: "+ Object.keys(result));
            //console.log(stringify(result.body));
            res.end(stringify(result.body));
        })
        .fail(function(err){
            //throw err;
            console.log("err: "+err);
            //console.log("err: "+JSON.stringify(err))
        });
})

router.addRoute("/baz/:things", {
    GET: function (req, res, opts) {
        res.end("I will give you your thing:"+opts.params.things);
    },
    POST: function (req, res) {
        res.end("got your things")
    }
})

var server = http.createServer(router);
server.listen(3000);
console.log("example auth server listening on port 3000");
