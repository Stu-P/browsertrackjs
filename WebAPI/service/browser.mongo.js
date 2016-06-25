'use strict';

const database = require('../database/mongo'),
    Browser = require('../database/mongo/browserModel');

/**
 * @public
 * @constructor
 */
function BrowserService() {


    this.list = () => {
        return Browser.find();
    };


    this.update = () => {
//        var versionchange = new Browser({
  //          newVersion : newVersion,
    //        priorVersion : priorVersion,
     //       dateOfChange : dateOfChange,
      //      browserName : browserName
       // });

        return Browser.save();
    };


}

module.exports = new BrowserService();