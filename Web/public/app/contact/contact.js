(function () {
    'use strict';
    var controllerId = 'contact';
    angular.module('app').controller(controllerId, ['common', 'datacontext', '$location','authService', contact]);


    function contact(common, datacontext, $location, authService) {
        var getLogFn = common.logger.getLogFn;
        var logError = getLogFn(controllerId, 'error');
        var logSuccess = getLogFn(controllerId, 'success');

        var vm = this;
        vm.isBusy = false;

        vm.msgSentSuccessfully = false;

        vm.authentication = authService.authentication;

        vm.title = 'Contact';

        activate();

        vm.enquiry = {
            firstName: "",
            lastName: "",
            email: "",
            phone:"",
            enquiry:""
        };

        vm.sendEnquiry = function () {

            vm.isBusy = true;
            datacontext.sendEnquiry(vm.enquiry).then(function (response) {
                logSuccess('Enquiry Sent!', null, true);
                vm.msgSentSuccessfully = true;
                vm.isBusy = false;
            }, function (response) {
                vm.isBusy = false;
                logError('Enquiry Failed', null, true);
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                    //vm.message = "Failed to send enquiry" + errors.join(' ');
                }

            });
            

        };


        function activate() {
            if (!vm.authentication.isAuth) {
                $location.path('/login');
            }
        }
    }
})();