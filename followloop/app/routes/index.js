var express = require('express');
var router = express.Router();

var github = new require('github')({});

var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGO_URI;

/* GET followers. */
router.get('/followers/:user', function(req, res, next) {
	// authenticate github
	github.authenticate({
    type: 'basic',
    username: process.env.G_USR,
    password: process.env.G_PWD
	});

	// get api call
	github.users.getFollowingForUser({
		username: req.params.user
	}, function (err, data) {
		if (err) return next(err);
		res.json(data);
	});
});

/* POST history. */
router.post('/history', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		if (err) return next(err);
		db.collection('history').insertOne(req.body, function (err, _) {
			if (err) return next(err);
			db.close();
			res.json({});
  	});
	});
});

/* GET history */
router.get('/history', function (req, res, next) {
	MongoClient.connect(url, function(err, db) {
	  if (err) return next(err);
	  db.collection('history').find({}).toArray(function(err, result) {
	    if (err) throw err;
	    db.close();
	    res.json(result);
	  });
	});
})

module.exports = router;
