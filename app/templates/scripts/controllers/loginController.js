(function() {
  'use strict';
  /**
  * @ngdoc function
  * @name <%= ngModulName %>.controller:LoginController
  * @description
  * # LoginController
  */
  var <%= ngModulName %> = angular.module('<%= ngModulName %>');

  <%= ngModulName %>.controller('LoginController', LoginController);

    LoginController.$inject = ['$ionicPlatform', '$scope', '$location', '$cordovaOauth', '$localstorage', 'AuthService'];

      function LoginController($ionicPlatform, $scope, $location, $cordovaOauth, $localstorage, AuthService) {

          $scope.user = {};

          if(AuthService.isLogged()) {
            event.preventDefault();
            $location.path('/home');
          }

          $scope.loginFacebook = function() {
            AuthService.loginFacebook();
          };

          $scope.loginGoogle = function() {
            AuthService.loginGoogle();
          };

          $scope.loginTwitter = function() {
            AuthService.loginTwitter();
          };
      }
})();
