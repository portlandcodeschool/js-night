// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Test Key-Value methods.
 */


// Module Dependencies.
var assert = require('assert')
var nock = require('nock')
var token = 'sample_token'
var db = require('../lib-cov/client')(token)

// Mock data.
var users = {
  steve: {
    "name": "Steve Kaliski",
    "email": "sjkaliski@gmail.com",
    "location": "New York",
    "type": "paid",
    "gender": "male"
  },
  david: {
    "name": "David Byrd",
    "email": "byrd@bowery.io",
    "location": "New York",
    "type": "paid",
    "gender": "male"
  },
  kelsey: {
    "name": "Kelsey Jarblenkins",
    "email": "kelsey@jarblenkins.com",
    "location": "Boston, MA",
    "type": "free",
    "gender": "genderqueer"
  }
}

var refsList = {
  "count": 3,
  "results": [
    {
      "path": {
        "collection": "users",
        "key": "sjkaliski@gmail.com",
        "ref": "cbb48f9464612f20"
      },
      "value": {},
      "reftime": 1400085119216
    },
    {
      "path": {
        "collection": "users",
        "key": "sjkaliski@gmail.com",
        "ref": "",
        "tombstone": true
      },
      "reftime": 1400085117084
    },
    {
      "path": {
        "collection": "users",
        "key": "sjkaliski@gmail.com",
        "ref": "cbb48f9464612f20"
      },
      "value": {},
      "reftime": 1400085084739
    }
  ]
}

var listResponse = {
  "count": 1,
  "next": "/v0/users?limit=2&afterKey=002",
  "results": [{value: users.steve}]
}

var page2Response = {
  "count": 1,
  "results": [{value: users.david}]
}

// Override http requests.
var fakeOrchestrate = nock('https://api.orchestrate.io/')
  .get('/v0/users/sjkaliski%40gmail.com')
  .reply(200, users.steve)
  .get('/v0/users/sjkaliski%40gmail.com/refs/o231ou3hf')
  .reply(200, users.steve)
  .get('/v0/users/sjkaliski%40gmail.com/refs')
  .reply(200, refsList, {'Link':'</v0/users/sjkaliski%40gmail.com/refs?limit=2&afterKey=002>; rel="next"'})
  .get('/v0/users')
  .reply(200, listResponse, {'Link':'</v0/users?limit=2&afterKey=002>; rel="next"'})
  .post('/v0/users')
  .reply(201)
  .put('/v0/users/byrd%40bowery.io')
  .reply(201)
  .put('/v0/users/byrd%40bowery.io')
  .reply(201)
  .delete('/v0/users/byrd%40bowery.io')
  .reply(204)
  .delete('/v0/users/byrd%40bowery.io?purge=true')
  .reply(204)
  .get('/v0/users?afterKey=002')
  .reply(200, page2Response)

suite('Key-Value', function () {
  test('Get value by key', function (done) {
    db.get('users', 'sjkaliski@gmail.com')
    .then(function (res) {
      assert.equal(200, res.statusCode)
      assert.deepEqual(users.steve, res.body)
      done()
    })
  })

  test('Get value by key and ref', function (done) {
    db.get('users', 'sjkaliski@gmail.com', 'o231ou3hf')
    .then(function (res) {
      assert.equal(200, res.statusCode)
      assert.deepEqual(users.steve, res.body)
      done()
    })
  })

  test('List refs for a key', function (done) {
    db.list_refs('users', 'sjkaliski@gmail.com')
    .then(function (res) {
      assert.equal(200, res.statusCode)
      assert.deepEqual(users.steve.email, res.body.results[0].path.key)
      assert.equal(true, typeof res.links.next.get == 'function')
      done()
    })
  })

  test('Get list of values by collection name', function (done) {
    db.list('users')
    .then(function (res) {
      assert.equal(200, res.statusCode)
      assert.deepEqual(users.steve, res.body.results[0].value)
      assert.equal(true, typeof res.links.next.get == 'function')
      done()
    })
  })

  test('Store value without key', function (done) {
    db.post('users', users.kelsey)
    .then(function (res) {
      assert.equal(201, res.statusCode);
      done();
    });
  })

  test('Store value at key', function (done) {
    db.put('users', 'byrd@bowery.io', users.david)
    .then(function (res) {
      assert.equal(201, res.statusCode)
      done()
    })
  })

  test('Store value at key with conditional', function (done) {
    db.put('users', 'byrd@bowery.io', users.david, false)
    .then(function (res) {
      assert.equal(201, res.statusCode)
      done()
    })
  })

  test('Remove value by key', function (done) {
    db.remove('users', 'byrd@bowery.io')
    .then(function (res) {
      assert.equal(204, res.statusCode)
      done()
    })
  })

  test('Remove value by key and purge', function (done) {
    db.remove('users', 'byrd@bowery.io', true)
    .then(function (res) {
      assert.equal(204, res.statusCode)
      done()
    })
  })

  test('Request collection items afterKey', function (done) {
    db.list('users', {afterKey:'002'})
    .then(function (res) {
      assert.equal(200, res.statusCode)
      assert.deepEqual(users.david, res.body.results[0].value)
      done()
    })
  })
})
