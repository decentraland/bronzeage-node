/*!
 * tcp.js - tcp backend for decentraland
 * Copyright (c) 2014-2016, Christopher Jeffrey (MIT License).
 * Copyright (c) 2016-2017, Manuel Araoz (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

'use strict';

var net = require('net');
var tcp = exports;

tcp.createSocket = function createSocket(port, host, proxy) {
  return net.connect(port, host);
};

tcp.createServer = function createServer() {
  return new net.Server();
};
