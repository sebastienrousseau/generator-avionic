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
(function () {
  'use strict';

  /**
  * @ngdoc function
  * @name <%= ngModulName %>.service:UserService
  * @description
  * # UserService
  */
  angular
  .module('<%= ngModulName %>')
  .factory('UserService',['$http','API_CREDENTIALS',function($http,API_CREDENTIALS) {

    var apiUrl = 'https://api.parse.com/1/users';

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
            return $http.get(apiUrl+'/'+id,{
                headers:{
                  'X-Parse-Application-Id': API_CREDENTIALS.APP_ID,
                  'X-Parse-REST-API-Key': API_CREDENTIALS.REST_API_KEY
                }
            });
        },
        createUser:function(data){

            return $http.post(apiUrl,data,{
                headers:{
                  'X-Parse-Application-Id': API_CREDENTIALS.APP_ID,
                  'X-Parse-REST-API-Key': API_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        edit:function(id,data){
          return $http.put(apiUrl+'/'+id,data,{
                headers:{
                  'X-Parse-Application-Id': API_CREDENTIALS.APP_ID,
                  'X-Parse-REST-API-Key': API_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        delete:function(id){
            return $http.delete(apiUrl+'/'+id,{
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
