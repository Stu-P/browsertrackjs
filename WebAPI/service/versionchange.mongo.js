'use strict';

const database = require('../database/mongo'),
    VersionChange = require('../database/mongo/versionChangeModel');

/**
 * @public
 * @constructor
 */
function VersionChangeService() {


    this.list = () => {
        return VersionChange.find();
    };


    this.create = (newVersion, priorVersion, dateOfChange, browserName) => {
        var versionchange = new VersionChange({
            newVersion : newVersion,
            priorVersion : priorVersion,
            dateOfChange : dateOfChange,
            browserName : browserName
        });

        return VersionChange.save();
    };


}

module.exports = new VersionChangeService();