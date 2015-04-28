(function() {
  'use strict';
  /**
  * @ngdoc function
  * @name <%= ngModulName %>.controller:NewProductController
  * @description
  * # NewProductController
  */
  var <%= ngModulName %> = angular.module('<%= ngModulName %>');

  <%= ngModulName %>.controller('NewProductController', function($scope,$state, ExampleService) {

    $scope.item={};

    $scope.create=function(){
      ExampleService.create({title:$scope.item.title}).success(function(){
            $state.go('app.products');
        });
    };
  });
})();
