(function () {
  'use strict';

/**
 * @ngdoc function
 * @name <%= ngModulName %>.service:ExampleService
 * @description
 * # ExampleService
 */
angular.module('<%= ngModulName %>')
  // use factory for services
  .factory('ExampleService', function($http, $timeout, $q) {

    // var kindOfPrivateVariable = 42;
    //
    // var doSomethingAsync = function() {
    //   var deferred = $q.defer();
    //   $timeout(deferred.resolve.bind(null, kindOfPrivateVariable), 1000);
    //   return deferred.promise;
    // };
    //
    // var fetchSomethingFromServer = function() {
    //   return $http({
    //       url: 'http://hipsterjesus.com/api',
    //       params: {
    //           paras: 2
    //       },
    //       method: 'GET'
    //     })
    //     .success(function(data) {
    //       console.log('fetched this stuff from server:', data);
    //     })
    //     .error(function(error) {
    //       console.log('an error occured', error);
    //     });
    // };
    //
    // // public api
    // return {
    //   doSomethingAsync: doSomethingAsync,
    //   fetchSomethingFromServer: fetchSomethingFromServer
    // };

    var endPointUrl = 'http://jsonstub.com/api';
    var kindOfPrivateVariable = 42;

    var doSomethingAsync = function() {
      var deferred = $q.defer();
      $timeout(deferred.resolve.bind(null, kindOfPrivateVariable), 1000);
      return deferred.promise;
    };

    var fetchSomethingFromServer = function() {
      var deferred = $q.defer();
      return $http({
          url: endPointUrl,
          method: 'GET',
          dataType: 'json',
          data: '',
          headers: {
              'Access-Control-Allow-Origin': 'http://jsonstub.com',
              'Access-Control-Allow-Headers': 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With',
              'Access-Control-Allow-Methods': 'GET',
              'Content-Type': 'application/json',
              'JsonStub-User-Key': '0d69f758-3b93-4e27-89ea-959709deb4ba',
              'JsonStub-Project-Key': 'd6ed0f8c-04bb-495f-a721-5c13b0223bc4'
          }
      }).success(function(data, status, headers, config) {
            console.log('SUCCESS DATA: '+ JSON.stringify(data));
            console.log('SUCCESS STATUS: '+ JSON.stringify(status));
            console.log('SUCCESS CONFIG :'+ JSON.stringify(config));

          })
          .error(function(data, status, headers, config) {
            console.log('ERROR DATA: '+ JSON.stringify(data));
            console.log('ERROR STATUS: '+ JSON.stringify(status));
            console.log('ERROR CONFIG :'+ JSON.stringify(config));
            return deferred.reject('There was an error fetching objects');
          });
    };

    // public api
    return {
      doSomethingAsync: doSomethingAsync,
      fetchSomethingFromServer: fetchSomethingFromServer
    };

  });
})();
