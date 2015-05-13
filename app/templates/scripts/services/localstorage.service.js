(function () {
  'use strict';

  /**
  * @ngdoc function
  * @name <%= ngModulName %>.service:LocalStorageService
  * @description
  * # LocalStorageService
  */
  angular
    .module('<%= ngModulName %>')
    .factory('$localstorage', $localstorage);

    $localstorage.$inject = ['$window'];

      function $localstorage($window) {
          return {
              set: function(key, value) {
                  $window.localStorage[key] = value;
              },
              get: function(key, defaultValue) {
                  return $window.localStorage[key] || defaultValue;
              },
              setObject: function(key, value) {
                  $window.localStorage[key] = JSON.stringify(value);
              },
              getObject: function(key) {
                  return JSON.parse($window.localStorage[key] || '{}');
              }
          };
      }
  })();
