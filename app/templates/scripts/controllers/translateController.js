(function() {
  'use strict';
  /**
  * @ngdoc function
  * @name <%= ngModulName %>.controller:TranslateController
  * @description
  * # TranslateController
  */
  angular.module('<%= ngModulName %>')
  .controller('TranslateController', ['$translate', '$scope', function ($translate, $scope) {
    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };
  }]);
})();
