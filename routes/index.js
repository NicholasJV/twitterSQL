var express = require('express')

var router = express.Router()

var tweetbank = require('../tweetbank')

var Sequelize = require('sequelize');

//connect to our index.js database setup in models:
var dbConnect = require('../models/');

module.exports = router

// home
router.get('/', function(req, res, next) {
	var tweets = [];
	dbConnect.Tweet.findAll({ include: [ dbConnect.User ]})
	.then(function(tweetRows) {
		// tweetsOnly = tweetRows.map(function(tweetObj){
		// 	return tweetObj.tweet
		// })
	  // JSONtweets = (JSON.stringify(tweetRows, null, 2));
	  // console.log("tweets:", tweetRows);
	  // console.log("JSONtweets:", JSONtweets);
	  // console.log("TweetsRows:", JSON.stringify(tweetRows, null, 2));
	  res.render('index', { tweets: tweetRows, showForm:true } );
	})
})

// make a tweet
router.post('/', function(req, res, next) {
  // res.status(201).json(tweetbank.add(req.body.name, req.body.tweet))
  res.redirect('/')
})

// getting all tweets from user
router.get('/users/:name', function(req, res, next) {
  var tweets = tweetbank.find(req.params)
  // res.json(tweets)
  res.render('index', { tweets: tweets })
})

// get a single tweet
router.get('/users/:name/tweets/:id', function(req, res, next) {
  req.params.id = Number(req.params.id)
  var tweets = tweetbank.find(req.params)
  res.render('index',{ tweets: tweets})
})










