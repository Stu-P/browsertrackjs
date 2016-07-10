(function () {

    'use strict';
    var serviceId = 'authService';

    angular.module('app').factory(serviceId, ['$http', '$q', 'localStorageService', 'common', 'serviceConfig', authService]);

    function authService($http, $q, localStorageService, common, serviceConfig) {

        var serviceBase = serviceConfig.API

        var logSuccess = common.logger.getLogFn(serviceId, 'success');

        var clientId = "browsertrackweb";
        var clientSecret = "45%26g87g%5Ef%25f";
    
        var authentication = {
            isAuth: false,
            userName: ""
        };

        var service = {
            saveRegistration: saveRegistration,
            login: login,
            logOut: logOut,
            fillAuthData: fillAuthData,
            authentication: authentication
        };
        ;
        return service;


        function saveRegistration(registration) {

            logOut();

            return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
                return response;
            });
        }

        function login(loginData) {

            var data = "grant_type=password&username=" + loginData.username + "&password=" + loginData.password + "&client_id=" + clientId+ "&client_secret=" + clientSecret ;
            var deferred = $q.defer();

            $http.post(serviceBase + 'oauth/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                localStorageService.set('authorizationData', { token: response.access_token, username: loginData.username });

                authentication.isAuth = true;
                authentication.username = loginData.username;

                deferred.resolve(response);

            }).error(function (err, status) {
                logOut();
                deferred.reject(err);
            });

            return deferred.promise;
        }


        function logOut(toastr) {

            if (toastr == true) {
                logSuccess('Logged out', null, true);
           }

            localStorageService.remove('authorizationData');

            authentication.isAuth = false;
            authentication.username = "";
        }

        function fillAuthData() {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                authentication.isAuth = true;
                authentication.username = authData.username;
            }

        }

    }
})();

