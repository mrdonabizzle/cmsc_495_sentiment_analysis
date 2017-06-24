// This is where we will instantiate the express.Router library to
// define the `/` as GET and `/data` as POST routes
var queue = require('./queue');

queue.queue(config, jobs, logger, function(queTpie){
  queTpie.connect(function(){
    queTpie.enqueue('sentiment', 'analyze', []);
  })
})

queue.scheduler(config, jobs, logger, function(scheduler){
  scheduler.connect(function(){
    scheduler.start();
  })
})

// queue.connect(function(){
//   queue.enqueue('math', "add", [1,2]);
//   queue.enqueue('math', "add", [1,2]);
//   queue.enqueue('math', "add", [2,3]);
//   queue.enqueueIn(3000, 'math', "subtract", [2,1]);
// });
