(function () {
    'use strict';
    var controllerId = 'login';
    angular.module('app').controller(controllerId, ['common', '$location', 'authService', login]);

    function login(common, $location, authService) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var logSuccess = common.logger.getLogFn(controllerId, 'success');

        var vm = this;
        vm.title = 'Log In';
        vm.isBusy = false;

        vm.message = "";
        vm.loginData = {
            userName: "",
            password:""
        };

        vm.login = function () {
            vm.isBusy = true;
            authService.login(vm.loginData).then(function (response) {
                vm.isBusy = false;
                logSuccess('Successfully Logged In!', null, true);
                $location.path('/');
            }, function (err) {
                vm.isBusy = false;
                vm.message = err.error_description;
            });
        };
            
        






        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () {                 });
        }
    }
})();