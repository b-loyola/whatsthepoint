const http = require('http');

const app = require('./app');
const server = http.Server(app);

module.exports = server;
