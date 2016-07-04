'use strict';

const Server = require('./server');
const server = new Server();
server.start(process.env.PORT || 5000);
