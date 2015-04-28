(function() {
  'use strict';
  /**
  * @ngdoc function
  * @name <%= ngModulName %>.controller:ProductsController
  * @description
  * # ProductsController
  */
  var <%= ngModulName %> = angular.module('<%= ngModulName %>');

  <%= ngModulName %>.controller('ProductsController', function($scope, $timeout, $state, ExampleService) {

    $scope.doRefresh = function() {
      ExampleService.getAll().success(function(data){
        $scope.items=data.results;

        console.log(data.results);

        // close pull to refresh loader
        $scope.$broadcast('scroll.refreshComplete');
      });

    };

    $scope.doRefresh();

    $scope.onItemDelete=function(item){
      ExampleService.delete(item.objectId);
      $scope.items.splice($scope.items.indexOf(item),1);
    };

    $scope.create=function(){
      $state.go('app.new');
    };
  });
})();
