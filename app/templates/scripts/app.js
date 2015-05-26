/**
*
*  AVIONIC
*  Propelling World-class Cross-platform Hybrid Applications ✈ ✈
*
*  Copyright 2015 Reedia Limited. All rights reserved.
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the "Software"), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.

*  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*
*/
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

    // Preloaded Avionic ✈ "<%= ngModulName %>" Angular modules
    'ionic',                   // ionic framework.
    'ngCordova',               // AngularJS Cordova wrappers for common Cordova plugins.
    'ngResource',              // ngResource module provides interaction support with RESTful services via the $resource service.
    'ngCookies',               // ngCookies module provides a convenient wrapper for reading and writing browser cookies.
    'pascalprecht.translate'   // angular-translate module for i18n and l10n lazy loading and pluralization
  ]);

  <%= ngModulName %>.run(function($rootScope, $ionicPlatform, $ionicLoading, $cordovaSplashscreen) {


    $ionicPlatform.ready(function() {

      $cordovaSplashscreen.show();
      setTimeout(function() {
        $cordovaSplashscreen.hide();
      }, 1000);

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }


      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

    $rootScope.$on('loading:show', function() {
      $ionicLoading.show(
        {
          content: '',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 120
        }
      );
    });

    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide();
    });

  });
})();
