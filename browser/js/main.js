;(function() {
  'use strict';

  var currentTiles = [];

  fetchCurrentStats();

  fetchCurrentTiles();

  getElementById('miner-toggle')
    .addEventListener('click', function loadStats(event) {
      // Because the toggle is added dinamically,
      // we hook the click event to the parent and theck for the desired id
      var target = event.target;
      if (target.id !== 'js-switch') return;

      var command = {
        true: 'startmining',
        false: 'stopmining'
      }[target.checked];

      if (command) {
        getElementById('node-stats').innerHTML = 'Loading...';
        RPCCall(command).then(fetchCurrentStats);
      }
    }, true);

  getElementById('transfer-tiles')
    .addEventListener('click', function transferTilesEvent(event) {
      var modal = picoModal({
        content: renderTemplate('modal', { tiles: currentTiles }),
        modalClass: 'transfer-tiles-modal'
      })
      .afterShow(function() {
        getElementById('transfer-tiles-form').addEventListener('submit', function(event) {
          var formData = new FormData(this);
          var coordinates = formData.getAll('coordinate');
          var address = formData.get('address');

          if (transferTiles(coordinates, address)) {
            modal.destroy();
          }

          event.preventDefault();
        }, true);
      })
      .afterClose(function() {
        modal.destroy();
      }).show();
    }, true)

  getElementById('rpc-form')
    .addEventListener('submit', function sendRPC(event) {
      var submitButton = this.elements[1];
      var cmd = new FormData(this).get('cmd');

      this.reset();
      submitButton.disabled = true;

      RPCCall(cmd)
        .then(showRPCResponse)
        .then(function() {
          submitButton.disabled = false;
        });

      event.preventDefault();
    }, true);


  // --------------------------------------------------------
  // Handlers

  function fetchCurrentStats() {
    Promise.all([
      RPCCall('getblockchaininfo'),
      RPCCall('getminerinfo')
    ]).then(showCurrentState);
  }

  function fetchCurrentTiles() {
    getElementById('tiles').innerHTML = 'Loading...';

    fetchJSON('/gettiles').then(showTiles);
  }

  function showCurrentState(responses) {
    var blockchaininfo = responses[0];
    var minerinfo = responses[1];

    getElementById('miner-toggle').innerHTML = renderTemplate('miner-toggle', {
      running: minerinfo.running
    })

    getElementById('node-stats').innerHTML = renderTemplate('node-stats', {
      running   : minerinfo.running,
      stats     : minerinfo.stats,
      blockchain: blockchaininfo
    });
  }

  function showTiles(tiles) {
    var counts = { content: 0, empty: 0, total: tiles.length };

    tiles = tiles
      .sort(contentSorter)
      .map(function(tile) {
        tile.contentText = hasContent(tile) ? 'Click to see content' : 'Empty';
        tile.url = getTileURL(tile);

        if (hasContent(tile)) {
          counts.content += 1;
        } else {
          counts.empty += 1;
        }

        return tile;
      });

    getElementById('transfer-tiles').className = 'link';
    getElementById('tile-count').innerHTML = renderTemplate('counts', counts);
    getElementById('tiles').innerHTML      = renderTemplate('tiles', { tiles: tiles });

    currentTiles = tiles;
  }

  function showRPCResponse(response) {
    getElementById('rpc-result').innerHTML = JSON.stringify(response, null, 2);
  }

  function transferTiles(coordinates, address) {
    if (coordinates.length === 0 || ! address) return false;

    coordinates = coordinates.map(function(coord) {
      var points = coord.split(',')
      return { x: points[0], y: points[1] }
    })

    fetchJSON('transfertiles', {
      method: 'POST',
      body: JSON.stringify({ coordinates: coordinates, address: address })
    }).then(fetchCurrentTiles);

    return true;
  }


  // --------------------------------------------------------
  // Utils

  function RPCCall(cmd) {
    return fetchJSON('/rpccall?cmd=' + cmd, { method: 'POST' });
  }

  function fetchJSON(url, options) {
    return new Promise(function(resolve, reject) {
      fetch(url, options).then(function(response) {
        if (response.status === 200) {
          response.json().then(resolve);
        } else {
          response.text().then(catchError);
        }
      })
      .catch(catchError);
    });
  }

  function catchError(error) {
    console.log('[ERROR]', error);
  }

  function contentSorter(tileA, tileB) {
    if(tileA.content > tileB.content) return -1;
    if(tileA.content < tileB.content) return 1;
    return 0;
  }

  function hasContent(tile) {
    return tile.content.replace(/0/g, '');
  }

  function getTileURL(tile) {
    return 'https://decentraland.org/app/?x=' + tile.x + '&y=' + tile.y;
  }

  function renderTemplate(name, data) {
    var template = getElementById(name + '-template').innerHTML;
    return new t(template).render(data);
  }

  function getElementById(id) {
    return document.getElementById('js-' + id);
  }
})();
