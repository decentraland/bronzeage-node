/*!
 * lazy.js - lazy loading for decentraland
 * Copyright (c) 2016, Christopher Jeffrey (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

'use strict';

module.exports = function lazy(require, exports) {
  return function _require(name, path) {
    var cache;
    exports.__defineGetter__(name, function() {
      if (!cache)
        cache = require(path);
      return cache;
    });
  };
};
