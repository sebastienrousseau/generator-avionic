/**
*
*  AVIONIC
*  Propelling World-class Cross-platform Hybrid Applications ✈
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
  * @name <%= ngModulName %>.controller:IntroController
  * @description
  * # IntroController
  */
  function IntroController($ionicPlatform, $scope, $state, $localstorage, $ionicSlideBoxDelegate, IntroSlideService) {

    // Called to navigate to the main app
    $scope.startApp = function () {
      $state.go('app.home');
      $localstorage.set('firstTime', 'true');
    };

    $scope.next = function () {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function () {
      $ionicSlideBoxDelegate.previous();
    };

    $scope.disableSwipe = function() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };

    // Called each time the slide changes
    $scope.slideChanged = function (index) {
      $scope.slideIndex = index;
    };

    $scope.currentSlide = IntroSlideService.index;

  }



  var <%= ngModulName %> = angular.module('<%= ngModulName %>');
  <%= ngModulName %>.factory('IntroSlideService', function () {
    var service = {};
    service.index = 0;
    return service;
  });
  <%= ngModulName %>.controller('IntroController', IntroController);

  IntroController.$inject = ['$ionicPlatform', '$scope', '$state', '$localstorage', '$ionicSlideBoxDelegate', 'IntroSlideService'];



})();
