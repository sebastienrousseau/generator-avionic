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

<%= ngModulName %>.run(function($ionicPlatform, $translate) {

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

  /**
   * Making the app localization ready
   */
   <%= ngModulName %>.config(function ($translateProvider) {
    // Service in module pascalprecht.translate which handles i18n and l10n
    $translateProvider.useStaticFilesLoader({
      prefix: 'languages/',
      suffix: '.json'
    });

    // Registering a Default language
    $translateProvider.preferredLanguage('en');

    // Registering a fallback language
    $translateProvider.fallbackLanguage('en');

    /**
     * A set of utility variables that can be used to retrieve language informations.
     */
    var navigatorLang = navigator.language;
    // console.log(navigatorLang);

    var isoCode = navigatorLang.substring(0, 2).toLowerCase();
    // console.log(isoCode);

    /**
     * Looping through the HTML5 localStorage to apply localization rules
     */
    // localStorage is empty
    if (window.localStorage.NG_TRANSLATE_LANG_KEY === undefined || !window.localStorage.NG_TRANSLATE_LANG_KEY) {
      isoCode = navigatorLang.substring(0, 2).toLowerCase();
      $translateProvider.preferredLanguage(isoCode);
      $translateProvider.fallbackLanguage(isoCode);
      $translateProvider.useLocalStorage();
      // console.log ('Language that will be used is: ' + isoCode);
      // alert (66677Language that will be used is: " + isoCode);
    } else if (window.localStorage.NG_TRANSLATE_LANG_KEY !== isoCode) {
      // localStorage is different from the isoCode
      // console.log ("Language has changed: " + isoCode);
      // alert ("Language has changed: " + navigatorLang);
      window.localStorage.removeItem('NG_TRANSLATE_LANG_KEY');
      isoCode = navigatorLang.substring(0, 2).toLowerCase();
      $translateProvider.preferredLanguage(isoCode);
      $translateProvider.fallbackLanguage(isoCode);
      $translateProvider.useLocalStorage();
    } else {
      navigatorLang = window.localStorage.NG_TRANSLATE_LANG_KEY;
      $translateProvider.preferredLanguage(navigatorLang);
      $translateProvider.fallbackLanguage(navigatorLang);
      $translateProvider.useLocalStorage();
      console.log('Current language used is: ' + navigatorLang);
      // alert ("Current language used is: " + navigatorLang);
    }
  });
})();
