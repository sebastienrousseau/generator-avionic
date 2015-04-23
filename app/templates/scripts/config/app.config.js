(function () {
  'use strict';
  /**
   * @ngdoc constant
   * @name <%= ngModulName %>.CONFIG
   * @description
   * # CONFIG
   * Defines the API endpoint where our resources will make requests against.
   * Is used inside /services/ApiService.js to generate correct endpoint dynamically
   */

   var <%= ngModulName %> = angular.module('<%= ngModulName %>');

   // development
   <%= ngModulName %>.constant('CONFIG', {
     host: 'http://localhost',
     port: 3000,
     path: '',
     needsAuth: false
   });


   // live example with HTTP Basic Auth
   /*
   <%= ngModulName %>.constant('CONFIG', {
     host: 'http://yourserver.com',
     path: '/api/v2',
     needsAuth: true,
     username: 'whatever',
     password: 'foobar'
   });
   */

})();
