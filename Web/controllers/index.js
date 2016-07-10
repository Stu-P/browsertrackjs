'use strict';

const versionController = require('./versionchange'),
    browserController = require('./browser'),
    accountController = require('./account');
/**
 * @public
 * @constructor
 */
function Controllers() {
    this.initialize = function (server, auth) {
        versionController.initialize(server);
        browserController.initialize(server, auth);
        accountController.initialize(server);
    };
}

module.exports = new Controllers();