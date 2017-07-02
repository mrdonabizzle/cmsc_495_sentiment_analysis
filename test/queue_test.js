var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var Q = require('../lib/sentiment_app/queue');
var log_factory = require('../lib/sentiment_app/logger');

var sentiments = ["When a father gives to his son,",
                  "both laugh;",
                  "when a son gives to his father,",
                  "both cry."];

describe("QUEUE:TEST with a queue", function() {
  it("enqueues a simple job", function(done) {
    Q.queue({
      "pkg": "ioredis",
      "host": "127.0.0.1",
      "password": null,
      "port": 6379,
      "database": 0
    }, // this is the connection configuration for a queue
    log_factory('debug'), // this is the logger
    function(_queue) { // this is the callback which contains the actual queue
      _queue.connect(function(){
        // finally, we enqueue the requested analysis job
        var current = 0;
        _queue.length('sentiment', function(err, res) {
          console.log(res);
          current += res;
        });
        _queue.enqueue('sentiment', 'analyze', sentiments, function(res, err) {
          _queue.length('sentiment', function(erro, resp) {
            console.log(resp);
            if (resp > current) {
              done();
            } else {
              done("queue not bumped by 1");
            }
          });
        });
      });
    });
  });
});
