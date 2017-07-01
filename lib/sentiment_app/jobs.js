var sentiment = require('sentiment');

(function() {
  // follow strict JavaScript syntax rules
  "use strict";

  exports.jobs = {
    "analyze": {
      perform: function(sentiments, callback) {
        var overall = 0;
        var processed_sentiments = [];

        if (sentiments.length === 0) {
          callback("No sentences provided!!!", null);
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
        callback(null,
          {
            "overall": overall / sentiments.length,
            "processed_sentiments": processed_sentiments
          }
        );
      }
    }
  };

})();
