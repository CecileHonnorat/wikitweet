var express = require('express');
var request = require('sync-request');

var mongoose = require('mongoose');
const tweetModel = require('../models/tweets');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Création d'un tweet
router.post('/sendtweet', async function(req, res, next){

  let newTweet = await tweetModel({
    authorName : req.body.authorName,
    content: req.body.content,
    date : Date.now()
  })

  let tweetSaved = await newTweet.save()

  res.json({result: true, tweetSaved})
})


// Récupération des tweets
router.get('/alltweets', async function(req, res, next){

  let allTweets = await tweetModel.find()

  res.json({result: true, allTweets})
})

// Récupération des tweets en fonction d'un auteur
router.get('/tweets/:authorName', async function(req, res, next){

  let authorTweets = await tweetModel.find({authorName: req.params.authorName})

  res.json({result: true, authorTweets})
})
module.exports = router;
