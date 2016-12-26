/*!
 * tcp.js - tcp backend for decentraland
 * Copyright (c) 2014-2016, Christopher Jeffrey (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

'use strict';

var ProxySocket = require('./proxysocket');
var tcp = exports;

tcp.createSocket = function createSocket(port, host, proxy) {
  return ProxySocket.connect(proxy, port, host);
};

tcp.createServer = null;
