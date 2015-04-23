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

 var <%= ngModulName %> = angular.module('<%= ngModulName %>', [

   // Preloaded Avionic ✈ Angular modules <%= ngModulName %>
   'ionic',                   // ionic framework
   'ngCordova',               // AngularJS Cordova wrappers for common Cordova plugins.
   'ngResource',              // ngResource module provides interaction support with RESTful services via the $resource service.
   'ngCookies',               // ngCookies module provides a convenient wrapper for reading and writing browser cookies.
   'pascalprecht.translate'   // angular-translate module for i18n and l10n lazy loading and pluralization
]);

<%= ngModulName %>.run(function($ionicPlatform) {

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

  });


})();
