(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: 'Dashboard'
                    }
                }
            }, {
                url: '/versionhistory',
                config: {
                    title: 'versionhistory',
                    templateUrl: 'app/versionhistory/versionhistory.html',
                    settings: {
                        nav: 2,
                        content: 'Version History'
                    }
                }
            },
            {
                url: '/contact',
                config: {
                    title: 'contact',
                    templateUrl: 'app/contact/contact.html',
                    settings: {
                        nav: 3,
                        content: 'Contact'
                    }
                }
            },
             {
                 url: '/login',
                 config: {
                     title: 'login',
                     templateUrl: 'app/admin/login.html'
                 }
             },
             {
                 url: '/signup',
                 config: {
                     title: 'signup',
                     templateUrl: 'app/admin/signup.html'
                 }
             }
        ];
    }
})();