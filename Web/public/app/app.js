(function () {
    'use strict';
    
    var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',        // animations
        'ngRoute',          // routing
        'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)
        'ngMaterial',        // Google Material UI/UX
        

        // Custom modules 
        'common',           // common functions, logger, spinner
       // 'common.bootstrap', // bootstrap dialog wrapper functions

        // 3rd Party Modules
       // 'ui.bootstrap'      // ui-bootstrap (ex: carousel, pagination, dialog)
       'LocalStorageModule'
    ]);

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });
    
    // Handle routing errors and success events
    app.run(['$route', 'authService', function ($route, authService) {
        // Include $route to kick start the router.
        authService.fillAuthData();
        }]);        
})();