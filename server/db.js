var mongoClient = require('mongodb').MongoClient,
	assert = require('assert');


var insertTweets = function(db, callback) {
  // Get the tweets collection
  var collection = db.collection('tweets');
  // Insert some documents
  collection.insert([
    {a : 1}
  ], function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the tweets collection");
    callback(result);
  });
}


var db_instance = null;

var db = {
	url : 'mongodb://localhost:27017/tweet_streams',
	init: function() {
		that = this;
		mongoClient.connect(this.url, function(err, db) {
			console.log("Connected to mongo");
			assert.equal(null, err);
			db_instance = db;
		});
	},
	insertTweet: function(tweet,callback) {
		if (db_instance === null) {
			return false;
		}
		var tweets = db_instance.collection('tweets');
		tweets.insert(tweet,function(err,result){
			assert.equal(err, null);
    		console.log("Inserted a document into the tweets collection");
    		callback(result);
		})
	}
}


module.exports = db;