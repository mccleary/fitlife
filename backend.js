
// connection client for mongodb
const mongoose = require('mongoose');
// promise library
const bluebird = require('bluebird');
//initializing express module
const express = require('express');
//initializing bodyParser module
const bodyParser = require('body-parser');
//initializing the app
const app = express();
// bcrypt module
const bcrypt = require('bcrypt');
// Number of Salt Rounds
const saltRounds = 12;
// Generate rand-token
const uid = require('rand-token').uid;

var tokenobj = {};

//assign bluebird to promise
const Promise = bluebird;

mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/fitlife');

// To pass the object as json
app.use(bodyParser.json());
// app.use(bodyParser());

//to tell express the location of all the html views folder
app.use(express.static('static'));


const user = mongoose.model('user', {
  _id : String,
  password : String,
  email: String,
  token : String,
  token_added_on : Date

});


app.post('/login',function(req,res){
  var token = uid(16);
  var id = req.body.username;
  var pwd = req.body.password;
  user.findById(id)
  .then(function(data){
    return bcrypt.compare(pwd,data.password);
  })
  .then(function(match){
    if(match){
      return user.update(
          { _id: id },
          { $set: { token : token , token_added_on : new Date()} }
      );
      }
  });
  // // .then(function(res){
  // //   res.send(auth_token);
  // // })
  // .catch(function(err){
  //   res.send("Error"+err.stash);
  // });
});

function authCheck(req,res,next){
  var token = req.query.auth_token;
  user.find({token : token}).then(function(data){
    if(data){
      console.log("Logged in");
      next();
    }
    else{
      res.send("Please log in");
    }
  });
}


app.post('/signup',function(req,res){
  var usr = new user();
  bcrypt.hash(req.body.password,saltRounds).then(function(hash){
    usr.password = hash;
    console.log("hash"+hash);
    }).then(function(){
      usr._id = req.body.username;
      console.log(usr.password);
      usr.save().then(function(){
        console.log("Signup Successful");
        res.json(usr);
    });
  });
});


app.post('/product', function(req, res) {
  var product = product();
});












app.listen(3000,function(){
  console.log('Example app listening on port 3000!');
});
