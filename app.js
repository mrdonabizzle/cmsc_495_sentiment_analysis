var express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    SentimentApp = require('./lib/sentiment_app');

(function() {
  "use strict";

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  sentimental = SentimentApp(app, 'config.json');

  app.listen(3000);
})();
