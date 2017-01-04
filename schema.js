// connection client for mongodb
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var Schema = mongoose.Schema;
//assign bluebird to promise
var Promise = bluebird;
mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/fitlife');

const user = new Schema({
  _id : String,
  username : String,
  email : String,
  firstName : String,
  lastName : String,
  password : String,
  token : String,
  token_added_on : Date,
  shopping_cart : Array
});

const products = new Schema({
  _id : String,
  name : String,
  file_url : String,
  image_url : String,
  price : Number,
  gender : String,
  height : Number,
  weight : Number
});

// var Module = {
//   User: mongoose.model('user', user),
//   Products : mongoose.model('products', products)};
// }
//
// export Default Module;

// training_plan: String ,
// mens_meal_plan: String,
// womens_meal_plan: String

// ************************** //
// add additional info to db
// db.users.insert({
//   token : String,
//   token_added_on : Date,
//   shopping_cart : Array
// });
//
// db.products.insert(product)
//
// var product = new product ({
//   _id : String,
//   name : String,
//   file_url : String,
//   image_url : String,
//   price : Number,
//   gender : String,
//   height : Number,
//   weight : Number
// })

// db.products.insert({
//   name : Training Plan,
//   file_url : trainingplan.pdf,
//   image_url : trainingplan.jpg,
//   price : 60.00,
// })
// var trainingplan({
//   name : Training Plan,
//   file_url : trainingplan.pdf,
//   image_url : trainingplan.jpg,
//   price : 60.00,
// })
// db.products.insert(product)
//
// var mens_meal_plan1({
//   name : Mens Meal Plan,
//   file_url : mens_meal_plan1.pdf,
//   image_url : mens_meal_plan.jpg,
//   price : 60.00,
//   gender : Men,
//   height : { $lt : 63 },
//   weight : { $lt : 145 }
// })
//
// var mens_meal_plan2({
//   name : Mens Meal Plan,
//   file_url : mens_meal_plan2.pdf,
//   image_url : mens_meal_plan.jpg,
//   price : 60.00,
//   gender : Men,
//   height : { $gt : 64, $lt : 71 },
//   weight : { $gt : 146, $lt : 199 }
// })
//
// var mens_meal_plan3({
//   name : Mens Meal Plan,
//   file_url : mens_meal_plan3.pdf,
//   image_url : mens_meal_plan.jpg,
//   price : 60.00,
//   gender : Men,
//   height : { $ gt : 72 },
//   weight : { $gt : 200 }
// })
//
// var womens_meal_plan1({
//   name : Womens Meal Plan,
//   file_url : womens_meal_plan1.pdf,
//   image_url : womens_meal_plan.jpg,
//   price : 60.00,
//   gender : Women,
//   height : { $lt : 63 },
//   weight : { $lt : 145 }
// })
//
// var womens_meal_plan2({
//   name : Womens Meal Plan,
//   file_url : womens_meal_plan2.pdf,
//   image_url : womens_meal_plan.jpg,
//   price : 60.00,
//   gender : Women,
//   height : { $gt : 64, $lt : 71 },
//   weight : { $gt : 146, $lt : 199 }
// })
//
// var womens_meal_plan3({
//   name : Womens Meal Plan,
//   file_url : womens_meal_plan3.pdf,
//   image_url : womens_meal_plan.jpg,
//   price : 60.00,
//   gender : Women,
//   height : { $ gt : 72 },
//   weight : { $gt : 200 }
// })



// ************************** //

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
