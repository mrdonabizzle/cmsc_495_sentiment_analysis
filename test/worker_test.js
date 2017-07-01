var sentiment = require('sentiment');
var util = require('util');
var sentiments = ["When a father gives to his son,",
                  "both laugh;",
                  "when a son gives to his father,",
                  "both cry."];

var overall = 0;
var processed_sentiments = [];

for(sent in sentiments) {
  var result = sentiment(sentiments[sent]);
  console.log(result);
  overall += result.score;
  processed_sentiments.push(
    {
      "score": result.score,
      "sentence": sentiments[sent]
    }
  );

};
console.log(overall/sentiments.length);
console.log(util.inspect(processed_sentiments));
