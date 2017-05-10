/*!
 * env.js - environment for decentraland
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License).
 * Copyright (c) 2014-2016, Christopher Jeffrey (MIT License).
 * Copyright (c) 2016-2017, Manuel Araoz (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

'use strict';

var lazy = require('./utils/lazy');

/**
 * A Decentraland "environment" which is used for
 * bootstrapping the initial `decentraland` module.
 * It exposes all constructors for primitives,
 * the blockchain, mempool, wallet, etc. It
 * also sets the default network if there is
 * one. It exposes a global {@link TimeData}
 * object for adjusted time, as well as a
 * global worker pool.
 *
 * @exports Environment
 * @constructor
 *
 * @param {(Object|NetworkType)?} options - Options object or network type.
 * @param {(Network|NetworkType)?} options.network
 * @param {String} [options.prefix=~/.decentraland] - Prefix for filesystem.
 * @param {String} [options.db=leveldb] - Database backend.
 * @param {Boolean} [options.debug=false] - Whether to display debug output.
 * @param {String|Boolean} [options.debugFile=~/.debug.log] - A file to
 * pipe debug output to.
 * @param {Boolean} [options.profile=false] - Enable profiler.
 * @param {Boolean} [options.useWorkers=false] - Enable workers.
 * @param {Number} [options.maxWorkers=6] - Max size of
 * the worker pool.
 * @param {String} [options.workerUri=/decentraland-worker.js] Location of the decentraland
 * worker.js file for web workers.
 * @param {String} [options.proxyServer=localhost:8080] -
 * Websocket->tcp proxy server for browser.
 * @param {Object?} options.logger - Custom logger.
 * @property {Boolean} isBrowser
 * @property {NetworkType} networkType
 *
 * @property {Function} bn - Big number constructor
 * (see {@link https://github.com/indutny/bn.js} for docs).
 * @property {Object} utils - {@link module:utils}.
 * @property {Function} locker - {@link Locker} constructor.
 * @property {Function} reader - {@link BufferReader} constructor.
 * @property {Function} writer - {@link BufferWriter} constructor.
 * @property {Object} ec - {@link module:ec}.
 * @property {Function} lru - {@link LRU} constructor.
 * @property {Function} bloom - {@link Bloom} constructor.
 * @property {Function} rbt - {@link RBT} constructor.
 * @property {Function} lowlevelup - See {@link LowlevelUp}.
 * @property {Function} uri - See {@link module:uri}.
 * @property {Function} logger - {@link Logger} constructor.
 *
 * @property {Object} constants - See {@link module:constants}.
 * @property {Object} networks - See {@link module:network}.
 * @property {Object} errors
 * @property {Function} errors.VerifyError - {@link VerifyError} constructor.
 * @property {Function} errors.ScriptError - {@link ScriptError} constructor.
 * @property {Function} profiler - {@link module:profiler}.
 * @property {Function} ldb - See {@link module:ldb}.
 * @property {Function} script - {@link Script} constructor.
 * @property {Function} opcode - {@link Opcode} constructor.
 * @property {Function} stack - {@link Stack} constructor.
 * @property {Function} witness - {@link Witness} constructor.
 * @property {Function} input - {@link Input} constructor.
 * @property {Function} output - {@link Output} constructor.
 * @property {Function} coin - {@link Coin} constructor.
 * @property {Function} coins - {@link Coins} constructor.
 * @property {Function} coinview - {@link CoinView} constructor.
 * @property {Function} tx - {@link TX} constructor.
 * @property {Function} mtx - {@link MTX} constructor.
 * @property {Function} txdb - {@link TXDB} constructor.
 * @property {Function} abstractblock - {@link AbstractBlock} constructor.
 * @property {Function} memblock - {@link MemBlock} constructor.
 * @property {Function} block - {@link Block} constructor.
 * @property {Function} merkleblock - {@link MerkleBlock} constructor.
 * @property {Function} headers - {@link Headers} constructor.
 * @property {Function} node - {@link Node} constructor.
 * @property {Function} spvnode - {@link SPVNode} constructor.
 * @property {Function} fullnode - {@link Fullnode} constructor.
 * @property {Function} chainentry - {@link ChainEntry} constructor.
 * @property {Function} chaindb - {@link ChainDB} constructor.
 * @property {Function} chain - {@link Chain} constructor.
 * @property {Function} mempool - {@link Mempool} constructor.
 * @property {Function} mempoolentry - {@link MempoolEntry} constructor.
 * @property {Function} hd - {@link HD} constructor.
 * @property {Function} address - {@link Address} constructor.
 * @property {Function} wallet - {@link Wallet} constructor.
 * @property {Function} walletdb - {@link WalletDB} constructor.
 * @property {Function} peer - {@link Peer} constructor.
 * @property {Function} pool - {@link Pool} constructor.
 * @property {Function} miner - {@link Miner} constructor.
 * @property {Function} minerblock - {@link MinerBlock} constructor.
 * @property {Object} http
 * @property {Function} http.client - {@link HTTPClient} constructor.
 * @property {Function} http.http - {@link HTTPBase} constructor.
 * @property {Function} http.request - See {@link request}.
 * @property {Function} http.server - {@link HTTPServer} constructor.
 * @property {Object} workers - See {@link module:workers}.
 * @property {TimeData} time - For adjusted time.
 * @property {Workers?} workerPool - Default global worker pool.
 */

