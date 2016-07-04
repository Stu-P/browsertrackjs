'use strict';

const versionController = require('./versionchange'),
    browserController = require('./browser');
/**
 * @public
 * @constructor
 */
function Controllers() {
    this.initialize = function (server) {
        versionController.initialize(server);
        browserController.initialize(server);
    };
}

module.exports = new Controllers();