/*!
 * dns.js - dns backend for decentraland
 * Copyright (c) 2014-2016, Christopher Jeffrey (MIT License).
 * Copyright (c) 2016-2017, Manuel Araoz (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

'use strict';

var dns = require('dns');

exports.resolve = function resolve(host) {
  return new Promise(function(resolve, reject) {
    dns.resolve(host, 'A', function(err, result) {
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
