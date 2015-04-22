(function() {
    'use strict';

/**
 * @ngdoc overview
 * @name <%= ngModulName %>
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */

angular.module('<%= ngModulName %>', [
  /*
   * Order is not important. Angular makes a
   * pass to register all of the modules listed
   * and then when app.dashboard tries to use app.data,
   * it's components are available.
   */
   'ionic',
   'ngCordova',
   'ngResource',
   'ngCookies',
   'pascalprecht.translate'
])

  .run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {
      // save to use plugins here
      if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
      }
    });

    // add possible global event handlers here

  })

  .config(function($httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');

    // Turn off caching
    // $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

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
