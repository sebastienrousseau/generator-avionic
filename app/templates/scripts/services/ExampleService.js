(function () {
  'use strict';

  /**
  * @ngdoc function
  * @name <%= ngModulName %>.service:ExampleService
  * @description
  * # ExampleService
  */
  angular.module('<%= ngModulName %>')
  .factory('ExampleService',['$http','API_CREDENTIALS',function($http,API_CREDENTIALS) {

    var endPointUrl = 'http://jsonstub.com/api';
    $http.defaults.headers.common['Access-Control-Allow-Origin']= endPointUrl;
    $http.defaults.headers.common['Access-Control-Allow-Headers']= 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With';
    $http.defaults.headers.common.Accept = 'application/json';
    $http.defaults.headers.common['Content-Type']= 'application/json';
    $http.defaults.headers.common['JsonStub-User-Key']= API_CREDENTIALS.USER_KEY;
    $http.defaults.headers.common['JsonStub-Project-Key']= API_CREDENTIALS.REST_API_KEY;

    return {
      getAll:function(){
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
            'JsonStub-User-Key': API_CREDENTIALS.USER_KEY,
            'JsonStub-Project-Key': API_CREDENTIALS.REST_API_KEY
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
          // return deferred.reject('There was an error fetching objects');
        });
      },
      get:function(id){
        return $http({
          url: 'endPointUrl'+id,
          method: 'GET',
          dataType: 'json',
          data: '',
          headers: {
            'Access-Control-Allow-Origin': 'http://jsonstub.com',
            'Access-Control-Allow-Headers': 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With',
            'Access-Control-Allow-Methods': 'GET',
            'Content-Type': 'application/json',
            'JsonStub-User-Key': API_CREDENTIALS.USER_KEY,
            'JsonStub-Project-Key': API_CREDENTIALS.REST_API_KEY
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
          // return deferred.reject('There was an error fetching objects');
        });
      },
      create:function(data){
        return $http.post(endPointUrl,data,{
          headers:{
            'Access-Control-Allow-Origin': ACCESS_CONTROL_ALLOW_ORIGIN,
            'Access-Control-Allow-Headers': ACCESS_CONTROL_ALLOW_HEADERS,
            'Access-Control-Allow-Methods': 'POST',
            'JsonStub-User-Key': API_CREDENTIALS.USER_KEY,
            'JsonStub-Project-Key':API_CREDENTIALS.REST_API_KEY,
            'Content-Type':'application/json'
          }
        });
      },
      edit:function(id,data){
        return $http.put('endPointUrl'+id,data,{
          headers:{
            'Access-Control-Allow-Origin': ACCESS_CONTROL_ALLOW_ORIGIN,
            'Access-Control-Allow-Headers': ACCESS_CONTROL_ALLOW_HEADERS,
            'Access-Control-Allow-Methods': 'PUT',
            'JsonStub-User-Key': API_CREDENTIALS.USER_KEY,
            'JsonStub-Project-Key':API_CREDENTIALS.REST_API_KEY,
            'Content-Type':'application/json'
          }
        });
      },
      delete:function(id){
        return $http.delete('endPointUrl'+id,{
          headers:{
            'Access-Control-Allow-Origin': ACCESS_CONTROL_ALLOW_ORIGIN,
            'Access-Control-Allow-Headers': ACCESS_CONTROL_ALLOW_HEADERS,
            'Access-Control-Allow-Methods': 'DELETE',
            'JsonStub-User-Key': API_CREDENTIALS.USER_KEY,
            'JsonStub-Project-Key':API_CREDENTIALS.REST_API_KEY,
            'Content-Type':'application/json'
          }
        });
      }
    };
  }]).value('API_CREDENTIALS',{
    USER_KEY: '0d69f758-3b93-4e27-89ea-959709deb4ba',
    REST_API_KEY:'d6ed0f8c-04bb-495f-a721-5c13b0223bc4',
    ACCESS_CONTROL_ALLOW_ORIGIN:'http://jsonstub.com',
    ACCESS_CONTROL_ALLOW_HEADERS:'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With'
  });



  // use factory for services
  // .factory('ExampleService', function($http, $timeout, $q) {
  //
  //
  //   var endPointUrl = 'http://jsonstub.com/api';
  //   var kindOfPrivateVariable = 42;
  //
  //   var doSomethingAsync = function() {
  //     var deferred = $q.defer();
  //     $timeout(deferred.resolve.bind(null, kindOfPrivateVariable), 1000);
  //     return deferred.promise;
  //   };
  //
  //   var fetchSomethingFromServer = function() {
  //     var deferred = $q.defer();
  //     return $http({
  //         url: endPointUrl,
  //         method: 'GET',
  //         dataType: 'json',
  //         data: '',
  //         headers: {
  //             'Access-Control-Allow-Origin': 'http://jsonstub.com',
  //             'Access-Control-Allow-Headers': 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With',
  //             'Access-Control-Allow-Methods': 'GET',
  //             'Content-Type': 'application/json',
  //             'JsonStub-User-Key': '0d69f758-3b93-4e27-89ea-959709deb4ba',
  //             'JsonStub-Project-Key': 'd6ed0f8c-04bb-495f-a721-5c13b0223bc4'
  //         }
  //     }).success(function(data, status, headers, config) {
  //           console.log('SUCCESS DATA: '+ JSON.stringify(data));
  //           console.log('SUCCESS STATUS: '+ JSON.stringify(status));
  //           console.log('SUCCESS CONFIG :'+ JSON.stringify(config));
  //
  //         })
  //         .error(function(data, status, headers, config) {
  //           console.log('ERROR DATA: '+ JSON.stringify(data));
  //           console.log('ERROR STATUS: '+ JSON.stringify(status));
  //           console.log('ERROR CONFIG :'+ JSON.stringify(config));
  //           return deferred.reject('There was an error fetching objects');
  //         });
  //   };
  //
  //   // public api
  //   return {
  //     doSomethingAsync: doSomethingAsync,
  //     fetchSomethingFromServer: fetchSomethingFromServer
  //   };
  //
  // });
})();
