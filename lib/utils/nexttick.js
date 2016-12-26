/*!
 * nexttick.js - setimmediate for decentraland
 * Copyright (c) 2014-2016, Christopher Jeffrey (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

module.exports = typeof setImmediate !== 'function'
  ? process.nextTick
  : setImmediate;
