(function () {
  'use strict';

  /**
  * @ngdoc function
  * @name <%= ngModulName %>.util:lodash
  * @description
  * # Lo-Dash
  * Expose Lo-Dash through injectable factory, so we don't pollute / rely on global namespace
  * just inject lodash as _
  */

  var <%= ngModulName %> = angular.module('<%= ngModulName %>');

    <%= ngModulName %>.factory('_', function($window) {
      return $window._;
    });
  
})();
