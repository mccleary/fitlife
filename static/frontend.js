var app = angular.module('fitlife', ['ui.router', 'ngCookies']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state({
      name: 'login',
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })
    .state({
      name: 'home',
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeController'
    })
    .state({
      name: 'about',
      url: '/about',
      templateUrl: 'templates/about.html',
      controller: 'AboutController'
    })
    .state({
      name: 'product',
      url: '/product/{id}',
      templateUrl: 'templates/product.html',
      controller: 'ProductController'
    })
    .state({
      name: 'contact',
      url: '/contact',
      templateUrl: 'templates/contact.html',
      controller: 'ContactController'
    })
    .state({
      name: 'shopping_cart',
      url: '/shopping_cart',
      templateUrl: 'templates/shopping_cart.html',
      controller: 'ShoppingCartController'
    })
    .state({
      name: 'checkout',
      url: '/checkout',
      templateUrl: 'templates/checkout.html',
      controller: 'CheckoutController'
    })
    ;
  $urlRouterProvider.otherwise('/');
});

app.controller('HomeController', function($scope, fitlife) {
  fitlife.getProducts()
    .success(function(products) {
      $scope.products = products;
    });
});

app.controller('ProductController', function($scope, fitlife, $stateParams, $state, $cookies) {
  fitlife.getProduct($stateParams.id)
    .success(function(product) {
      $scope.product = product;
    });

  $scope.addToCart = function() {
    fitlife.addToCart($stateParams.id)
      .success(function() {
        console.log('Added to cart');
        $scope.addSuccessful = true;
      });
  };

});

app.controller('LoginController', function($scope, fitlife, $state) {
  $scope.login = function() {
    fitlife.login($scope.username, $scope.password)
      .success(function(data) {
        console.log('login success', data);
        $state.go('home');
      })
      .error(function() {
        console.log('Login error');
        $scope.loginFailed = true;
      });
  };
});

app.controller('ShoppingCartController', function($scope, fitlife) {
  fitlife.getCartItems()
    .then(function(results) {
      $scope.items = results.items;
      $scope.total = results.total;
    });
});

app.controller('CheckoutController', function($scope, fitlife) {
  fitlife.getCartItems()
    .then(function(results) {
      $scope.items = results.items;
      $scope.total = results.total;
    });
  $scope.confirmCheckout = function() {
    var address = {
      address: $scope.address,
      address2: $scope.address2,
      city: $scope.city,
      state: $scope.state,
      zipcode: $scope.zipcode
    };
    fitlife.checkout(address)
      .success(function(data) {
        console.log('It worked');
      });
  };
});

app.factory('fitlife', function($http, $rootScope, $cookies) {
  var service = {};
  var loginData = $cookies.getObject('loginData');
  if (loginData) {
    service.authToken = loginData.auth_token;
    $rootScope.user = loginData.user;
  }
  $rootScope.logout = function() {
    $rootScope.user = null;
    $cookies.remove('loginData');
    service.authToken = null;
  };

  service.getProducts = function() {
    return $http.get('/fitlife/products');
  };
  service.getProduct = function(id) {
    return $http.get('/fitlife/product/' + id);
  };
  service.login = function(username, password) {
    return $http.post('/fitlife/login', {
      username: username,
      password: password
    }).success(function(data) {
      service.authToken = data.auth_token;
      $rootScope.user = data.user;
      $cookies.putObject('loginData', data);
    });
  };
  service.addToCart = function(productId) {
    return $http.post('/fitlife/shopping_cart', {
      product_id: productId,
      auth_token: service.authToken
    });
  };
  service.getCartItems = function() {
    return $http({
      method: 'GET',
      url: '/fitlife/shopping_cart',
      params: { auth_token: service.authToken }
    }).then(function(response) {
      var items = response.data;
      var total = items.reduce(function(total, item) {
        return total + item.price;
      }, 0);
      return {
        items: items,
        total: total
      };
    });
  };

  service.checkout = function(address) {
    address.auth_token = service.authToken;
    return $http.post('/fitlife/shopping_cart/checkout', address);
  };
  return service;
});
