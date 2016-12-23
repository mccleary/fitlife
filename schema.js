const user = mongoose.model('user', {
  _id : String,
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  password: String
});

// const tweet = mongoose.model('tweet', {
//   text : String,
//   timestamp : Date,
//   username : String
// });

//world tweet
// tweet.find().limit(20)
// .then(function(twt){
//   console.log(twt.text);
//   console.log(twt.timestamp);
//   console.log(twt.username);
// });

//profile page
// Promise.all([
//   user.find({username : Theuname})
// ])
// .spread(function(twt,usr){
//   twt.forEach(function(t){
//     console.log(t);
//   });
//   //number of people you are following
//   console.log(usr.following.length());
//   //number of people following you
//   console.log(usr.followers.length());
// });

//followers //following
// user.find({_id : Theuname}).then(function(usr){
//   user.find({_id : Theuname}).then(function(usr){
//     usr.following.forEach(function(u){
//       console.log(u);
//     });
//   });
// });


//user timeline
// user.findById(Theuserid)
// .then(function(usr){
//   return tweet.find({
//     username : {
//       $in : usr.following.concat([usr._id])
//     }
//   });
// }).then(function(tweets){
//   console.log(tweets);
// });





// database info:

// var user = new user ({
//   username: String,
//   email: String,
//   firstName: String,
//   lastName: String,
//   password: String
// });

// var trista = {
//   username: 'trista',
//   email: 'trista@gmail.com',
//   firstName: 'trista',
//   lastName: 'mccleary',
//   password: '1234'
// };

// db.users.insert(user)



// db.users.insert({
//   username: 'trista',
//   email: 'trista@gmail.com',
//   firstName: 'trista',
//   lastName: 'mccleary',
//   password: '1234'
// });
//
// db.users.insert({
//   username: 'toby',
//   email: 'toby@gmail.com',
//   firstName: 'toby',
//   lastName: 'ho',
//   password: '1234'
// });
//
// db.users.insert({
//   username: 'kirk',
//   email: 'kirk@gmail.com',
//   firstName: 'kirk',
//   lastName: 'abbott',
//   password: '1234'
// });
//
// db.users.insert({
//   username: 'eli',
//   email: 'eli@gmail.com',
//   firstName: 'eli',
//   lastName: 'allstrom-luttrell',
//   password: '1234'
// });
//
// db.users.insert({
//   username: 'che',
//   email: 'che@gmail.com',
//   firstName: 'che',
//   lastName: 'blankenship',
//   password: '1234'
// });
//
// db.users.insert({
//   username: 'jason',
//   email: 'jason@gmail.com',
//   firstName: 'jason',
//   lastName: 'campbell',
//   password: '1234'
// });
//
// db.users.insert({
//   username: 'autumn',
//   email: 'autumn@gmail.com',
//   firstName: 'autumn',
//   lastName: 'coleman',
//   password: '1234'
// });
//
// db.users.insert({
//   username: 'john',
//   email: 'john@gmail.com',
//   firstName: 'john',
//   lastName: 'coppola',
//   password: '1234'
// });
//
// db.users.insert({
//   username: 'juan',
//   email: 'juan@gmail.com',
//   firstName: 'juan',
//   lastName: 'cortes',
//   password: '1234'
// });
//
// db.users.insert({
//   username: 'matthew',
//   email: 'matthew@gmail.com',
//   firstName: 'matthew',
//   lastName: 'downs',
//   password: '1234'
// });
//
// db.users.insert({
//   username: 'robert',
//   email: 'robert@gmail.com',
//   firstName: 'robert',
//   lastName: 'dunn',
//   password: '1234'
// });
//
// db.users.insert({
//   username: 'kevin',
//   email: 'kevin@gmail.com',
//   firstName: 'kevin',
//   lastName: 'farmer',
//   password: '1234'
// });
//
// db.users.insert({
//   username: 'lyn',
//   email: 'lyn@gmail.com',
//   firstName: 'lyn',
//   lastName: 'lam',
//   password: '1234'
// });
//
// db.users.insert({
//   username: 'jesslyn',
//   email: 'jesslyn@gmail.com',
//   firstName: 'jesslyn',
//   lastName: 'landgren',
//   password: '1234'
// });
//
// db.users.insert({
//   username: 'keyur',
//   email: 'keyur@gmail.com',
//   firstName: 'keyur',
//   lastName: 'patel',
//   password: '1234'
// });
//
// db.users.insert({
//   username: 'dom',
//   email: 'dom@gmail.com',
//   firstName: 'dom',
//   lastName: 'zenon',
//   password: '1234'
// });
//
// db.users.insert({
//   username: 'daniel',
//   email: 'daniel@gmail.com',
//   firstName: 'daniel',
//   lastName: 'barranco',
//   password: '1234'
// });
