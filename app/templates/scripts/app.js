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

  .run(function($ionicPlatform, $translate) {

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

  /**
   * Making the app localization ready
   */
  .config(function ($translateProvider) {
    // Service in module pascalprecht.translate which handles i18n and l10n
    $translateProvider.useStaticFilesLoader({
      prefix: 'languages/',
      suffix: '.json'
    })

    // Registering a Default language
    $translateProvider.preferredLanguage('en')

    // Registering a fallback language
    $translateProvider.fallbackLanguage('en')

    /**
     * A set of utility variables that can be used to retrieve language informations.
     */
    var navigatorLang = navigator.language
    // console.log(navigatorLang);

    var isoCode = navigatorLang.substring(0, 2).toLowerCase()
    // console.log(isoCode);

    /**
     * Looping through the HTML5 localStorage to apply localization rules
     */
    // localStorage is empty
    if (window.localStorage.NG_TRANSLATE_LANG_KEY === undefined || !window.localStorage.NG_TRANSLATE_LANG_KEY) {
      isoCode = navigatorLang.substring(0, 2).toLowerCase()
      $translateProvider.preferredLanguage(isoCode)
      $translateProvider.fallbackLanguage(isoCode)
      $translateProvider.useLocalStorage()
      // console.log ('Language that will be used is: ' + isoCode);
      // alert (66677Language that will be used is: " + isoCode);
    } else if (window.localStorage.NG_TRANSLATE_LANG_KEY !== isoCode) {
      // localStorage is different from the isoCode
      // console.log ("Language has changed: " + isoCode);
      // alert ("Language has changed: " + navigatorLang);
      window.localStorage.removeItem('NG_TRANSLATE_LANG_KEY')
      isoCode = navigatorLang.substring(0, 2).toLowerCase()
      $translateProvider.preferredLanguage(isoCode)
      $translateProvider.fallbackLanguage(isoCode)
      $translateProvider.useLocalStorage()
    } else {
      navigatorLang = window.localStorage.NG_TRANSLATE_LANG_KEY
      $translateProvider.preferredLanguage(navigatorLang)
      $translateProvider.fallbackLanguage(navigatorLang)
      $translateProvider.useLocalStorage()
      console.log('Current language used is: ' + navigatorLang)
      // alert ("Current language used is: " + navigatorLang);
    }
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
