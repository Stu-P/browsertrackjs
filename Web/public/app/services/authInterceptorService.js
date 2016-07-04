(function () {

    'use strict';
    var serviceId = 'authInterceptorService';

    angular.module('app').factory(serviceId, ['$q', '$location', 'localStorageService', authInterceptorService]);

    function authInterceptorService($q, $location, localStorageService) {

        var service = {
            request: request,
            responseError: responseError
        };

        return service;


        function request(config) {
            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        }

        function responseError(rejection) {
            if (rejection.status === 401) {
                $location.path('/login');
            }
            return $q.reject(rejection);
        }

    }
})();