/**
*
*  AVIONIC
*  Propelling World-class Cross-platform Hybrid Applications ✈
*
*  Copyright 2015 Reedia Limited. All rights reserved.
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the 'Software'), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.

*  THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*
*/
/*jshint camelcase: false */
(function () {
  'use strict';

  /**
  * @ngdoc function
  * @name <%= ngModulName %>.service:AuthService
  * @description
  * # AuthService  - Basic authentication service. This class presents a basic authentication service, which offers authentication functionality.
  */
  function AuthService($localstorage, $cordovaOauth, $location, $http, API_CREDENTIALS, facebookConfig, googleConfig, twitterConfig) {
    return {

      //Signup user to Parse api
      signupUser:function(user){
        return $http.post(apiUrl,user,{
          headers:{
            'X-Parse-Application-Id': API_CREDENTIALS.APP_ID,
            'X-Parse-REST-API-Key': API_CREDENTIALS.REST_API_KEY,
            'Content-Type':'application/json'
          },
          data: user
        });
      },

      //Logs in user
      loginUser: function(user){
        return $http.get(loginUrl,{
          headers: {
            'X-Parse-Application-Id': API_CREDENTIALS.APP_ID,
            'X-Parse-REST-API-Key': API_CREDENTIALS.REST_API_KEY,
            'Content-Type':'application/json'
          },
          params:{
            'username': user.username,
            'password': user.password
          }
        }).then(function(result) {
          console.log('Response Object -> ' + JSON.stringify(result));
          console.log(result.data.first_name + ' is logged in. Session id is ' + result.data.sessionToken);
          $localstorage.set('appSessionToken', result.data.sessionToken);
          $localstorage.set('appFirst_name', result.data.first_name);
          $localstorage.set('appLast_name', result.data.last_name);
          $localstorage.set('appUsername', result.data.username);
          $location.path('/app/home/');
        });
      },

      loginFacebook: function() {
        /*
        * First connects to facebook and get the token authentication
        */
        $cordovaOauth.facebook(facebookConfig.FACEBOOK_ID, ['email', 'read_stream', 'user_website', 'user_location', 'user_relationships']).then(function(result) {

          $http.get('https://graph.facebook.com/v2.3/me', { params: { access_token: result.access_token, fields: 'id,name,first_name,last_name,email,locale,picture', format: 'json' }}).then(function(result) {
            console.log('Response Object -> ' + JSON.stringify(result));
            $localstorage.accessToken = result.access_token;
            $localstorage.set('fbAuthToken', result.access_token);
            $localstorage.set('fbUserId', result.data.id);
            $localstorage.set('fbUserFirstName', result.data.first_name);
            $localstorage.set('fbUserLastName', result.data.last_name);
            $localstorage.set('fbUserName', result.data.name);
            $localstorage.set('fbUserEmail', result.data.email);
            $localstorage.set('fbUserLocale', result.data.locale);


          }, function(error) {
            // alert('There was a problem getting your profile.  Check the logs for details.');
            console.log(error);
            // $location.path('/login');
          });

        }, function(error) {
          // alert('There was a problem signing in!  See the console for logs');
          console.log(error);
          // $location.path('/login');
        });
      },

      loginGoogle: function() {
        /*
        * First connects to Google and get the token authentication
        */
        $cordovaOauth.google(googleConfig.GOOGLE_ID,  ['email']).then(function(result) {
          $localstorage.set('googAccessToken', result.access_token);
          $http.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            params: { access_token: result.access_token,
              fields: 'id,email,verified_email,name,given_name,family_name,picture,gender,locale',
              format: 'json'}
            }).then(function(result2) {
              console.log('Response Object -> ' + JSON.stringify(result2.data));
              $localstorage.set('googUserId', result2.data.id);
              $localstorage.set('googUserFirstName', result2.data.given_name);
              $localstorage.set('googUserLastName', result2.data.family_name);
              $localstorage.set('googUserName', result2.data.name);
              $localstorage.set('googUserEmail', result2.data.email);
              $localstorage.set('googUserPicture', result2.data.picture);

            }, function(error) {
              console.log(error);
              // $location.path('/login');
            });
          });
        },

        loginTwitter: function() {
        /*
        * Connects to Twitter and get the token authentication
        */
        $cordovaOauth.twitter(twitterConfig.TWITTER_ID, twitterConfig.TWITTER_SECRET).then(function(result) {

            $localstorage.set('twitterAuthToken', result.access_token);

        }, function(error) {
            // alert('There was a problem signing in!  See the console for logs');
            console.log(error);
            // $location.path('/login');
        });
        },

        isLogged: function() {
          $location.path('/app/home');
          return ($localstorage.userId && $localstorage.authToken);
        },

        logout: function() {
          delete $localstorage.userId;
          delete $localstorage.userName;
          delete $localstorage.authToken;
          delete $localstorage.userEmail;
        }
      };
    }

  var <%= ngModulName %> = angular.module('<%= ngModulName %>');
  <%= ngModulName %>.factory('AuthService', AuthService);

  var apiUrl = 'https://api.parse.com/1/users';
  var loginUrl = 'https://api.parse.com/1/login';

  AuthService.$inject = ['$localstorage', '$cordovaOauth', '$location', '$http','API_CREDENTIALS', 'facebookConfig', 'googleConfig', 'twitterConfig'];


  })();
