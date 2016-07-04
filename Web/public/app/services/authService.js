(function () {

    'use strict';
    var serviceId = 'authService';

    angular.module('app').factory(serviceId, ['$http', '$q', 'localStorageService', 'common', 'serviceConfig', authService]);

    function authService($http, $q, localStorageService, common, serviceConfig) {

        var serviceBase = serviceConfig.API

        var logSuccess = common.logger.getLogFn(serviceId, 'success');


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

            return $http.post(serviceBase + 'account/register', registration).then(function (response) {
                return response;
            });
        }

        function login(loginData) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            var deferred = $q.defer();

            $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

                authentication.isAuth = true;
                authentication.userName = loginData.userName;

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
            authentication.userName = "";
        }

        function fillAuthData() {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                authentication.isAuth = true;
                authentication.userName = authData.userName;
            }

        }

    }
})();

