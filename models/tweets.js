const mongoose = require('mongoose');
const { Schema, model } = mongoose;

let tweetSchema = new Schema({
    authorName : String,
    content: String,
    date :  { type: Date, default: Date.now() },
})

let tweetModel = model('tweets', tweetSchema);

module.exports = tweetModel