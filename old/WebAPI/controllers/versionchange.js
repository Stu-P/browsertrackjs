'use strict';

// Require the services
const services = require('../service');

/**
 * @public
 * @constructor
 */
function ChangeHistoryController() {
    this.initialize = function (server) {
        // Define a HTTP GET route which will execute "handleCustomerList"
        server.get('api/changehistory/list', handleChangeHistoryList);

        // Define a HTTP POST route
        server.post('api/changehistory', handleChangeHistoryAdd);

    }
};


    function handleChangeHistoryList(req, res) {
        // Call list method of the customer service
        services.get()
            .then(srv => srv.versionchange.list())
            .then(
                // Successful handler: Return a json
                customers => res.json(200, customers),

                // Error handler: Send a HTTP status code 500 together with the error
                err => res.json(500, err)
            );
    }


    function handleChangeHistoryAdd(req, res) {
        // req.body contains the json object which was transmitted
        services.get()
            .then(srv => srv.versionchange.create(req.body.newVersion, req.body.priorVersion, req.body.dateOfChange, req.body.browserName))
            .then(
                () => res.send(200),
                err => res.json(500, err)
            );
    }

    module.exports = new ChangeHistoryController();