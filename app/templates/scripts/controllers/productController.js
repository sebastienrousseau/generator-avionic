(function() {
  'use strict';
  /**
  * @ngdoc function
  * @name <%= ngModulName %>.controller:ProductController
  * @description
  * # ProductController
  */
  var <%= ngModulName %> = angular.module('<%= ngModulName %>');

  <%= ngModulName %>.controller('ProductController', function($scope, $timeout, $state,$stateParams, ExampleService) {

    $scope.id = $stateParams.id;
    console.log('params',$scope.id);

    $scope.doRefresh = function() {

      ExampleService.getAll().success(function(data){
        $scope.items = data.results;
        console.log($scope.items);

        // close pull to refresh loader
        $scope.$broadcast('scroll.refreshComplete');
      });

    };
    $scope.doRefresh();

    $scope.onItemDelete=function(item){
      ExampleService.delete(item.objectId);
      $scope.items.splice($scope.items.indexOf(item),1);
      $state.go('app.products');
    };
  });
})();
