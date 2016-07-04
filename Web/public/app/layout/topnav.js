(function () {
    'use strict';

    var controllerId = 'topnav';
    angular.module('app').controller(controllerId, ['$route', 'config', 'routes', 'authService', 'common', topnav]);

    function topnav($route, config, routes, authService, common) {
        var logSuccess = common.logger.getLogFn(controllerId, 'success');


        var vm = this;

        vm.authentication = authService.authentication;
        vm.logOut = authService.logOut;

            
            
    
        activate();



        function activate() {
            
        }

    
    };
})();
