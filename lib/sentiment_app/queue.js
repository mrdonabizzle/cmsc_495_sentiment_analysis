// This library will incorporate the queue management library available with
// node-resque

var NR = require('node-resque');

(function() {
  "use strict";

  //create an export for queue
  // similar to

// var queue = new NR.queue({connection: connectionDetails}, jobs);
// queue.on('error', function(error){ console.log(error); });
// queue.connect(function(){
//   queue.enqueue('math', "add", [1,2]);
//   queue.enqueue('math', "add", [1,2]);
//   queue.enqueue('math', "add", [2,3]);
//   queue.enqueueIn(3000, 'math', "subtract", [2,1]);
// });

// it should accept the connection details as an argument, and return the queue object

  //create an export for scheduler similar to this:
  //var scheduler = new NR.scheduler({connection: connectionDetails});
  //scheduler.connect(function(){
  //  scheduler.start();
  //});

})();
