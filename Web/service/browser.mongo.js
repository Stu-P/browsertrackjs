'use strict';

const database = require('../database/mongo'),
    Browser = require('../database/mongo/browserModel');

var util = require('util')

/**
 * @public
 * @constructor
 */
function BrowserService() {


    this.list = () => {
        return Browser.find();
    };


    this.update = (updatedBrowser) => {
     //   console.log("Update browser: " + util.inspect(updatedBrowser, { colours: true }));

        var query = {_id:updatedBrowser._id };
        return Browser.findOneAndUpdate(query, updatedBrowser, {new : true});

    };


}

module.exports = new BrowserService();