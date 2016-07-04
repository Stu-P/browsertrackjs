(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', 'datacontext', 'dashboardUtil', '$mdSidenav', 'authService', dashboard]);


    function dashboard(common, datacontext, dashboardUtil, $mdSidenav, authService) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Browser Version Track',
            description: ''
        };
        vm.isBusy = false;

        vm.authentication = authService.authentication;

        vm.title = 'Dashboard';
        vm.browsers = [];

        vm.selectedBrowser = undefined;

        vm.showPanel = false;
        vm.showOverdueScanWarning = false;
        vm.isWarningOpen = false;

        activate();

        vm.toggleShowPanel = function (bool) {
            vm.showPanel = bool;
        }

        vm.closeRightPanel = function () {
            $mdSidenav('right').close();
        }

        vm.openRightPanel = function (browser) {
            vm.selectedBrowser = browser;

            $mdSidenav('right').open();



        }


        vm.updateBrowser = function () {

            datacontext.updateBrowser(vm.selectedBrowser);

            //var promise = datacontext.updateBrowser(vm.selectedBrowser);

            //promise.then(function (status) {

            //});
        }

        vm.getIcon = common.getIconPath;


        function activate() {
            var promises = [getBrowsers()];
            common.activateController(promises, controllerId)
                .then(function () {
                    vm.showOverdueScanWarning = dashboardUtil.showScanOverdueWarning(moment(), vm.browsers);
                });
        }

        function getBrowsers() {
            vm.isBusy = true;
            //var promise = datacontext.getBrowsersWebApi();
            //promise.then(function (payload) {
            //    vm.isBusy = false;
            //    return vm.browsers = payload;
            //});

            return datacontext.getBrowsers()
                .then(function (payload) {
                    vm.isBusy = false;
                    return vm.browsers = payload;
                });
        }
    }

    angular.module('app').factory('dashboardUtil', [dashboardUtil]);

    function dashboardUtil() {
        var service = {
            filterBrowsersByEnabled: filterBrowsersByEnabled,
            showScanOverdueWarning: showScanOverdueWarning
        };

        return service;

        //take an array of browsers, and return an array of those only containing 
        function filterBrowsersByEnabled(allBrowsers) {
            var scanEnabledBrowsers = [];

            for (var i = 0; i < allBrowsers.length ; i++) {
                if (allBrowsers[i].versionCheckEnabled) {
                    scanEnabledBrowsers.push(allBrowsers[i]);
                }
            }
            return scanEnabledBrowsers;
        }

        // If last scan date is 48 hours overdue for any browser then set warning flag to true
        function showScanOverdueWarning(currentTime, allBrowsers) {

            var now = moment(currentTime);
            var anyOverdue = false;

            var allEnabled = filterBrowsersByEnabled(allBrowsers);

            for (var i = 0; i < allEnabled.length ; i++) {

                if (now.diff(allEnabled[i].lastVersionCheck, 'days') > 2) {
                    if (anyOverdue == false)
                        anyOverdue = true;
                }
            }
            return anyOverdue;

        }

    }




})();

