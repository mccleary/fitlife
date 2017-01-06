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
// db.users.update(user)

// var fieldsToModify = {
//   token : String,
//   token_added_on : Date,
//   shopping_cart : Array
// };
// db.users.update({
//   _id: ObjectId("585aeccde17b2af691d24859")
// }, fieldsToModify);


// db.products.insert(product)
//
// var products = new product {
//   _id : String,
//   name : String,
//   file_url : String,
//   image_url : String,
//   price : Number,
//   gender : String,
// };


//  ************************ //
// use schema below to add products to database:
// add var first
// var trainingplan = {
//   name : 'trainingplan',
//   file_url : 'trainingplan.pdf',
//   image_url : 'trainingplan.jpg',
//   price : 60.00
// };
// then add insert stmt
// db.products.insert(trainingplan);

// var mens_meal_plan1 = {
//   name : 'mens_meal_plan',
//   file_url : 'mens_meal_plan1.pdf',
//   image_url : 'mens_meal_plan.jpg',
//   price : 60.00,
//   gender : 'Men',
// };
// db.products.insert(mens_meal_plan1);
//
//
// var mens_meal_plan2 = {
//   name : 'mens_meal_plan',
//   file_url : 'mens_meal_plan2.pdf',
//   image_url : 'mens_meal_plan.jpg',
//   price : 60.00,
//   gender : 'Men',
// };
// db.products.insert(mens_meal_plan2);
//
//
// var mens_meal_plan3 = {
//   name : 'mens_meal_plan',
//   file_url : 'mens_meal_plan3.pdf',
//   image_url : 'mens_meal_plan.jpg',
//   price : 60.00,
//   gender : 'Men',
// };
// db.products.insert(mens_meal_plan3);
//
//
// var womens_meal_plan1 = {
//   name : 'womens_meal_plan1',
//   file_url : 'womens_meal_plan1.pdf',
//   image_url : 'womens_meal_plan.jpg',
//   price : 60.00,
//   gender : 'Women',
// };
// db.products.insert(womens_meal_plan1);
//
//
// var womens_meal_plan2 = {
//   name : 'womens_meal_plan2',
//   file_url : 'womens_meal_plan2.pdf',
//   image_url : 'womens_meal_plan.jpg',
//   price : 60.00,
//   gender : 'Women',
// };
// db.products.insert(womens_meal_plan2);
//
//
// var womens_meal_plan3 = {
//   name : 'womens_meal_plan3',
//   file_url : 'womens_meal_plan3.pdf',
//   image_url : 'womens_meal_plan.jpg',
//   price : 60.00,
//   gender : 'Women',
// };
// db.products.insert(womens_meal_plan3);

// *************************** //
// options: use minHeight, for size instead gt & lt
// height : { $lt : 63 },
// weight : { $lt : 145 }

// height : { $gt : 64, $lt : 71 },
// weight : { $gt : 146, $lt : 199 }

// height : { $gt : 72 },
// weight : { $gt : 200 }

// minHeight :


// ************************** //

// database info:

// var user = new user ({
//   username: String,
//   email: String,
//   firstName: String,
//   lastName: String,
//   password: String,
//   token : String,
//   token_added_on : Date,
//   shopping_cart : Array
// });



// var user = {
//   username: 'trista',
//   email: 'trista@gmail.com',
//   firstName: 'trista',
//   lastName: 'mccleary',
//   password: '1234',
//   token : 2345,
//   token_added_on : Date()
// };
// db.users.insert(user);
//
// var user = {
//   username: 'toby',
//   email: 'toby@gmail.com',
//   firstName: 'toby',
//   lastName: 'ho',
//   password: '1234',
//   token : 3456,
//   token_added_on : Date()
// };
// db.users.insert(user);
//
// var user = {
//   username: 'kirk',
//   email: 'kirk@gmail.com',
//   firstName: 'kirk',
//   lastName: 'abbott',
//   password: '1234',
//   token : 4567,
//   token_added_on : Date()
// };
// db.users.insert(user);
//
// var user = {
//   username: 'eli',
//   email: 'eli@gmail.com',
//   firstName: 'eli',
//   lastName: 'allstrom-luttrell',
//   password: '1234',
//   token : 5678,
//   token_added_on : Date()
// };
// db.users.insert(user);
//
// var user = {
//   username: 'che',
//   email: 'che@gmail.com',
//   firstName: 'che',
//   lastName: 'blankenship',
//   password: '1234',
//   token : 6789,
//   token_added_on : Date()
// };
// db.users.insert(user);
//
// var user = {
//   username: 'jason',
//   email: 'jason@gmail.com',
//   firstName: 'jason',
//   lastName: 'campbell',
//   password: '1234',
//   token : 7890,
//   token_added_on : Date()
// };
// db.users.insert(user);
//
// var user = {
//   username: 'autumn',
//   email: 'autumn@gmail.com',
//   firstName: 'autumn',
//   lastName: 'coleman',
//   password: '1234',
//   token : 8901,
//   token_added_on : Date()
// };
// db.users.insert(user);
//
// var user = {
//   username: 'john',
//   email: 'john@gmail.com',
//   firstName: 'john',
//   lastName: 'coppola',
//   password: '1234',
//   token : 9012,
//   token_added_on : Date()
// };
// db.users.insert(user);
//
// var user = {
//   username: 'juan',
//   email: 'juan@gmail.com',
//   firstName: 'juan',
//   lastName: 'cortes',
//   password: '1234',
//   token : 6234,
//   token_added_on : Date()
// };
// db.users.insert(user);
//
// var user = {
//   username: 'matthew',
//   email: 'matthew@gmail.com',
//   firstName: 'matthew',
//   lastName: 'downs',
//   password: '1234',
//   token : 7234,
//   token_added_on : Date()
// };
// db.users.insert(user);
//
// var user = {
//   username: 'robert',
//   email: 'robert@gmail.com',
//   firstName: 'robert',
//   lastName: 'dunn',
//   password: '1234',
//   token : 5234,
//   token_added_on : Date()
// };
// db.users.insert(user);
//
// var user = {
//   username: 'kevin',
//   email: 'kevin@gmail.com',
//   firstName: 'kevin',
//   lastName: 'farmer',
//   password: '1234',
//   token : 4435,
//   token_added_on : Date()
// };
// db.users.insert(user);
//
// var user = {
//   username: 'lyn',
//   email: 'lyn@gmail.com',
//   firstName: 'lyn',
//   lastName: 'lam',
//   password: '1234',
//   token : 8765,
//   token_added_on : Date()
// };
// db.users.insert(user);
//
// var user = {
//   username: 'jesslyn',
//   email: 'jesslyn@gmail.com',
//   firstName: 'jesslyn',
//   lastName: 'landgren',
//   password: '1234',
//   token : 5432,
//   token_added_on : Date()
// };
// db.users.insert(user);
//
// var user = {
//   username: 'keyur',
//   email: 'keyur@gmail.com',
//   firstName: 'keyur',
//   lastName: 'patel',
//   password: '1234',
//   token : 6543,
//   token_added_on : Date()
// };
// db.users.insert(user);
//
// var user = {
//   username: 'dom',
//   email: 'dom@gmail.com',
//   firstName: 'dom',
//   lastName: 'zenon',
//   password: '1234',
//   token : 7654,
//   token_added_on : Date()
// };
// db.users.insert(user);
//
// var user = {
//   username: 'daniel',
//   email: 'daniel@gmail.com',
//   firstName: 'daniel',
//   lastName: 'barranco',
//   password: '1234',
//   token : 8765,
//   token_added_on : Date()
// };
// db.users.insert(user);
