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

    $scope.currentUser = {};
    $scope.user = {
      username: '',
      password: ''
    };

    $scope.loginUser = function(){
      AuthService.loginUser($scope.user)
      .success(function(data){
        console.log(data.username + 'is logged in! session id is ' + data.sessionToken);
        // $location.path('/session/' + data.sessionToken);
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
