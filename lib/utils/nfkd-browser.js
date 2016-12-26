/**
 * nfkd-browser.js - unicode normalization for decentraland
 * Copyright (c) 2014-2016, Christopher Jeffrey (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

var unorm = require('../../vendor/unorm');

function nfkd(str) {
  if (str.normalize)
    return str.normalize('NFKD');

  return unorm.nfkd(str);
}

/*
 * Expose
 */

module.exports = nfkd;
