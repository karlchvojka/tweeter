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

  // ==> We can just get the results as an array all at once.
  db.collection('tweets').find().toArray((err, results) => {
    // lazy error handling
    if (err) throw err;

    // ==> We can iterate on the cursor to get results, one at a time:
    console.log('resulting array: ', results);

    // this is the end.
    db.close();
  });
  db.close();
})
