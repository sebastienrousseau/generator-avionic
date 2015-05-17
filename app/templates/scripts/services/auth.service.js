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
  .value('API_CREDENTIALS',{
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With',
    APP_ID: 'yqd4SRU8wu8a2fgaLEl3pZklSXlPtLMyHWxyjCUM',
    REST_API_KEY:'vF5EUcOIdkr8c9P7dSqOvhWcexJ1d11Mv0HNz4DV'
  })
  .factory('AuthService', AuthService);

  var apiUrl = 'https://api.parse.com/1/users';
  var loginUrl = 'https://api.parse.com/1/login';

  AuthService.$inject = ['$localstorage', '$cordovaOauth', '$location', '$http'];

  function AuthService($localstorage, $cordovaOauth, $location, $http, API_CREDENTIALS) {
    return {

      //Signup user to Parse api
      signupUser:function(user){
        return $http.post(apiUrl,user,{
          headers:{
            'X-Parse-Application-Id': 'yqd4SRU8wu8a2fgaLEl3pZklSXlPtLMyHWxyjCUM',
            'X-Parse-REST-API-Key': 'vF5EUcOIdkr8c9P7dSqOvhWcexJ1d11Mv0HNz4DV',
            'Content-Type':'application/json'
          },
          data: user
        });
      },

      //Logs in user
      loginUser: function(user){
        return $http.get(loginUrl,{
          headers: {
            'X-Parse-Application-Id': 'yqd4SRU8wu8a2fgaLEl3pZklSXlPtLMyHWxyjCUM',
            'X-Parse-REST-API-Key': 'vF5EUcOIdkr8c9P7dSqOvhWcexJ1d11Mv0HNz4DV',
            'Content-Type':'application/json'
          },
          params:{
            'username': user.username,
            'password': user.password
          }
        });
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
      };
    }
  })();
