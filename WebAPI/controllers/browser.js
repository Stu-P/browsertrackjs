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
        server.get('api/browsers', handleBrowsersGet);



    }
};

function handleBrowsersGet(req, res) {
    // Call list method of the customer service
    services.get()
        .then(srv => srv.browser.list())
        .then(
        // Successful handler: Return a json
        customers => res.json(200, customers),

        // Error handler: Send a HTTP status code 500 together with the error
        err => res.json(500, err)
        );
}

module.exports = new BrowserController();