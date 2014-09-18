// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Test Event methods.
 */


// Module Dependencies.
var assert = require('assert')
var nock = require('nock')
var token = 'sample_token'
var db = require('../lib-cov/client')(token)

var list = {
  "results": [
    {
      "path": {
        "collection": "users",
        "key": "sjkaliski@gmail.com",
        "type": "update",
        "timestamp": 1369832019085,
        "ordinal": 9,
        "ref": "ae3dfa4325abe21e"
      },
      "value": {
        "msg": "hello world, again"
      },
      "timestamp": 1369832019085,
      "ordinal": 9
    },
    {
      "path": {
        "collection": "users",
        "key": "sjkaliski@gmail.com",
        "type": "update",
        "timestamp": 1369832019080,
        "ordinal": 7,
        "ref": "f8a86a25029a907b"
      },
      "value": {
        "msg": "hello world"
      },
      "timestamp": 1369832019080,
      "ordinal": 7
    }
  ],
  "count": 2,
  "next": "/v0/collection/key/events/type/?limit=2&beforeEvent=1369832019080/7"
}

// Override http requests.
var fakeOrchestrate = nock('https://api.orchestrate.io')
  .get('/v0/users/sjkaliski%40gmail.com/events/update?limit=2')
  .reply(200, list)
  .get('/v0/users/sjkaliski%40gmail.com/events/update/1369832019085/9')
  .reply(200, list.results[0])
  .post('/v0/users/sjkaliski%40gmail.com/events/update')
  .reply(201)
  .put('/v0/users/sjkaliski%40gmail.com/events/update/1369832019085/9')
  .reply(201)
  .delete('/v0/users/sjkaliski%40gmail.com/events/update/1369832019085/9?purge=true')
  .reply(204)

suite('Event', function () {
  test('Get events', function (done) {
    db.newEventReader()
    .from('users', 'sjkaliski@gmail.com')
    .type('update')
    .limit(2)
    .list()
    .then(function (res) {
      assert.equal(res.statusCode, 200)
      // assert.deepEqual(res.body.results, list)
      done()
    })
  })

  test('Get event', function (done) {
    db.newEventReader()
    .from('users', 'sjkaliski@gmail.com')
    .time(1369832019085)
    .ordinal(9)
    .type('update')
    .get()
    .then(function (res) {
      assert.equal(res.statusCode, 200)
      assert.deepEqual(res.body, list.results[0])
      done()
    })
  })

  test('Create event', function (done) {
    db.newEventBuilder()
    .from('users', 'sjkaliski@gmail.com')
    .type('update')
    .data({
      "text": "Orchestrate is awesome!"
    })
    .create()
    .then(function (res) {
      assert.equal(res.statusCode, 201)
      done()
    })
  })

  test('Update event', function (done) {
    db.newEventBuilder()
    .from('users', 'sjkaliski@gmail.com')
    .type('update')
    .time(1369832019085)
    .ordinal(9)
    .data({
      "text": "Orchestrate is awesome!"
    })
    .update()
    .then(function (res) {
      assert.equal(res.statusCode, 201)
      done()
    })
  })

  test('Delete event', function (done) {
    db.newEventBuilder()
    .from('users', 'sjkaliski@gmail.com')
    .type('update')
    .time(1369832019085)
    .ordinal(9)
    .ref('ae3dfa4325abe21e')
    .remove()
    .then(function (res) {
      assert.equal(res.statusCode, 204)
      done()
    })
  })
})
