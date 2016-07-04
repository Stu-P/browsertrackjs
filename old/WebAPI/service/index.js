'use strict';

const customerInMemoryService = require('./customer.inmemory'),
    globalConfig = require('../config'),
    customerDatabaseService = require(`./customer.${globalConfig.db.type}`),
    versionChangeDatabaseService = require(`./versionchange.mongo`),
	browserDatabaseService = require(`./browser.mongo`);

let config = {};

/**
 * @public
 * @constructor
 */
function Services() {
    this.customer = config.useInMemoryService ? customerInMemoryService : customerDatabaseService;
    this.versionchange = versionChangeDatabaseService;
    this.browser = browserDatabaseService;
}

let servicesInstance;

module.exports = {
    configure: (useInMemoryService) => {
        config.useInMemoryService = useInMemoryService;
    },
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