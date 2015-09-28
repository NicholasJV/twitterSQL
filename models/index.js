

// pull in the Sequelize library
var Sequelize = require('sequelize');
// create an instance of a database connection
// which abstractly represents our app's mysql database
var twitterjsDB = new Sequelize('twitterjs', 'root', null, {
    dialect: "mysql",
    port:    3306,
});

// open the connection to our database
twitterjsDB
  .authenticate()
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  })
  .then(function() {
    console.log('Connection has been established successfully.');
  });

var Tweet = require('./tweet')(twitterjsDB);
var User = require('./user')(twitterjsDB);

// adds a UserId foreign key to the `Tweet` table
User.hasMany(Tweet);
Tweet.belongsTo(User);

module.exports = {
    User: User,
    Tweet: Tweet
};

// // console.log('opts', User.options);
// User.findOne().then(function (user) {
//   console.log(user.get({plain: true}));
//  // console.log("FIND-by-ID:", user.dataValues, "user.options:\n", user.options);
// })



/*
User.findAll({ include: [ Tweet ] })
.then(function(tweets) {
  console.log(JSON.stringify(tweets, null, 2));
})



User.findOne({where: {name: 'Nimit'}}).then(function (user) {
    return user.getTweets();
})
.then(function (tweet) {
  console.log("find one tweet:", JSON.stringify(tweet));
});

*/


