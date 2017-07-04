'use strict';

var HTTPBase = require('../lib/http/base');
var co = require('../lib/utils/co');
var Client = require('../lib/http/client');
var fs = require('fs');

var server = new HTTPBase();
var port = +process.argv[2] || 8080
var index = fs.readFileSync(__dirname + '/index.html');
var indexjs = fs.readFileSync(__dirname + '/js/index.js');
var maincss = fs.readFileSync(__dirname + '/css/main.css');

server.get('/favicon.ico', function(req, res, send, next) {
  send(404, '', 'text');
});

server.get('/', function(req, res, send, next) {
  send(200, index, 'html');
});
server.get('/js/index.js', function(req, res, send, next) {
  send(200, indexjs, 'js');
});
server.get('/css/main.css', function(req, res, send, next) {
  send(200, maincss, 'css');
});

server.get('/css/main.css', function(req, res, send, next) {
  send(200, maincss, 'css');
});

server.on('error', function(err) {
  console.error(err.stack + '');
});

console.log('Running server on port ' + port)
server.listen(port);


function API(apiKey) {
  this.config = {
    apiKey: apiKey
  };
}

API.prototype.rpc = co(function* rpc(method, params) {
  var client = new Client({
    apiKey: this.config.apiKey
  });

  let result = yield client.rpc.call(method, params);
  result = JSON.parse(result);
  result.sort((a, b) => a.x + b.x);

  console.log('Controlled tiles:');
  for (let i in result) {
    const y = result[i];
    console.log(y.x, y.y);
  }
});

// const api = new API('dland-key-256');
// api.rpc('dumpblockchain', [ true ]);
