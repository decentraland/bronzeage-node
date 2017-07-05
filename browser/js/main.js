;(function() {
  'use strict';

  fetch('/gettiles').then(function(response) {
    if (response.status === 200) {
      response.json().then(showTiles);
    } else {
      response.text().then(catchError);
    }
  })
  .catch(catchError)

  getElementById('rpc-form')
    .addEventListener('submit', function sendRPC(event) {
      var submitButton = this.elements[1]
      var cmd = new FormData(this).get('cmd')

      this.reset()
      submitButton.disabled = true

      fetch('/rpccall?cmd=' + cmd, {
        method: 'POST'
      }).then(function(response) {
        if (response.status === 200) {
          response.json().then(showRPCResponse)
        } else {
          response.text().then(catchError);
        }
      })
      .catch(catchError)
      .then(function() {
        submitButton.disabled = false
      })

      event.preventDefault()
    }, true);


  // --------------------------------------------------------
  // Handlers

  function showTiles(tiles) {
    var baseURL = "https://decentraland.org/app/?";
    var tilesHTML = '';

    tiles
      .sort(function(a, b) { return Math.abs(a.x) - Math.abs(b.x) })
      .forEach(function(tile) {
        // Concat here instead of using a `.join()` to avoid yet another iteration
        var url = baseURL + 'x=' + tile.x + '&y=' + tile.y;
        var content = '(' + tile.x + ', ' + tile.y + ') ' + tile.content;

        tilesHTML += '<li><a href="' + url + '" target="_blank">' + content + '<a></li>';
      });

    getElementById('loading-tiles').className = 'hidden';
    getElementById('tile-count').innerHTML = '(' + tiles.length + ')';
    getElementById('tiles').innerHTML = tilesHTML;
  }

  function showRPCResponse(response) {
    getElementById('rpc-result').innerHTML = JSON.stringify(response, null, 2)
  }

  function catchError(error) {
    console.log('[ERROR]', error)
  }

  function getElementById(id) {
    return document.getElementById('js-' + id)
  }
})();
