'use strict';

var HTTPBase = require('../lib/http/base');
var co = require('../lib/utils/co');
var Client = require('../lib/http/client');
var fs = require('fs');

var PORT = parseInt(process.argv[2], 10) || 8080;
var API_KEY = 'dland-key-256';

var server = new HTTPBase();
var api = new API(API_KEY);


// --------------------------------------------------------
// Resources

var index   = fs.readFileSync(__dirname + '/index.html');
var mainjs  = fs.readFileSync(__dirname + '/js/main.js');
var maincss = fs.readFileSync(__dirname + '/css/main.css');

server.get('/favicon.ico', function(req, res, send, next) {
  send(404, '', 'text');
});
server.get('/', function(req, res, send, next) {
  send(200, index, 'html');
});
server.get('/js/main.js', function(req, res, send, next) {
  send(200, mainjs, 'js');
});
server.get('/css/main.css', function(req, res, send, next) {
  send(200, maincss, 'css');
});


// --------------------------------------------------------
// API

server.post('/rpccall', co(function* (req, res, send, next) {
  var cmd = req.query.cmd

  if (! cmd) {
    var errorMessage = 'Tried to do a rpc call without a cmd (command)'
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
    })

    console.log('Executing RPC call', method, params)

    var result = yield api.rpc(method, params);
    send(200, result, 'json');

  } catch(error) {
    var errorMessage = 'Error trying to execute the rpc call ' + cmd + error.message
    console.log('[ERROR]', errorMessage)
    send(400, errorMessage, 'text');
  }
}));

server.get('/gettiles', co(function* gettiles(req, res, send, next) {
  try {
    console.log('Getting tiles')
    var tiles = yield api.rpc('dumpblockchain', [ true ]); // the [ true ] here means only controlled tiles
    send(200, tiles, 'json');

  } catch(error) {
    var errorMessage = 'Error trying to get the tiles. ' + error.message
    console.log('[ERROR]', errorMessage)
    send(400, errorMessage, 'text');
  }
}));


// --------------------------------------------------------
// Run

server.on('error', function(err) {
  console.error(err.stack.toString());
});

console.log('Running server on port ' + PORT)
server.listen(PORT);


// --------------------------------------------------------
// Utils

function API(apiKey) {
  this.config = {
    apiKey: apiKey
  };

  this.client = new Client({
    apiKey: this.config.apiKey
  });
}

API.prototype.rpc = co(function* rpc(method, params) {
  return yield this.client.rpc.call(method, params);
});

