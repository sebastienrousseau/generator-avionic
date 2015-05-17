(function() {
  'use strict';
  /**
  * @ngdoc function
  * @name <%= ngModulName %>.controller:SignUpController
  * @description
  * # SignUpController
  */
  var <%= ngModulName %> = angular.module('<%= ngModulName %>');

  <%= ngModulName %>.controller('SignUpController', SignUpController);

  SignUpController.$inject = ['$ionicPlatform', '$scope', '$location', '$cordovaOauth', '$localstorage', 'AuthService'];

  function SignUpController($ionicPlatform, $scope, $location, $cordovaOauth, $localstorage, AuthService) {

    $scope.user = {
      username: '',
      password: ''
    };

    $scope.signupUser = function(){
      console.log('signing up user ' + $scope.user.username);
      AuthService.signupUser($scope.user)
      .success(function(data){
        console.log($scope.user.username + 'has been created! session id is ' + data.sessionToken);
        // console.log('/session/'+ data.sessionToken);
        // $location.path('/session/'+ data.sessionToken);
      });
    };
  }
})();
