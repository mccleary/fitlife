require('dotenv').config();
//initializing express module
var express = require('express');
//initializing the app
var app = express();
var session = require('express-session');
//initializing bodyParser module
var bodyParser = require('body-parser');
// bcrypt module
var bcrypt = require('bcrypt');
var DB = require('./schema.js');
var user = require('./schema.js');
var products = require('./schema.js');

// var Module = require('default-module');
// promise library
var bluebird = require('bluebird');
// Number of Salt Rounds
var saltRounds = 12;
// Generate rand-token
var uid = require('rand-token').uid;
// Stripe Payment Processing
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var randToken = require('rand-token');

var tokenobj = {};

// To pass the object as json
app.use(bodyParser.json());
// app.use(bodyParser());

//to tell express the location of all the html views folder
app.use(express.static('static'));



app.post('/signup', function(req, resp) {
  var credentials = req.body;
  var encryptedPassword;

  User.findById(credentials.username, function(err, user){
    if(err){
      console.error(err.message);
      return;
    }
    // username exist in the DB and use needs to pick a different username
    if(user) {
      console.log('pick a diff username');
      resp.send({"status": "failed", "message": "user name is taken"});
    } else {
      // save username and pswd to the database
      //bcrypt user password
      bcrypt.hash(credentials.password, 10, function(err, encryptedPassword) {
        if (err) {
          resp.status(500);
          resp.json({
            status: "fail",
            message: "Password hash has failed" + err.message
          });
        }
        console.log('Password:', credentials.password);
        console.log('Encrypted password:', encryptedPassword);
        User.create({
          _id: credentials.username,
          password: encryptedPassword
        }, function(err, user){
          if(err){
            resp.status(500);
            resp.json({
              status: "fail",
              message: "Password hash has failed" + err.message
            });
            return console.log(err);
          }
          // saved
          resp.send({"status": "ok"});
        });
      });
    }
  });
});

app.post('/login', function(req, resp) {
  var credentials = req.body;
  User.findById(credentials.username, function(err, user) {
    if (!user) {
      resp.json({status: 'fail', message: "invaild username or password"});
    }
    bcrypt.compare(credentials.password, user.password, function(err, matched) {
      if (err || !matched) {
        resp.send({"status": "fail", "message": "Invaild username or password"});
      }
      if (matched) {
        var token = randToken.generate(64);
        //user.authenticationTokens.push(token);
        //user.save(function(err) {...})
        user.update(
          {$push: {authenticationTokens: token} },
          function(err, user) {
            if(err) {
              resp.send({"status": "fail", "message": "Invaild username or password"});
            }
            resp.json({status: "ok", token: token});
          }
        );
      }
    });
  });
});
//checks to see if user is logged in
function authRequired(request, response, next) {
  var token = request.query.token || request.body.token;
  User.findOne({authenticationTokens: token}, function(err, user){
    request.user = user;
    if (err) {
      request.send(err.message);
      return;
    }

  if(user) {
    next();
  } else {
    response.json({message: 'please login'});
  }
  });
}

app.post('/orders', authRequired, function(req, resp){
    //user.orders.push(info.order);
    //user.save(function(err){...})
    req.user.update(
      {$push: {orders: req.body.order}},
      function(err, user) {
        if (err) {
          //to make error messages more readable
           var validationErrors = [];
          for (var key in err.errors) {
            validationErrors.push(err.errors[key].message);
          }
          resp.send({"status": "fail", "message": "order failed" + err.message + ". " + validationErrors.join(" ")});
          return;
        }
        resp.send({"status": "ok"});
      }
    );
});

app.get("/orders", authRequired, function(req, resp) {
    resp.send(req.user.orders);
});
//stripe functionality
app.post('/charge', function(request, response) {
  var amount = request.body.amount;
  var token = request.body.token;
  console.log(token);

  // make the charge using the credit card associated
  // with token
  stripe.charges.create({
    amount: amount,
    currency: 'usd',
    source: token
  }, function(err, charge) {
    if (err) {
      response.json({
        status: 'fail',
        error: err.message
      });
      return;
    }
    response.json({ status: 'ok', charge: charge });
  });
});




app.listen(5000,function(){
  console.log('App listening on port 5000!');
});
