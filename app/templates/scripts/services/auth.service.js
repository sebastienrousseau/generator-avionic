(function () {
  'use strict';

  /**
  * @ngdoc function
  * @name <%= ngModulName %>.service:AuthService
  * @description
  * # AuthService
  */
  angular
  .module('<%= ngModulName %>')
  .factory('AuthService', AuthService);

  AuthService.$inject = ['$localstorage', '$cordovaOauth', '$location', '$http'];

  function AuthService($localstorage, $cordovaOauth, $location, $http) {
    return {

      loginUser: function(name, pw) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        if (name == 'user' && pw == 'secret') {
          deferred.resolve('Welcome ' + name + '!');
        } else {
          deferred.reject('Wrong credentials.');
        }
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        };
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        };
        return promise;
      },

      loginFacebook: function() {
        /*
        * First connects to facebook and get the token authentication
        */
        $cordovaOauth.facebook('889753241083286', ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {

          $http.get('https://graph.facebook.com/v2.3/me', { params: { access_token: result.access_token, fields: 'id,name,first_name,last_name,email,locale,picture', format: 'json' }}).then(function(result) {
            console.log("Response Object -> " + JSON.stringify(result));
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
        $cordovaOauth.google('931284429036-cdc36fmdkk8qach6a86s5ag4llgcove9.apps.googleusercontent.com',  ["email"]).then(function(result) {
          $localstorage.set('googAccessToken', result.access_token);
          $http.get("https://www.googleapis.com/oauth2/v1/userinfo", {
            params: { access_token: result.access_token,
              fields: "id,email,verified_email,name,given_name,family_name,picture,gender,locale",
              format: "json"}
            }).then(function(result2) {
              console.log("Response Object -> " + JSON.stringify(result2.data));
              $localstorage.set('googUserId', result2.data.id);
              $localstorage.set('googUserFirstName', result2.data.given_name);
              $localstorage.set('googUserLastName', result2.data.family_name);
              $localstorage.set('googUserName', result2.data.name);
              $localstorage.set('googUserEmail', result2.data.email);
              $localstorage.set('googUserPicture', result2.data.picture);

            }, function(error) {
              alert('There was a problem signing in!  See the console for logs');
              console.log(error);
              // $location.path('/login');
            });
          });
        },

        loginTwitter: function() {
          /*
          * Connects to Twitter and get the token authentication
          */
          // $cordovaOauth.twitter('NPdS21200O14f3K3VS3Zw6CFP', 'kAKBzcKw2T8Ekr7l8F1O1PWpUlOO6EuvK1ZlbKrzXSpByWFgv').then(function(result) {
          //
          //     $localstorage.set('authToken', result.access_token);
          //
          // }, function(error) {
          //     // alert('There was a problem signing in!  See the console for logs');
          //     console.log(error);
          //     // $location.path('/login');
          // });
        },

        isLogged: function() {
          return ($localstorage.userId && $localstorage.authToken);
        },

        logout: function(callback) {
          delete $localstorage.userId;
          delete $localstorage.userName;
          delete $localstorage.authToken;
          delete $localstorage.userEmail;
        }
      }
    }
  })();