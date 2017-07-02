var express = require('express'),
    app = express(),
    queue = require('lib/sentiment_app/queue'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    SentimentApp = require('./lib/sentiment_app');

(function() {
  // follow strict JavaScript syntax rules
  "use strict";

  // use bodyParser to retrieve the JSON body if a request in a consistent manner
  app.use(bodyParser.json());
  // configure bodyParser further for url encoding
  app.use(bodyParser.urlencoded({ extended: false }));
  // allow sessions to persist using cookies on request so that user sessions are not mixed up
  app.use(cookieParser());

  // invoke SentimentApp and integrate functionality into Express app
  var sentimental = new SentimentApp(app, 'config.json');

  // have express app listen over port 3000 on TCP
  app.listen(3000);
})();
