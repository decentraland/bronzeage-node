'use strict';

var BN = require('bn.js');
var util = require('../lib/utils/util');
var constants = require('../lib/protocol/constants');
var TX = require('../lib/primitives/tx');
var Block = require('../lib/primitives/block');
var Script = require('../lib/script/script');
var Opcode = require('../lib/script/opcode');
var networks = require('../lib/protocol/networks');
var opcodes = constants.opcodes;
var main, testnet, regtest;

function createGenesisBlock(options) {
  var flags = options.flags;
  var script = options.script;
  var content = options.content;
  var tx, block;

  if (!flags) {
    flags = new Buffer(
      'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks',
      'ascii');
  }

  if (!content) {
    content = new Buffer(constants.NULL_HASH, 'hex');
  }

  if (!script) {
    script = Script.fromArray([
      new Buffer('04678afdb0fe5548271967f1a67130b7105cd6a828e039'
        + '09a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c3'
        + '84df7ba0b8d578a4c702b6bf11d5f', 'hex'),
      opcodes.OP_CHECKSIG
    ]);
  }

  tx = new TX({
    version: 1,
    flag: 1,
    inputs: [{
      prevout: {
        hash: constants.NULL_HASH,
        index: 0xffffffff
      },
      script: [
        Opcode.fromNumber(new BN(486604799)),
        Opcode.fromPush(new Buffer([4])),
        Opcode.fromData(flags)
      ],
      sequence: 0xffffffff
    }],
    outputs: [{
      content,
      x: 0,
      y: 0,
      script: script
    }],
    locktime: 0
  });

  block = new Block({
    version: options.network.genesis.version,
    prevBlock: constants.NULL_HASH,
    merkleRoot: tx.hash('hex'),
    ts: options.network.genesis.ts,
    bits: options.network.genesis.bits,
    nonce: options.network.genesis.nonce,
    height: 0,
  });

  block.addTX(tx);

  return block;
}

module.exports = createGenesisBlock;

if (require.main === module) {

  main = createGenesisBlock({
    network: networks.main,
  });

  testnet = createGenesisBlock({
    network: networks.testnet,
  });

  regtest = createGenesisBlock({
    network: networks.regtest,
  });

  util.log(main);
  util.log('');
  util.log(testnet);
  util.log('');
  util.log(regtest);
  util.log('');
  util.log('');
  util.log('main hash: %s', main.rhash());
  util.log('main merkleroot: %s', main.merkleRoot);
  util.log('main raw: %s', main.toRaw().toString('hex'));
  util.log('');
  util.log('testnet hash: %s', testnet.rhash());
  util.log('testnet merkleroot: %s', testnet.merkleRoot);
  util.log('testnet raw: %s', testnet.toRaw().toString('hex'));
  util.log('');
  util.log('regtest hash: %s', regtest.rhash());
  util.log('regtest merkleroot: %s', regtest.merkleRoot);
  util.log('regtest raw: %s', regtest.toRaw().toString('hex'));
}
