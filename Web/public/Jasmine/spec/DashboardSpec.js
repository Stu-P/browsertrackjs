/// <reference path="../lib/jasmine-2.3.4/jasmine.js" />
/// <reference path="../../Scripts/angular.js" />
/// <reference path="../../Scripts/angular-mocks.js" />

/// <reference path="../../Scripts/angular-route.js" />
/// <reference path="../../Scripts/angular-aria.js" />
/// <reference path="../../Scripts/angular-material.js" />
/// <reference path="../../Scripts/angular-sanitize.js" />
/// <reference path="../../Scripts/angular-animate.js" />

/// <reference path="../../Scripts/jquery-2.1.1.js" />
/// <reference path="../../Scripts/toastr.js" />
/// <reference path="../../Scripts/moment.js" />

/// <reference path="../../app/common/common.js" />
/// <reference path="../../app/common/logger.js" />

/// <reference path="../../app/app.js" />
/// <reference path="../../app/services/datacontext.js" />
/// <reference path="../../app/dashboard/dashboard.js" />

describe("Dashboard >", function () {

    beforeEach(function () {
        module("app");
    });

    var $httpBackend;

    beforeEach(inject(function ($injector) {

        $httpBackend = $injector.get("$httpBackend");

        serviceConfig = $injector.get("serviceConfig");
        //

        var mockGetAllBrowsers = [
                 { id: 5, name: "Chrome", os: "Windows", searchCriteria: null, currentVersion: "43", lastVersionCheck: "2015-07-05T09:24:21.453" },
                 { id: 6, name: "Firefox", os: "Windows", searchCriteria: null, currentVersion: "39.0", lastVersionCheck: "2015-07-05T09:24:23.967" },
                 { id: 7, name: "IE", os: "Windows", searchCriteria: null, currentVersion: "11.0.20", lastVersionCheck: "2015-07-05T09:24:26.407" },
                 { id: 8, name: "Safari", os: "OSX 10.10", searchCriteria: null, currentVersion: "8.0.7", lastVersionCheck: "2015-07-05T09:24:28.37" }
        ];


        $httpBackend.when("GET", serviceConfig.API + "Dashboard/GetAllBrowsers")
        .respond(mockGetAllBrowsers);

        $httpBackend.when('POST', serviceConfig.API + "Dashboard/Update")
        .respond(200, "true");

    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    describe("controller >", function () {



        //common, datacontext, $mdSidenav
        it("can be initialised", inject(function ($controller, common, datacontext, dashboardUtil, $mdSidenav) {

            $httpBackend.expectGET(serviceConfig.API + "Dashboard/GetAllBrowsers");

            var vm = $controller("dashboard", {
                common: common,
                datacontext: datacontext,
                dashboardUtil: dashboardUtil,
                $mdSidenav: $mdSidenav

            });

            $httpBackend.flush();

            expect(vm).not.toBeNull();
            expect(vm.title).toBe("Dashboard");

        }));
    });

    describe("Service >", function () {

        //common, datacontext, $mdSidenav
        it("can retrieve an array of all browsers", inject(function (datacontext) {

            $httpBackend.expectGET(serviceConfig.API + "Dashboard/GetAllBrowsers");

            var browsers = undefined;
            datacontext.getBrowsers().then(function (payload) { browsers = payload });

            $httpBackend.flush();

            expect(browsers).not.toBeNull();
            expect(browsers.length).toEqual(4);

        }));

        it("can update browser with 200 status", inject(function (datacontext) {

            $httpBackend.expectPOST(serviceConfig.API + "Dashboard/Update");

            var result = undefined;
            datacontext.updateBrowser({ id: 5, name: "Chrome", os: "Windows", searchCriteria: null, currentVersion: "43", lastVersionCheck: "2015-07-05T09:24:21.453" })
            .then(function (response) {
                result = response
            });
            $httpBackend.flush();

            expect(result).toBe(200);


        }));

    });

    describe("Utility >", function () {

        var dashboardUtil;


        beforeEach(inject(function ($injector) {

            dashboardUtil = $injector.get("dashboardUtil");

        }));


        it("can identify only browsers with version checking enabled", function () {

            var mockGetAllBrowsersResult = [
                { id: 5, name: "Chrome", os: "Windows", searchCriteria: null, currentVersion: "43", lastVersionCheck: "2015-07-05T09:24:21.453", versionCheckEnabled: true },
                { id: 6, name: "Firefox", os: "Windows", searchCriteria: null, currentVersion: "39.0", lastVersionCheck: "2015-07-02T09:24:23.967", versionCheckEnabled: false },
                { id: 7, name: "IE", os: "Windows", searchCriteria: null, currentVersion: "11.0.20", lastVersionCheck: "2015-07-05T03:24:26.407", versionCheckEnabled: true },
                { id: 8, name: "Safari", os: "OSX 10.10", searchCriteria: null, currentVersion: "8.0.7", lastVersionCheck: "2015-07-05T09:24:28.37", versionCheckEnabled: true }
            ];


            var result = dashboardUtil.filterBrowsersByEnabled(mockGetAllBrowsersResult);

            expect(result.length).toEqual(3);
            expect(result).toContain({ id: 5, name: "Chrome", os: "Windows", searchCriteria: null, currentVersion: "43", lastVersionCheck: "2015-07-05T09:24:21.453", versionCheckEnabled: true });
            expect(result).not.toContain({ id: 6, name: "Firefox", os: "Windows", searchCriteria: null, currentVersion: "39.0", lastVersionCheck: "2015-07-02T09:24:23.967", versionCheckEnabled: false });

        });


        it("can determine if last scan date for any browser exceeds 48 hours", function () {

            mockBrowsers = [
                { id: 5, name: "Chrome", os: "Windows", searchCriteria: null, currentVersion: "43", lastVersionCheck: "2015-07-05T09:24:21.453", versionCheckEnabled: true },
                { id: 7, name: "IE", os: "Windows", searchCriteria: null, currentVersion: "11.0.20", lastVersionCheck: "2015-07-02T03:24:26.407", versionCheckEnabled: true },
            ];

            mockBrowsers2 = [
                { id: 5, name: "Chrome", os: "Windows", searchCriteria: null, currentVersion: "43", lastVersionCheck: "2015-07-05T09:24:21.453", versionCheckEnabled: true },
                { id: 7, name: "IE", os: "Windows", searchCriteria: null, currentVersion: "11.0.20", lastVersionCheck: "2015-07-04T03:24:26.407", versionCheckEnabled: true },
            ];

            var now = "2015-07-05T14:24:21.453";

            var overdue = dashboardUtil.showScanOverdueWarning(now, mockBrowsers);
            expect(overdue).toBe(true);

            overdue = dashboardUtil.showScanOverdueWarning(now, mockBrowsers2);
            expect(overdue).toBe(false);


        });
    });

});