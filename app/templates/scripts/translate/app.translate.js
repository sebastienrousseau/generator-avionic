(function () {
  'use strict';
  /**
  * @ngdoc constant
  * @name <%= ngModulName %>.TRANSLATE
  * @description
  * # TRANSLATE
  * Provides filters and directives, asynchronous loading of i18n data etc
  */

  var <%= ngModulName %> = angular.module('<%= ngModulName %>');

  /**
  * Making the app localization ready
  */
  <%= ngModulName %>.config(function ($translateProvider) {

    // Escaping of variable content (XSS security)
    $translateProvider.useSanitizeValueStrategy('escaped');

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
