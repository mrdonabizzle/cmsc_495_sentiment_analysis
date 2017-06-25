var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var Q = require('../lib/sentiment_app/queue');
var log_factory = require('../lib/sentiment_app/logger');

describe("QUEUE:TEST [what are we testing about it]", function() {
  it("does the thing we expect", function(done) {
    Q.queue({
      "pkg": "ioredis",
      "host": "127.0.0.1",
      "password": null,
      "port": 6379,
      "database": 0
    }, // this is the connection configuration for a queue
    {}, // this is the jobs available
    log_factory('debug'), // this is the logger
    function(_queue) { // this is the callback which contains the actual queue
      // within this space we test that the queue works
    });
  });
});
