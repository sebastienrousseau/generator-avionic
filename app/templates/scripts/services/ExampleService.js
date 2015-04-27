(function () {
  'use strict';

  /**
  * @ngdoc function
  * @name <%= ngModulName %>.service:ExampleService
  * @description
  * # ExampleService
  */
  angular.module('<%= ngModulName %>')

  .value('API_CREDENTIALS',{
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With',
    APP_ID: 'yqd4SRU8wu8a2fgaLEl3pZklSXlPtLMyHWxyjCUM',
    REST_API_KEY:'vF5EUcOIdkr8c9P7dSqOvhWcexJ1d11Mv0HNz4DV'
  })

  .factory('ExampleService',['$http','API_CREDENTIALS',function($http,API_CREDENTIALS) {

    var apiUrl = 'https://api.parse.com/1/classes/Avionic';

    return {
        getAll:function(){
            return $http.get(apiUrl,{
              headers:{
                'X-Parse-Application-Id': API_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': API_CREDENTIALS.REST_API_KEY
              }
            });
        },
        get:function(id){
            return $http.get(apiUrl+id,{
                headers:{
                  'X-Parse-Application-Id': API_CREDENTIALS.APP_ID,
                  'X-Parse-REST-API-Key': API_CREDENTIALS.REST_API_KEY
                }
            });
        },
        create:function(data){
            return $http.post(apiUrl,data,{
                headers:{
                  'X-Parse-Application-Id': API_CREDENTIALS.APP_ID,
                  'X-Parse-REST-API-Key': API_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        edit:function(id,data){
            return $http.put(apiUrl+id,data,{
                headers:{
                  'X-Parse-Application-Id': API_CREDENTIALS.APP_ID,
                  'X-Parse-REST-API-Key': API_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        delete:function(id){
            return $http.delete(apiUrl+id,{
                headers:{
                  'X-Parse-Application-Id': API_CREDENTIALS.APP_ID,
                  'X-Parse-REST-API-Key': API_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        }
    };
  }]);
})();
