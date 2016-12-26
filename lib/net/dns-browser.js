/*!
 * dns.js - dns backend for decentraland
 * Copyright (c) 2014-2016, Christopher Jeffrey (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

'use strict';

var ProxySocket = require('./proxysocket');
var socket;

exports.resolve = function resolve(host, proxy) {
  return new Promise(function(resolve, reject) {
    if (!socket)
      socket = new ProxySocket(proxy);

    socket.resolve(host, 'A', function(err, result) {
      if (err) {
        reject(err);
        return;
      }

      if (result.length === 0) {
        reject(new Error('No DNS results.'));
        return;
      }

      resolve(result);
    });
  });
};
