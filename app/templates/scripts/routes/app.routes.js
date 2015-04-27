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

   <%= ngModulName %>.config(function($httpProvider, $stateProvider, $urlRouterProvider) {

      // Turn off caching (Please add $ionicConfigProvider to the app.config options)
      // $ionicConfigProvider.views.maxCache(0);

      /*
      // Turn off back button text (Please add $ionicConfigProvider to the app.config options)
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
