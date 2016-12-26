/*!
 * native.js - native bindings for decentraland
 * Copyright (c) 2016, Christopher Jeffrey (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

'use strict';

exports.binding = null;

if (+process.env.DECENTRALAND_NO_NATIVE !== 1) {
  try {
    exports.binding = require('bcoin-native');
  } catch (e) {
    ;
  }
}
