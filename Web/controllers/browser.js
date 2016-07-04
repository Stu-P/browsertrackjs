'use strict';

// Require the services
const services = require('../service');

/**
 * @public
 * @constructor
 */
function BrowserController() {
    this.initialize = function (server) {
        // Define a HTTP GET route which will execute "handleCustomerList"
        server.get('/browsers', handleBrowsersGet);
        server.put('/browsers', handleBrowsersPut);


    }
};

function handleBrowsersGet(req, res) {
    
    services.get()
        .then(srv => srv.browser.list())
        .then(
        // Successful handler: Return a json
       // browsers => res.json(200, browsers),
        browsers => res.status(200).json(browsers),

        // Error handler: Send a HTTP status code 500 together with the error
        //err => res.json(500, err)
        err => res.status(500).json( err)
        );
}

function handleBrowsersPut(req, res) {
    
    services.put()
        .then(srv => srv.browser.update(JSON.parse(req.body)))
        .then(
        // Successful handler: Return a json
        browser => res.json(200, browser),

        // Error handler: Send a HTTP status code 500 together with the error
        err => res.json(500, err)
        );
}

module.exports = new BrowserController();