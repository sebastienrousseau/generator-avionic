'use strict';

/**
 * @ngdoc service
 * @name <%= ngModulName %>.ApiService
 * @description
 * # ApiService
 * Retrieves correct api to make requests against.
 * Uses settings from CONFIG defined in /config/<%= ngModulName %>.config.js
 *
 * Usage example: $http({
 *                      url: ApiService.getEndPoint() + '/things',
 *                      method: 'GET'
 *                 })
 *
 */
angular.module('<%= ngModulName %>')
  .factory('ApiService', function($window, $http, CONFIG) {

    var _api = CONFIG;
    var endpoint = _api.port ? (_api.host + ':' + _api.port + _api.path) : (_api.host + _api.path);

    // activate for basic auth
    if (_api.needsAuth) {
      $http.defaults.headers.common.Authorization = 'Basic ' + $window.btoa(_api.username + ':' + _api.password);
    }

    // public api
    return {
      getEndpoint: function() { return endpoint; }
    };

  });
