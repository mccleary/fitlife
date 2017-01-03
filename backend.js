//initializing express module
var express = require('express');
//initializing the app
var app = express();
//initializing bodyParser module
var bodyParser = require('body-parser');
// bcrypt module
var bcrypt = require('bcrypt');
// connection client for mongodb
var mongoose = require('mongoose');
// promise library
var bluebird = require('bluebird');
// Number of Salt Rounds
var saltRounds = 12;
// Generate rand-token
var uid = require('rand-token').uid;
// Stripe Payment Processing
// var stripe = require('stripe')('pk_test_0kQI0g7I8UCnwKKtkKZ55I8t');


var tokenobj = {};

//assign bluebird to promise
var Promise = bluebird;

mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/fitlife');

// To pass the object as json
app.use(bodyParser.json());
// app.use(bodyParser());

//to tell express the location of all the html views folder
app.use(express.static('static'));


var user = mongoose.model('user', {
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


app.post('/products', function(req, res) {
  var products = products();
});

// ------------------------------- //
// app.get('/', function(req, res){
//   res.send('Welcome to FitLife!');
// });
//   var index = index;
//     return app.send_static_file('index.html');
// });
// app.post('/login', function(req, res) {
//   var login();
//     credentials = request.get_json()
//     result = db.query('select * from customer where username = $1', credentials['username']).dictresult()
//     response = {'success', False}
//     if result != [] and result[0]['password'] == credentials['password']:
//         user = result[0]
//         response['success'] = True
//         del result[0]['password']
//         response['user'] = user
//         auth_token = uuid.uuid4()
//         db.insert('auth_token', token=auth_token, customer_id=user['id'])
//         response['auth_token'] = auth_token
//         return jsonify(response)
//     else{
//         return jsonify(response), 401
//     }
// });
// app.post('/products', function(req, res) {
//   var products();
//     results = db.query('select * from products').dictresult()
//     return jsonify(results)
// });
// app.post('/products/<int:id>', function(req, res) {
// var products(id);
//     return jsonify(get_products(id))
// });
// app.post('/shopping_cart/checkout', function(req, res) {
// var checkout();
//     user = logged_in_user(request)
//     if user is None{
//         return jsonify({'error': 'Not authorized'}), 401
//     data = request.get_json()
//     print 'data', data
//     products = db.query(
//     select
//         products.*
//     from
//         products
//     inner join products_in_shopping_cart on
//         products.id = products_in_shopping_cart.products_id
//     where
//         products_in_shopping_cart.customer_id = $1
//     user.id).namedresult()
//     var sum_price(total, products);
//         return total + products.price
//     total = reduce(sum_price, products, 0)
//
//     stripe_result = stripe.Charge.create(
//       amount = int(total * 100),
//       currency = 'usd',
//       source = data['stripeToken'],
//       description = data['chargeDescription']
//     )
//     }
//     purchase = db.insert('purchase',
//         customer_id = user.id,
//         total_price = total,
//         address = data['address'],
//         addres2 = data.get('address2'),
//         city = data['city'],
//         state = data['state'],
//         zipcode = data['zipcode']
//     )
//
//     for product in products;
//         db.insert('products_in_purchase',
//             purchase_id=purchase['id'],
//             products_id=products.id)
//
//     db.query('delete from products_in_shopping_cart where customer_id = $1', user.id)
//
//     return jsonify({
//         'total': total,
//         'purchase': purchase,
//         'charge': stripe_result
//     })
// });
// app.post('/shopping_cart', function(req, res) {
// var add_to_cart();
//     user = logged_in_user(request)
//     if user is None;
//         return jsonify({'error': 'Not authorized'}), 401
//     products_id = request.get_json()['products_id']
//     db.insert('product_in_shopping_cart',
//         products_id=products_id,
//         customer_id=user.id)
//     return jsonify({'status': 'ok'})
// });
// app.post('/shopping_cart', function(req, res) {
// var shopping_cart();
//     user = logged_in_user(request)
//     if user is None:
//         return jsonify({'error': 'Not authorized'}), 401
//     results = db.query(
//     select
//         product.*
//     from
//         products
//     inner join product_in_shopping_cart on
//         product.id = product_in_shopping_cart.product_id
//     where
//         product_in_shopping_cart.customer_id = $1
//     user.id).dictresult()
//     print 'results', results
//     return jsonify(results)
// });
// var logged_in_user(request);
//     if request.args.has_key('auth_token');
//         auth_token = request.args['auth_token']
//     else{
//         auth_token = request.get_json()['auth_token']
//     result = db.query(
//     select
//         customer.id,
//         customer.first_name, customer.last_name,
//         customer.email
//     from auth_token
//     inner join customer on
//         auth_token.customer_id = customer.id
//     where auth_token.token = $1
//     auth_token).namedresult()
//     if result == [];
//         return None
//     else{
//         return result[0];
//     }
//   }
// var get_product(id);
//     results = db.query('select * from products where id = $1', id).dictresult()
//     if results == [];
//         return None
//     else{
//         return results[0];
//     }



app.listen(5000,function(){
  console.log('Example app listening on port 5000!');
});
