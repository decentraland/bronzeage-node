/*!
 * chaindb.js - content data management for decentraland
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2016, Christopher Jeffrey (MIT License).
 * Copyright (c) 2016-2017, Manuel Araoz (MIT License).
 * Copyright (c) 2016-2017, Esteban Ordano (MIT License).
 * Copyright (c) 2016-2017, The Decentraland Development Team (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

'use strict';

var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var WebTorrent = require('webtorrent-hybrid');
var EventEmitter = require('events').EventEmitter;
var pass = require('stream').PassThrough;


var constants = require('../protocol/constants');
var util = require('../utils/util');
var co = require('../utils/co');

/**
 * WebTorrent-based content database
 * @exports ContentDB
 */
function ContentDB(chain) {
  if (!(this instanceof ContentDB))
    return new ContentDB(chain);

  EventEmitter.call(this);

  this.chain = chain;
  this.logger = chain.logger;
  this.network = chain.network;
  this.options = chain.options;
  this.webtorrent = new WebTorrent();
  var self = this;
  this.webtorrent.on('error', (err) => {
    self.logger.error('WebTorrent error:', err);
  });

  var dirPath = this._dirPath();
  mkdirp.sync(dirPath);

}
util.inherits(ContentDB, EventEmitter);

ContentDB.prototype._dirPath = function () {
  return this.options.prefix + 'tiles' + path.sep;
};

ContentDB.prototype._pathFor = function (x, y, hash) {
  var dirPath = this._dirPath();
  var namePath = x + '.' + y;
  if (hash) {
    namePath += '.' + hash;
  }
  namePath += '.tld';
  const fullPath = dirPath + namePath;
  return fullPath;
};

ContentDB.prototype._seed = co(function* _seed(x, y) {
  var self = this;
  const file = this._pathFor(x,y);
  const seedOpts = {
    name: `Decentraland tile (${x}, ${y})`,
    createdBy: 'decentraland',
  };
  yield new Promise(function(resolve, reject) {
    self.webtorrent.seed(fs.createReadStream(file), seedOpts, 
      (torrent) => {
      self.logger.info('WebTorrent is seeding:', torrent.infoHash);
      self.logger.info('Total torrents:', self.webtorrent.torrents.length);
      resolve(torrent.infoHash);
    });
  });
  
});

ContentDB.prototype._copy = co(function* _copy(from, to) {
  yield fs.createReadStream(from)
    .pipe(fs.createWriteStream(to));
});

ContentDB.prototype.save = co(function* save(x, y, hash, stream, isCurrent) {
  const currentPath = this._pathFor(x, y);
  const historicPath = this._pathFor(x, y, hash);
  var save = stream.pipe(fs.createWriteStream(historicPath));
  var self = this;
  save.on('finish', () => {
    if (isCurrent) {
      self.logger.info(`Saving new version of ${x}, ${y} at ${historicPath}`);
      this._copy(historicPath, currentPath);
      this._seed(x , y);
    }
  });
});

ContentDB.prototype.fetch = co(function* fetch(x, y, hash) {
  this.logger.info('ContentDB asked to fetch content', hash);
  
  // check if we already have that file
  if (fs.existsSync(this._pathFor(x, y, hash))) {
    return;
  }

  // if null content, save default tile without downloading torrent
  if (hash === constants.NULL_HASH) {
    const defaultContent = fs.createReadStream('./data/default.tld');
    return this.save(x, y, hash, defaultContent, true);
  }
  
  var self = this;

  this.webtorrent.add(hash, (torrent) => {
    // new torrent loaded for download
    self.logger.info(`WebTorrent new torrent loaded for ${x}, ${y}`,
      torrent.infoHash);

    torrent.on('ready', () => {
			self.logger.info('WebTorrent ready: ' + torrent.infoHash);
    });

    torrent.on('warning', (err) => {
      self.logger.warn('WebTorrent', err);
    });

		torrent.on('download', (bytes) => {
			self.logger.info('XXX just downloaded: ' + bytes);
			self.logger.info('XXX total downloaded: ' + torrent.downloaded);
			self.logger.info('XXX download speed: ' + torrent.downloadSpeed);
			self.logger.info('XXX progress: ' + torrent.progress);
		});

    torrent.on('done', () => {
      self.logger.info('WebTorrent finished downloading', torrent.infoHash);
      var content = torrent.files[0];
      self.emit('content', x, y, content, hash);
    });
  
  
  });
});

ContentDB.prototype.putFile = co(function* setTile(x, y, contentFile) {
  var self = this;
  // 1. Copy file to Decentraland folder
  if (!fs.existsSync(contentFile)) {
    throw new Error('File '+ contentFile +' not found');
  }

  const copyPath = this._pathFor(x,y);
  yield this._copy(contentFile, copyPath);
  self.logger.info('Tile file ('+x+','+y+') copy finished, starting to seed torrent');
  return self._seed(x, y);

});

module.exports = ContentDB;
