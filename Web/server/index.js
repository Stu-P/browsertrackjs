'use strict';

// Require express, another hosting platform for Node.js
const express = require('express'),
    // Require the body-parser for express

    bodyParser = require('body-parser');

var path = require('path');

//require oauthserver
//var OAuthServer = require('oauth2-server');   //express-oauth-server
var OAuthServer = require('express-oauth-server');

// Require the controllers
var controllers = require('../controllers'),
    // Require configuration
    config = require('../config'),
    // use /database/{databaseType}
    database = require(`../database/${config.db.type}`);

function Server() {
    let app;

    /**
     * Starts the STS server on the given port
     * @param {number} port - The port where to start the server
     */
    this.start = port => {
        // Create a new express instance
        app = express();

        // Add the urlencoded parser middleware for express: https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
        app.use(bodyParser.urlencoded({ extended: false }));

        // Add the json parser middleware for express: https://github.com/expressjs/body-parser#bodyparserjsonoptions
        app.use(bodyParser.json());

        // AngularJS website
        app.use(express.static('./web/public'));



        // Configure the database to use PostgreSQL or Mongodb
        database.configure(config.db.connectionString);


        var router = express.Router();

        // Add oauth support
        var oauth = new OAuthServer({
            model: require('./oAuthModel'),
            grants: ['password'],
            debug: true
        });

        router.use(oauth.authenticate());



        app.all('/oauth/token', oauth.token());


        // Initialize all controllers
        router.get('/', function (req, res) {
            res.json({ message: 'hooray! welcome to our api!' });
        });

        controllers.initialize(router);

        app.use('/api', router);

        app.get('/auth', function (req, res) {
            if(res.status != 401)
            res.send('secret area');
            //  res.status(200).json('secret area');

        });




        //      app.use(app.oauth.errorHandler());

        app.listen(port, () => console.log(`WEB is up and running on port ${port}.`));
    };

}
module.exports = Server;