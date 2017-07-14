'use strict';

var HTTPBase = require('../lib/http/base');
var Client = require('../lib/http/client');
var config = require('../lib/node/config');
var co = require('../lib/utils/co');
var fs = require('fs');


var CONFIG = config({ config: true, arg: true, env: true }).data;
var PORT = CONFIG.serverport || 8080;

var server = new HTTPBase();

if (! CONFIG.daemon) {
  console.log('Starting Decentraland server!');
  console.log('Remember that it supports the same flags as the node (via ENV or argv)\n');

  if (! CONFIG.apikey) console.warn('[WARN] No apikey supplied, you can explicitly set one using `--apikey YOUR_API_KEY`');
}

var client = new Client({
  apiKey: CONFIG.apikey
});


// --------------------------------------------------------
// Resources

var index      = fs.readFileSync(__dirname + '/index.html');
var mainjs     = fs.readFileSync(__dirname + '/js/main.js');
var templatejs = fs.readFileSync(__dirname + '/js/t.min.js');
var picoModal  = fs.readFileSync(__dirname + '/js/picoModal.min.js');
var maincss    = fs.readFileSync(__dirname + '/css/main.css');

server.get('/', function(req, res, send) {
  send(200, index, 'html');
});
server.get('/js/main.js', function(req, res, send) {
  send(200, mainjs, 'js');
});
server.get('/js/t.min.js', function(req, res, send) {
  send(200, templatejs, 'js');
});
server.get('/js/picoModal.min.js', function(req, res, send) {
  send(200, picoModal, 'js');
});
server.get('/css/main.css', function(req, res, send) {
  send(200, maincss, 'css');
});


// --------------------------------------------------------
// API

server.post('/rpccall', co(function* (req, res, send, next) {
  var cmd = req.query.cmd;

  if (! cmd) {
    var errorMessage = 'Tried to do a rpc call without a cmd (command)';
    return send(400, errorMessage, 'text');
  }

  try {
    var args = cmd.split(' ');

    var method = args.shift();
    var params = args.map(function(arg) {
      try {
        return JSON.parse(arg);
      } catch (e) {
        return arg;
      }
    });

    console.log('Executing RPC call', method, 'with params', params);

    var result = yield client.rpc.call(method, params);
    result = typeof result === 'object' ? result : { result: result };

    if (result && result.error) throw new Error(result.error);

    send(200, result, 'json');

  } catch(error) {
    var errorMessage = 'Error trying to execute the rpc call ' + cmd + error.message;
    console.log('[ERROR]', errorMessage);
    send(400, errorMessage, 'text');
  }
}));

server.post('/transfertiles', co(function* gettiles(req, res, send, next) {
  var coordinates = req.body.coordinates;
  var address = req.body.address;

  if (! coordinates || ! address) throw new Error('Tried to transfer tiles without all the arguments (coordinates and address)');

  console.log('Transfering tiles to', address);

  for (var i = 0; i < coordinates.length; i++) {
    var coordinate = coordinates[i];
    console.log('Moving', coordinate);
    yield client.rpc.call('transfertile', [ coordinate.x, coordinate.y, address ]);
  }

  return true
}));

server.get('/gettiles', co(function* gettiles(req, res, send, next) {
  try {
    console.log('Getting mined tiles');
    var tiles = yield client.rpc.call('dumpblockchain', [ true ]); // [ true ] here means "only controlled tiles"
    send(200, tiles, 'json');

  } catch(error) {
    var errorMessage = 'Error trying to get the tiles. ' + error.message;
    console.log('[ERROR]', errorMessage);
    send(400, errorMessage, 'text');
  }
}));


// --------------------------------------------------------
// Run

server.on('error', function(err) {
  console.error(err.stack.toString());
});

process.stdout.write('Running server on port ' + PORT + '. Visit http://localhost:' + PORT + ' to see it');
if (! CONFIG.serverport) process.stdout.write('. You can change this using --serverport PORT');
console.log('');
server.listen(PORT);
