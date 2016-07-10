'use strict';

const database = require('../database/mongo'),
    User = require('../database/mongo/oAuthModel');

var util = require('util')

/**
 * @public
 * @constructor
 */
function AccountService() {



    this.register = (newUser) => {
        var user = new User(newUser);
        return user.save();

    };


}

module.exports = new AccountService();