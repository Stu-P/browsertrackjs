(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['common', 'serviceConfig', datacontext]);

    function datacontext(common, serviceConfig) {


        //  var apiBaseUrl = "http://browsertrackapi.azurewebsites.net/";
        var apiBaseUrl = serviceConfig.API

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(serviceId);
        var logError = getLogFn(serviceId, 'error');

        var $q = common.$q;
        var $http = common.$http;

        var service = {
            //getPeople: getPeople,
            //getMessageCount: getMessageCount,
            getBrowsers: getBrowsers,
            //getVersionChangeHistory: getVersionChangeHistory,
            getVersionChangeHistoryWebApi: getVersionChangeHistoryWebApi,
            updateBrowser: updateBrowser,
            sendEnquiry: sendEnquiry
        };

        return service;

        //function getMessageCount() { return $q.when(72); }

        //function getPeople() {
        //    var people = [
        //        { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
        //        { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
        //        { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
        //        { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
        //        { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
        //        { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
        //        { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
        //    ];
        //    return $q.when(people);
        //}







        function getBrowsers() {

            return $http.get(apiBaseUrl + 'api/browsers').then(
                function (response) {
                    return response.data;
                },
                function (httpError) {
                    logError("Unable to retrieve browser list from server", status, true);
                });
        }


        function getVersionChangeHistoryWebApi() {
            return $http.get(apiBaseUrl + 'api/changehistory/list').then(
                function (response) {
                    return response.data;
                },
                function (httpError) {
                    logError("Unable to retrieve version history list from server", status, true);
                });
        }


        function updateBrowser(browser) {
            return $http.put(apiBaseUrl + 'api/browsers', browser).then(
                 function (response) {
                     return response.status;
                 }, function (httpError) {
                     logError("Unable to update browser details", status, true);

                 });


        }

        function sendEnquiry(enquiry) {

            return $http.post(apiBaseUrl + 'Contact/Enquiry', enquiry).then(function (response) {
                return response;
            });
        }

        //function getVersionChangeHistory() {


        //    var versionChanges = [
        //        { id: 10, browserName: "Safari", newVersion: "8.0.7", priorVersion: "1.0", dateOfChange: "2015-07-05T09:24:28.37" },
        //        { id: 9, browserName: "IE", newVersion: "11.0.20", priorVersion: "1.0", dateOfChange: "2015-07-05T09:24:26.407" },
        //        { id: 8, browserName: "Firefox", newVersion: "39.0", priorVersion: "1.0", dateOfChange: "2015-07-05T09:24:23.967" },
        //        { id: 7, browserName: "Chrome", newVersion: "43.0.2357.130", priorVersion: "1.0", dateOfChange: "2015-07-05T09:24:21.453" },
        //        { id: 6, browserName: "Safari", newVersion: "43.0.2357.130", priorVersion: "42.0.2357.130", dateOfChange: "2015-07-05T09:21:19.01" },
        //        { id: 5, browserName: "Safari", newVersion: "43.02", priorVersion: "43.01", dateOfChange: "2015-07-04T13:49:12.96" }
        //    ];
        //    return $q.when(versionChanges);
        //}
            }
    })();