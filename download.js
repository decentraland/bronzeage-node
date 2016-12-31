var WebTorrent = require('webtorrent-hybrid');
var client = new WebTorrent()

var torrentId = 'f7367aacd10b8e10d0d7284a8aac486393d8af11';

client.add(torrentId, function (torrent) {
  // Torrents can contain many files. Let's use the first.
  var file = torrent.files[0];
  console.log(torrent.files.length);
  console.log(torrent.infoHash);

  console.log(file);

});