function Environment() {
  this.env = Environment;
  this.require = lazy(require, this);

  // BN
  this['bn'] = require('bn.js');
  this['elliptic'] = require('elliptic');

  // Blockchain
  this['blockchain'] = require('./blockchain');
  this['chain'] = require('./blockchain/chain');
  this['chaindb'] = require('./blockchain/chaindb');
  this['chainentry'] = require('./blockchain/chainentry');

  // BTC
  this['btc'] = require('./btc');
  this['amount'] = require('./btc/amount');
  this['errors'] = require('./btc/errors');
  this['uri'] = require('./btc/uri');

  // Coins
  this['coins'] = require('./coins');
  this['coinview'] = require('./coins/coinview');

  // Crypto
  this['crypto'] = require('./crypto');
  this['ec'] = require('./crypto/ec');
  this['pk'] = require('./crypto/pk');
  this['schnorr'] = require('./crypto/schnorr');

  // DB
  this['db'] = require('./db');
  this['ldb'] = require('./db/ldb');

  // HD
  this['hd'] = require('./hd');

  // HTTP
  this['http'] = require('./http');
  this['rpc'] = require('./http/rpc');

  // Mempool
  this['txmempool'] = require('./mempool'); // -> txmempool?
  this['fees'] = require('./mempool/fees');
  this['mempool'] = require('./mempool/mempool');
  this['mempoolentry'] = require('./mempool/mempoolentry');

  // Miner
  this['mining'] = require('./mining');
  this['miner'] = require('./mining/miner');
  this['minerblock'] = require('./mining/minerblock');

  // Net
  this['net'] = require('./net');
  this['bip150'] = require('./net/bip150');
  this['bip151'] = require('./net/bip151');
  this['bip152'] = require('./net/bip152');
  this['packets'] = require('./net/packets');
  this['peer'] = require('./net/peer');
  this['pool'] = require('./net/pool');
  this['tcp'] = require('./net/tcp');

  // Node
  this['node'] = require('./node');
  this['config'] = require('./node/config');
  this['fullnode'] = require('./node/fullnode');
  this['logger'] = require('./node/logger');
  this['spvnode'] = require('./node/spvnode');

  // Primitives
  this['primitives'] = require('./primitives');
  this['address'] = require('./primitives/address');
  this['block'] = require('./primitives/block');
  this['coin'] = require('./primitives/coin');
  this['headers'] = require('./primitives/headers');
  this['input'] = require('./primitives/input');
  this['invitem'] = require('./primitives/invitem');
  this['keyring'] = require('./primitives/keyring');
  this['merkleblock'] = require('./primitives/merkleblock');
  this['mtx'] = require('./primitives/mtx');
  this['netaddress'] = require('./primitives/netaddress');
  this['outpoint'] = require('./primitives/outpoint');
  this['output'] = require('./primitives/output');
  this['tx'] = require('./primitives/tx');

  // Protocol
  this['protocol'] = require('./protocol');
  this['constants'] = require('./protocol/constants');
  this['network'] = require('./protocol/network');
  this['networks'] = require('./protocol/networks');
  this['timedata'] = require('./protocol/timedata');

  // Script
  this['scripting'] = require('./script'); // -> scripting?
  this['opcode'] = require('./script/opcode');
  this['program'] = require('./script/program');
  this['script'] = require('./script/script');
  this['sigcache'] = require('./script/sigcache');
  this['stack'] = require('./script/stack');
  this['witness'] = require('./script/witness');

  // Utils
  this['utils'] = require('./utils');
  this['base58'] = require('./utils/base58');
  this['co'] = require('./utils/co');
  this['encoding'] = require('./utils/encoding');
  this['reader'] = require('./utils/reader');
  this['staticwriter'] = require('./utils/staticwriter');
  this['util'] = require('./utils/util');
  this['writer'] = require('./utils/writer');

  // Wallet
  this['wallet'] = require('./wallet');
  this['path'] = require('./wallet/path');
  this['walletkey'] = require('./wallet/walletkey');
  this['walletdb'] = require('./wallet/walletdb');

  // Workers
  this['workers'] = require('./workers');
  this['workerpool'] = require('./workers/workerpool');
}

/**
 * Set the default network.
 * @param {String} options
 */

Environment.prototype.set = function set(options) {
  if (typeof options === 'string')
    options = { network: options };

  if (!options)
    options = {};

  if (options.network)
    this.network.set(options.network);

  this.workerpool.set(options);

  if (options.sigcacheSize != null)
    this.sigcache.resize(options.sigcacheSize);

  return this;
};

/**
 * Get the adjusted time.
 * @returns {Number} Adjusted time.
 */

Environment.prototype.now = function now() {
  return this.network.primary.now();
};

/**
 * Cache all necessary modules.
 */

Environment.prototype.cache = function cache() {
  this.bip70;
  this.common;
  this.crypto;
  this.fullnode;
  this.http;
  this.spvnode;
};

/*
 * Expose by converting `exports` to an
 * Environment.
 */

exports.cache = Environment.prototype.cache;
exports.set = Environment.prototype.set;
exports.now = Environment.prototype.now;

Environment.call(exports);
