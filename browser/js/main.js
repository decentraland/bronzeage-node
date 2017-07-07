;(function() {
  'use strict';

  fetchJSON('/gettiles').then(showTiles)

  Promise.all([
    RPCCall('getblockchaininfo'),
    RPCCall('getminerinfo')
  ]).then(showCurrentState)

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

  function showTiles(tiles) {
    var tilesHTML = tiles
      .sort(contentSorter)
      .map(function(tile) {
        return renderTemplate('tiles', {
          x  : tile.x,
          y  : tile.y,
          url: getTileURL(tile),
          content: hasContent(tile) ? 'Click to see content' : 'Empty'
        });
      })
      .join('');

    getElementById('loading-tiles').className = 'hidden';
    getElementById('tile-count').innerHTML = tiles.length;
    getElementById('tiles').innerHTML = tilesHTML;
  }

  function showCurrentState(responses) {
    var blockchaininfo = responses[0]
    var minerinfo = responses[1]

    getElementById('node-stats').innerHTML = renderTemplate('node-stats', {
      running   : minerinfo.running,
      stats     : minerinfo.stats,
      blockchain: blockchaininfo
    });
  }

  function showRPCResponse(response) {
    getElementById('rpc-result').innerHTML = JSON.stringify(response, null, 2);
  }


  // --------------------------------------------------------
  // Utils

  function RPCCall(cmd) {
    return fetchJSON('/rpccall?cmd=' + cmd, { method: 'POST' })
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
      .catch(catchError)
    })
  }

  function showTiles(tiles) {
    var tilesHTML = '';

    // Concat strings here instead of using a `.map().join()` to avoid yet another iteration
    tiles
      .sort(contentSorter)
      .forEach(function(tile) {
        var coordinates = '(' + tile.x + ', ' + tile.y + ') ';
        var content = hasContent(tile) ? 'Click to see content' : 'Empty';

        tilesHTML += '<li><a href="' + getTileURL(tile) + '" target="_blank">' + coordinates + content + '</a></li>';
      });

    getElementById('loading-tiles').className = 'hidden';
    getElementById('tile-count').innerHTML = tiles.length;
    getElementById('tiles').innerHTML = tilesHTML;
  }

  function showRPCResponse(response) {
    getElementById('rpc-result').innerHTML = JSON.stringify(response, null, 2);
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
