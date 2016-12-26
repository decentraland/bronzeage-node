/*!
 * worker.js - worker thread/process for decentraland
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2016, Christopher Jeffrey (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

'use strict';

/* jshint worker: true */

self.importScripts('/decentraland-master.js');

self.onmessage = function onmessage(event) {
  var env;

  self.onmessage = function() {};

  env = JSON.parse(event.data);

  self.master.listen(env);
};
