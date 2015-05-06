(function () {
  'use strict';
  /**
  * @ngdoc constant
  * @name <%= ngModulName %>.ROUTES
  * @description
  * # ROUTES
  * Defines UI-Router states and their associated URL routes and views.
  * Is used inside /services/ApiService.js to generate correct endpoint dynamically
  */

  var <%= ngModulName %> = angular.module('<%= ngModulName %>');

  <%= ngModulName %>.config(function($httpProvider, $stateProvider, $urlRouterProvider,$ionicConfigProvider) {

    // Turn off caching (Please add $ionicConfigProvider to the app.config options)
    // $ionicConfigProvider.views.maxCache(0);

    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false).text('');

    // Application routing
    $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/main.html',
      controller: 'MainController'
    })
    .state('app.home', {
      url: '/home',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/home.html',
          controller: 'HomeController'
        }
      }
    })
    .state('app.products',{
      url:'/products',
      cache: false,
      views: {
        'viewContent': {
          templateUrl:'templates/views/products.html',
          controller:'ProductsController'
        }
      }
    })

    .state('app.product',{
      url:'/product/:id',
      cache: false,
      views: {
        'viewContent': {
          templateUrl:'templates/views/product.html',
          controller:'ProductController'
        }
      }
    })

    .state('app.new',{
      url:'/new',
      views: {
        'viewContent': {
          templateUrl:'templates/views/new-product.html',
          controller:'NewProductController'
        }
      }
    })

    .state('app.edit',{
      url:'/product/edit/:id',
      views: {
        'viewContent': {
          templateUrl:'templates/views/edit-product.html',
          controller:'EditProductController'
        }
      }
    })

    .state('app.login',{
      url:'/login',
      views: {
        'viewContent': {
          templateUrl:'templates/views/login.html',
          controller:'LoginController'
        }
      }
    })

    .state('app.settings', {
      url: '/settings',
      cache: true,
      views: {
        'viewContent': {
          templateUrl: 'templates/views/settings.html',
          controller: 'SettingsController'
        }
      }
    });


    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/app/home');
  });


})();
