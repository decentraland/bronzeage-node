/**
 * backends.js - database backends for decentraland
 * Copyright (c) 2014-2016, Christopher Jeffrey (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

'use strict';

exports.get = function get(name) {
  if (name === 'rbt')
    return require('./rbt');

  try {
    return require(name);
  } catch (e) {
    throw new Error('Database backend "' + name + '" not found.');
  }
};
