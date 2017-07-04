;(function() {
  'use strict';

  fetch('/gettiles?param=1').then(function(response) {
    if (response.status === 200) {
      response.json()
        .then(function(tiles) {
          var tilesHTML = ''

          // Concat here instead of using a `.join()` to avoid yet another iteration
          tiles
            .sort(function(a, b) { return Math.abs(a.x) - Math.abs(b.x) })
            .forEach(function(tile) {
              tilesHTML += "<li>(" + tile.x + ", " + tile.y + "): " + tile.content + '</li>'
            })

          document.getElementById('js-loading-tiles').className = 'hidden'
          document.getElementById('js-tiles').innerHTML = tilesHTML;
        });
    } else {
      response.text().then(error => console.log('ERROR', error));
    }
  })
  .catch(function(error) {
    console.log('ERROR fething', error);
  })
})();
