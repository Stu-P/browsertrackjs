(function () {
    'use strict';
    var controllerId = 'signup';
    angular.module('app').controller(controllerId, ['common', '$location', '$timeout', 'authService', signup]);

    function signup(common, $location, $timeout, authService) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Sign up';
        vm.savedSuccessfully = false;
        vm.message = "";
        vm.isBusy = false;

        vm.registration = {
            userName: "",
            password: "",
            confirmPassword: "",
            email: ""
        };

        vm.testDelay = function () {
            vm.isBusy = true;
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                vm.isBusy = false;
            }, 2000);

        };

        vm.signUp = function () {
            vm.isBusy = true;
            authService.saveRegistration(vm.registration).then(function (response) {
                vm.isBusy = false;
                vm.savedSuccessfully = true;
                vm.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                
                startTimer();
            },
            function (response) {
                vm.isBusy = false;
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                    vm.message = "Failed to register user:" + errors.join(' ');
                }
            });
        };

        function startTimer () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/login');
            }, 2000);
        }


        
        function activate() {
            common.activateController([], controllerId)
                .then(function () { });
        }
    }
})();