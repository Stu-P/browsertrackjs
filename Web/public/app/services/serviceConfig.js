angular.module('app').service("serviceConfig", function () {
    if (window.location.host.match(/localhost/)) {
        return this.API = 'http://localhost:5000/';
    } else {
        return this.API = 'https://browsertrackapi.azurewebsites.net/';
    }
});