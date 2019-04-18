'use strict';

const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://localhost:27017/tweeter';

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We have a connection to the 'test-tweets' db,
  // Starting here.

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==> Let's 'get all the tweets'. In Mongo-speak, we "find" them.
  db.collection('tweets').find({}, (err, results) => {
    // lazy error handling
    if (err) throw err;

    // ==> We can iterate on the cursor to get results, one at a time:
    console.log('For each item yeilded by the cursor:');
    results.toArray((err, resultsArray) => {
      if (err) throw err;

      console.log('results.toArray', resultsArray);
    });
    // this is the end.
    db.close();
  });
  db.close();
})
