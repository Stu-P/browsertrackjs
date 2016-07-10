'use strict';

// Require the services
const services = require('../service');

/**
 * @public
 * @constructor
 */
function AccountController() {
    this.initialize = function (server) {

        server.post('/account/register', handleRegisterPost);


    }
};

function handleRegisterPost(req, res) {
    
    services.get()
        .then(srv => srv.account.register(req.body))
        .then(
        // Successful handler: Return a json
       // browsers => res.json(200, browsers),
        user => res.status(200).json(user),

        // Error handler: Send a HTTP status code 500 together with the error
        //err => res.json(500, err)
        err =>
        res.status(500).json( err)
        
        );
}

module.exports = new AccountController();