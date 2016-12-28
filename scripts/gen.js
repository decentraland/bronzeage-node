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
  var reward = options.reward;
  var tx, block;

  if (!flags) {
    flags = new Buffer(
      'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks',
      'ascii');
  }

  if (!script) {
    script = Script.fromArray([
      new Buffer('04678afdb0fe5548271967f1a67130b7105cd6a828e039'
        + '09a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c3'
        + '84df7ba0b8d578a4c702b6bf11d5f', 'hex'),
      opcodes.OP_CHECKSIG
    ]);
  }

  if (!reward)
    reward = 50 * constants.COIN;

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
      value: reward,
      script: script
    }],
    locktime: 0
  });

  block = new Block({
    version: options.version,
    prevBlock: constants.NULL_HASH,
    merkleRoot: tx.hash('hex'),
    ts: options.ts,
    bits: options.network.pow.bits,
    nonce: options.nonce,
    height: 0
  });

  block.addTX(tx);

  return block;
}

main = createGenesisBlock({
  version: 1,
  ts: 1231006505,
  nonce: 2083236893,
  network: networks.main,
});

testnet = createGenesisBlock({
  version: 1,
  ts: 1296688602,
  nonce: 414098458,
  network: networks.testnet,
});

regtest = createGenesisBlock({
  version: 1,
  ts: 1296688602,
  nonce: 2,
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
util.log('main raw: %s', main.toRaw().toString('hex'));
util.log('');
util.log('testnet hash: %s', testnet.rhash());
util.log('testnet raw: %s', testnet.toRaw().toString('hex'));
util.log('');
util.log('regtest hash: %s', regtest.rhash());
util.log('regtest raw: %s', regtest.toRaw().toString('hex'));
