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
  * @ngdoc constant
  * @name <%= ngModulName %>.CONFIG
  * @description
  * # CONFIG
  * Defines the API endpoint where our resources will make requests against.
  * Is used inside /services/api.service.js to generate correct endpoint dynamically
  */

  var <%= ngModulName %> = angular.module('<%= ngModulName %>');

  // development
  <%= ngModulName %>.constant('CONFIG', {
    'host': 'http://localhost',
    'port': 3000,
    'path': '',
    'needsAuth': false
  });

  <%= ngModulName %>.constant('facebookConfig', {
    'FACEBOOK_ID': '889753241083286'
  });


  <%= ngModulName %>.constant('googleConfig', {
    'GOOGLE_ID': '931284429036-cdc36fmdkk8qach6a86s5ag4llgcove9.apps.googleusercontent.com'
  });

  <%= ngModulName %>.constant('twitterConfig', {
    'TWITTER_ID': 'NPdS21200O14f3K3VS3Zw6CFP',
    'TWITTER_SECRET': 'kAKBzcKw2T8Ekr7l8F1O1PWpUlOO6EuvK1ZlbKrzXSpByWFgv'
  });


  <%= ngModulName %>.constant('API_CREDENTIALS', {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With',
    'APP_ID': 'yqd4SRU8wu8a2fgaLEl3pZklSXlPtLMyHWxyjCUM',
    'REST_API_KEY':'vF5EUcOIdkr8c9P7dSqOvhWcexJ1d11Mv0HNz4DV'
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
