// This library will incorporate the queue management library available with
// node-resque

var NR = require('node-resque');
var sentiment = require('sentiment');

(function() {
  // follow strict JavaScript syntax rules
  "use strict";

  var jobs = {
    "analyze": {
      perform: function(sentiment_req) {
        var overall = 0;
        var processed_sentiments = [];

        var sentiments = sentiment_req.data;

        if (sentiments.length === 0) {
          sentiment_req.response.send("No sentences provided!!!");
        }

        for(var sent in sentiments) {
          var result = sentiment(sentiments[sent]);
          overall += result.score;
          processed_sentiments.push(
            {
              "score": result.score,
              "sentence": sentiments[sent]
            }
          );
        }
        sentiment_req.response.json({
          "overall": overall / sentiments.length,
          "processed_sentiments": processed_sentiments
        });
      }
    }
  };

  // the queue export provides a return of a node-resque queue
  // this will accept a configuration, job list, and a logger which performs unified logging
  // the callback will contain the queue which is then implemented by the invoking function
  exports.queue = function(config, logger, callback) {
    var queTpie = new NR.queue({connection: config}, jobs);

    // error logging statement
    queTpie.on('error', function(error) {
      logger.error('Queue Error: ',{error:error});
    });
    callback(queTpie);
  };

  // the scheduler export provides a return of a node-resque scheduler
  // It accepts a configuration, job list for its worker, and a logger which performs unified logging
  // the callback will contain a scheduler which is then implemented by the invoking function
  exports.scheduler = function(config, logger, callback) {
    var scheduler = new NR.scheduler({connection: config}, jobs);

    // error logging statment
    scheduler.on('error', function(error) {
      logger.error('Scheduler Error: ', {error: error});
    });

    // debug logging statements
    scheduler.on('start', function() {
      logger.debug("scheduler started");
    });
    scheduler.on('end', function() {
      logger.debug("scheduler ended");
    });
    scheduler.on('poll', function() {
      logger.debug("scheduler polling");
    });

    callback(scheduler);
  };

  exports.worker = function(config, logger, callback) {
    var worker = new NR.worker({connection: config, queues: ['sentiment']}, jobs);

    // error and info logging
    worker.on('error', function(error) {
      logger.error('Worker Error: ', {error: error});
    });
    worker.on('success', function(queue, job, result){
      logger.info("job success " + queue + " " + JSON.stringify(job) + " >> " + result); }
    );
    worker.on('failure', function(queue, job, failure){
      logger.info("job failure " + queue + " " + JSON.stringify(job) + " >> " + failure);
    });

    // debugging log statements
    worker.on('start', function(){
      logger.debug("worker started");
    });
    worker.on('end', function(){
      logger.debug("worker ended");
    });
    worker.on('cleaning_worker', function(worker, pid){
      logger.debug("cleaning old worker " + worker);
    });
    worker.on('poll', function(queue){
      logger.debug("worker polling " + queue);
    });
    worker.on('job', function(queue, job){
      logger.debug("working job " + queue + " " + JSON.stringify(job));
    });

    callback(worker);
  };

})();
