'use strict';

const customerController = require('./customer') ,
	versionController = require('./versionchange'),
    browserController = require('./browser');
/**
 * @public
 * @constructor
 */
function Controllers() {
    this.initialize = function (server) {
        customerController.initialize(server);
        versionController.initialize(server);
        browserController.initialize(server);
    };
}

module.exports = new Controllers();