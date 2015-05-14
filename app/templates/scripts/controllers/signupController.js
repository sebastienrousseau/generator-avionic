(function() {
  'use strict';
  /**
  * @ngdoc function
  * @name <%= ngModulName %>.controller:SignUpController
  * @description
  * # SignUpController
  */
  var <%= ngModulName %> = angular.module('<%= ngModulName %>');

  <%= ngModulName %>.controller('SignUpController', [
        '$state', '$scope', 'UserService',
        function ($state, $scope, UserService) {

            $scope.creds = {};
            /**
             *
             */
            $scope.signUpUser = function () {
                UserService.init();
                UserService.createUser($scope.creds).then(function (_data) {
                    $scope.user = _data;
                    alert("Success Creating User Account ");
                    $state.go('tab.list', {});
                }, function (_error) {
                    alert("Error Creating User Account " + _error.debug);
                });
            };
        }]);
})();
