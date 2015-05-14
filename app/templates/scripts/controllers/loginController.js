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
            $location.path('/app/home');
          }

          $scope.loginUser = function() {
            AuthService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
              $state.go('app.home');
            }).error(function(data) {
              var alertPopup = $ionicPopup.alert({
               title: 'Login failed!',
               template: 'Please check your credentials!'
           });
       });
          };

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
