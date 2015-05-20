/**
*
*  AVIONIC
*  Propelling World-class Cross-platform Hybrid Applications ✈ ✈
*
*  Copyright 2015 Reedia Limited. All rights reserved.
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the "Software"), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.

*  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*
*/
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
