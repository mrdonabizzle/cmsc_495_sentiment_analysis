// This library will incorporate the queue management library available with
// node-resque

var NR = require('node-resque');

(function() {
  // follow strict JavaScript syntax rules
  "use strict";

  // the queue export provides a return of a node-resque queue
  // this will accept a configuration, job list, and a logger which performs unified logging
  // the callback will contain the queue which is then implemented by the invoking function
  exports.queue = function(config, jobs, logger, callback) {
    var queTpie = new NR.queue({connection: config}, jobs);
    queTpie.on('error', function(error) {
      logger.error('Queue Error: ',{error:error});
    });
    callback(queTpie);
  };

  // the scheduler export provides a return of a node-resque scheduler
  // It accepts a configuration, job list for its worker, and a logger which performs unified logging
  // the callback will contain a scheduler which is then implemented by the invoking function
  exports.scheduler = function(config, jobs, logger, callback) {
    var scheduler = new NR.scheduler({connection: config}, jobs);
    scheduler.on('error', function(error) {
      logger.error('Scheduler Error: ',{error:error});
    });
    callback(scheduler);
  };

})();
