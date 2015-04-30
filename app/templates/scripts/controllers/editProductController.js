(function() {
  'use strict';
  /**
  * @ngdoc function
  * @name <%= ngModulName %>.controller:EditProductController
  * @description
  * # EditProductController
  */
  var <%= ngModulName %> = angular.module('<%= ngModulName %>');

  <%= ngModulName %>.controller('EditProductController', function($scope, $state, $stateParams, ExampleService) {

    console.log($stateParams);
    $scope.items={id:$stateParams.id,title:$stateParams.title};
    $scope.edit=function(){
      ExampleService.edit($scope.items.id,{title:$scope.items.title}).success(function(){
        $state.go('app.products');
      });
    };
  });
})();
