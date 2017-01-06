var app = angular.module('fitlife', ['ui.router', 'ngCookies']);


var order = {
  products: {},
  address: {}
};

var totalPrice;

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state({
    name: 'home',
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'MainController'
  })

  .state({
        name: 'about',
        url: '/about',
        templateUrl: 'templates/about.html'
        // controller: 'AboutController'
  })

  .state({
    name: 'contact',
    url: '/contact',
    templateUrl: 'templates/contact.html'
    // controller: 'ContactController'
  })

  // .state('products', {
  //   url: '/products',
  //   templateUrl: 'templates/products.html',
  //   controller: 'productsController'
  // })

  .state({
    name: 'products',
    url: '/products',
    templateUrl: 'templates/products.html',
    controller: 'productsController'
  })

  .state({
    name: 'shopping_cart',
    url: '/shopping_cart',
    templateUrl: 'templates/shopping_cart.html',
    controller: 'productsController'
  })

  .state({
    name: 'payment',
    url: '/payment',
    templateUrl: 'templates/payment.html',
    controller: 'productsController'
  })

  .state({
    name: 'thankyou',
    url: '/thankyou',
    templateUrl: 'templates/thankyou.html',
    controller: 'productsController'
  })

  .state({
    name: 'login',
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  })

  .state({
    name: 'register',
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterController'
  });

  $urlRouterProvider.otherwise('/');
});

app.controller('MainController', function($scope, $cookies, $location) {
  $scope.logout = function() {
    $cookies.remove("token");
    $location.path('/home');
  };
  $scope.checkIfLoggedIn = checkIfLoggedIn;
  function checkIfLoggedIn() {
      return $cookies.get('token');
  }
});

//products delivery and payment controller
app.controller('productsController', function($scope, $location, postOrder, $cookies, $http) {
  // checkIfLoggedIn();
  $scope.names = ['Training Manual', 'Mens Meal Plan', 'Womens Meal Plan'];
    $scope.my = { favorite: '' };
  $scope.order = order;
  // $scope.token = $cookies.get('token');
  // $scope.makeOrder = function(qty, total) {
  //   totalPrice = total * qty * 100;
  //   console.log(totalPrice);
  //   order.products = {
  //     qty: qty,
  //
  //   };
  //   $location.path('/delivery');

  // };
  $scope.addToCart = function(name){
    var oldCart = $cookies.get('cart');
    if(oldCart == undefined){
      var newCart = name;
    } else {
      var newCart = oldCart + ',' + name;
    }
    $cookies.put('cart', newCart)
  };
  $scope.removeFromCart = function(name){
    var cart = $cookies.get('cart');
    var values = cart.split(',');
    for(var i = 0; i < values.length; i++){
      if(values[i] == name){
        values.splice(i, 1);
        var newCart = values.join(',');
      }
    }
    $cookies.put('cart', newCart);
  };

  $scope.removeItemFromCart = function() {
    	var name = $scope.my.favorite
    	console.log(name);
		var cart = $cookies.get('cart');
	  	var values = cart.split(',');
	  	for(var i = 0; i < values.length; i++) {
	    	if(values[i] == name) {
	      	values.splice(i, 1);
	      	var newCart = values.join(',');
	    	}
	  	}
	  	$cookies.put('cart', newCart)
	  	$scope.getCart()
	};


  $scope.getCart = function(){
    var cart = $cookies.get('cart');
    var itemsArray = cart.split(',').filter(function(item) {
      return item != ''});
    $scope.itemsArray = itemsArray;
    console.log('cart', cart);
    $scope.qty = itemsArray.length;
    $scope.total = itemsArray.length * 60;
    console.log($scope.total);
  };

  $scope.deliverySubmit = function() {
    order.address = {
      name: $scope.fullName,
      address1: $scope.address1,
      address2: $scope.address2,
      city: $scope.city,
      state: $scope.state,
      zipCode: $scope.zipCode,
      deliveryDate: $scope.deliveryDate
    };
    $location.path('/payment');
  };

  $scope.checkIfLoggedIn = checkIfLoggedIn;
  function checkIfLoggedIn() {
    if($cookies.get('token')) {
        return true;
    } else {
      $location.path("/login");
    }
  } //checkIfLoggedIn end

  // $scope.logout = function() {
  //   $cookies.remove("token");
  //   console.log('you clicked logout');
  //   $location.path('/home');
  // };
  $scope.pay = function() {
    // Creates a CC handler which could be reused.
    var amount = 12000;
    console.log(amount);
    var handler = StripeCheckout.configure({
      // my testing public publishable key
      key: 'pk_test_0kQI0g7I8UCnwKKtkKZ55I8t',
      locale: 'auto',
      // once the credit card is validated, this function will be called
      token: function(token) {
        // Make the request to the backend to actually make a charge
        // This is the token representing the validated credit card
        var tokenId = token.id;
        $http({
          url: ('/charge'),
          method: 'POST',
          data: {
            amount: amount,
            token: tokenId
          }
        }).success(function(data) {
          console.log('Charge:', data);
          console.log(tokenId);
          function payOrder(tokenId) {
            postOrder.submit(tokenId);
            console.log('payment made');
            $location.path('/thankyou');
            $cookies.remove('cart');
          }
          payOrder(tokenId);
          // alert('You were charged $' + (data.charge.amount / 100));
        });
      }
    });
    // open the handler - this will open a dialog
    // with a form with it to prompt for credit card
    // information from the user
    handler.open({
      name: 'FitLife',
      description: 'test CC#: 4242 4242 4242 4242',
      amount: amount
    });
  };
});
//end of products controller

//register user
app.controller('RegisterController', function($scope, postUser, $location) {
    $scope.submitUser = function() {
      var user = {
        username: $scope.username,
        password: $scope.password
      };
      postUser.saveUserInfo(user);
      $location.path("/home");
    };
});

// login user
app.controller('LoginController', function($scope, postLogin, $location, $cookies) {
  $scope.login = function() {
    var user = {
      username: $scope.loginName,
      password: $scope.loginPassword
    };
    postLogin.loginUser(user)
      .success(function(data, status) {
      $cookies.put('token', data.token);
      if(data.status === "ok") {
        $location.path('/home');
      } else {
        alert("invaild username or password");
      }
      console.log(data, status);
    });
  };
});

// get product products
app.factory('product', function($http) {
  return {
    getProductproducts: function(callback) {
      $http({
        url: url
      }).success(function(data) {
        callback(data);
      });
    }
  };
});

// post order to database
app.factory('postOrder', function($http, $cookies) {
  return {
    submit: function(tokenId) {
      var data = {
        token: $cookies.get('token'),
        order: order,
        stripeToken: tokenId
      };
      console.log('data from post order factory', data);
      $http.post('/charge', data)
        .success(function(data, status) {
          console.log('data: ', data);
          console.log('status code: ', status);
      });
    }
  };
});

// user signup
app.factory('postUser', function($http) {
  return {
    saveUserInfo: function(user) {
      $http.post(url, user)
      .success(function(data, status) {
        console.log('data', data);
        console.log('status code: ', status);
      });
    }
  };
});

app.factory('postLogin', function($http, $cookies) {
  return {
    loginUser: function(user) {
      return $http.post(url, user);
    }
  };
});
