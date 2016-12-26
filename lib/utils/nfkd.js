/**
 * nfkd.js - unicode normalization for decentraland
 * Copyright (c) 2014-2016, Christopher Jeffrey (MIT License).
 * Copyright (c) 2016-2017, Manuel Araoz (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

var unorm;

function nfkd(str) {
  if (str.normalize)
    return str.normalize('NFKD');

  if (!unorm)
    unorm = require('../../vendor/unorm');

  return unorm.nfkd(str);
}

/*
 * Expose
 */

module.exports = nfkd;
