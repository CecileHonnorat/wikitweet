const mongoose = require('mongoose')
require('dotenv').config();

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
 };

 var user = process.env.MONGOOSE_USER
 var password = process.env.MONGOOSE_PASSWORD
 var cluster = process.env.MONGOOSE_CLUSTER
 var db = process.env.MONGOOSE_DB


// --------------------- BDD -----------------------------------------------------
mongoose.connect(`mongodb+srv://${user}:${password}@${cluster}.mongodb.net/${db}?retryWrites=true&w=majority`,
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database wikitweet connection : Success ***');
    }
   }
);

//`mongodb+srv://${user}:${password}@${cluster}.mongodb.net/${db}?retryWrites=true&w=majority`