var queue = require('./lib/sentiment_app/queue'),
    nconf = require('nconf'),
    log_factory = require('./sentiment_app/logger');

(function() {
  // follow strict JavaScript syntax rules
  "use strict";

  nconf.file({ file: configFile });
  var log_lvl = nconf.get("log:level");


})();
