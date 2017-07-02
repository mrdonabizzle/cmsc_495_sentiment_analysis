// This is where we will instantiate the express.Router library to
// define the `/` as GET and `/data` as POST routes
var express = require('express'),
    router = express.Router(),
    queue = require('./queue');

(function(){
  // follow strict JavaScript syntax rules
  "use strict";

  module.exports = function(nconf, log) {
    // this will be exposed using the post route in the router
    router.post('/data', function(req,res) {
      // log any time a request occurs
      var job_data = {
        data: req.data,
        response: res
      };

      log.info('User requested analysis');
      // create a queue from the queue.js lib
      queue.queue(config, logger, function(queTpie){
        // with the callback of the queue lib, we connect to the returned queue
        queTpie.connect(function(){
          // finally, we enqueue the requested analysis job
          queTpie.enqueue('sentiment', 'analyze', job_data);
        });
      });
    });

    return router;

  };
})();
