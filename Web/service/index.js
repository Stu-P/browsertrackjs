'use strict';

const globalConfig = require('../config'),
    versionChangeDatabaseService = require(`./versionchange.mongo`),
    accountDatabaseService = require(`./account.mongo`),
	browserDatabaseService = require(`./browser.mongo`);


let config = {};

/**
 * @public
 * @constructor
 */
function Services() {
    this.versionchange = versionChangeDatabaseService;
    this.browser = browserDatabaseService;
    this.account = accountDatabaseService;
}

let servicesInstance;

module.exports = {
    get: () => {
        if (servicesInstance) {
            return Promise.resolve(servicesInstance);
        }

        return new Promise(resolve => {
            var instance = new Services();
            resolve(instance);
        });
    },
        put: () => {
        if (servicesInstance) {
            return Promise.resolve(servicesInstance);
        }

        return new Promise(resolve => {
            var instance = new Services();
            resolve(instance);
        });
    }
};