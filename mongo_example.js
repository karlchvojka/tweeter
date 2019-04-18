'use strict';

const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://localhost:27017/tweeter';

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // Connect to mongodb and display.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ===> Refactored and wrapped as new, tweet-specific function:

  function getTweets(callback) {
    db.collection('tweets').find().toArray(callback);
  }

  getTweets((err, tweets) => {
    if (err) throw err;
    console.log('logging each tweet:');
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
  });
});
